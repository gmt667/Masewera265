import fs from 'node:fs';
import zlib from 'node:zlib';

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error('Usage: node inspect-pdf.mjs input.pdf output.txt');
const bytes = fs.readFileSync(input);
const raw = bytes.toString('latin1');
const pageCount = (raw.match(/\/Type\s*\/Page\b/g) ?? []).length;
const strings = [];
const decodeLiteral = (value) => value
  .replace(/\\([nrtbf()\\])/g, (_, c) => ({n:'\n',r:'\r',t:'\t',b:'\b',f:'\f','(':'(',')':')','\\':'\\'}[c]))
  .replace(/\\([0-7]{1,3})/g, (_, o) => String.fromCharCode(Number.parseInt(o, 8)));
const collect = (text) => {
  for (const match of text.matchAll(/\(([^()]*)\)\s*Tj/g)) strings.push(decodeLiteral(match[1]));
  for (const match of text.matchAll(/\[([^\]]{0,20000})\]\s*TJ/g)) {
    const parts = [...match[1].matchAll(/\(([^()]*)\)/g)].map((m) => decodeLiteral(m[1]));
    if (parts.length) strings.push(parts.join(''));
  }
};
const decodeAscii85 = (input) => {
  const source = input.toString('ascii').replace(/^<~/, '').replace(/~>\s*$/, '').replace(/\s+/g, '');
  const output = [];
  let group = [];
  for (const char of source) {
    if (char === 'z' && group.length === 0) { output.push(0, 0, 0, 0); continue; }
    const value = char.charCodeAt(0) - 33;
    if (value < 0 || value > 84) continue;
    group.push(value);
    if (group.length === 5) {
      let number = 0;
      for (const digit of group) number = number * 85 + digit;
      output.push((number >>> 24) & 255, (number >>> 16) & 255, (number >>> 8) & 255, number & 255);
      group = [];
    }
  }
  if (group.length) {
    const count = group.length;
    while (group.length < 5) group.push(84);
    let number = 0;
    for (const digit of group) number = number * 85 + digit;
    const tail = [(number >>> 24) & 255, (number >>> 16) & 255, (number >>> 8) & 255, number & 255];
    output.push(...tail.slice(0, count - 1));
  }
  return Buffer.from(output);
};
const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
};
const pngChunk = (type, data) => {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4); length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4); checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
};
const writeRgbPng = (path, pixels, width, height) => {
  const rows = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) pixels.copy(rows, y * (width * 3 + 1) + 1, y * width * 3, (y + 1) * width * 3);
  const header = Buffer.alloc(13); header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 2;
  fs.writeFileSync(path, Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), pngChunk('IHDR', header), pngChunk('IDAT', zlib.deflateSync(rows)), pngChunk('IEND', Buffer.alloc(0))]));
};
let decodedStreams = 0;
const streamInfo = [];
let imageIndex = 0;
for (const match of raw.matchAll(/<<(.*?)>>\s*stream\r?\n/gms)) {
  const dict = match[1];
  const start = match.index + match[0].length;
  const end = raw.indexOf('endstream', start);
  if (end < 0) continue;
  let stream = bytes.subarray(start, end);
  while (stream.length && (stream.at(-1) === 10 || stream.at(-1) === 13)) stream = stream.subarray(0, -1);
  streamInfo.push({filter: dict.match(/\/Filter\s*(\[[^\]]+\]|\/\w+)/s)?.[1], subtype: dict.match(/\/Subtype\s*\/(\w+)/)?.[1], width: dict.match(/\/Width\s+(\d+)/)?.[1], height: dict.match(/\/Height\s+(\d+)/)?.[1], length: stream.length});
  if (/\/DCTDecode/.test(dict) && stream[0] === 0xff && stream[1] === 0xd8) {
    fs.writeFileSync(`temp_doc/image-${String(++imageIndex).padStart(2, '0')}.jpg`, stream);
  }
  if (!/\/FlateDecode/.test(dict)) continue;
  try {
    if (/\/ASCII85Decode/.test(dict)) stream = decodeAscii85(stream);
    const inflated = zlib.inflateSync(stream);
    const width = Number(dict.match(/\/Width\s+(\d+)/)?.[1]);
    const height = Number(dict.match(/\/Height\s+(\d+)/)?.[1]);
    if (width && height && inflated.length === width * height * 3) writeRgbPng('temp_doc/cover-artwork.png', inflated, width, height);
    const text = inflated.toString('latin1');
    collect(text);
    decodedStreams++;
  } catch {}
}
const cleaned = strings
  .map((value) => value.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '').trim())
  .filter((value) => value && /[A-Za-z0-9]/.test(value));
fs.writeFileSync(output, `Pages: ${pageCount}\nDecoded streams: ${decodedStreams}\n\n${cleaned.join('\n')}`, 'utf8');
console.log(JSON.stringify({pageCount, decodedStreams, strings: cleaned.length, imageIndex, streamInfo}, null, 2));

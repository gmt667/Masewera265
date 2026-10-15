const fs = require('fs');
const content = fs.readFileSync('lib/demo-data.ts', 'utf8');

// Find all teams with sport: "Football"
const teamBlocks = content.split(/\{\s*slug:\s*"/g).slice(1);
const footballTeams = [];
for (const block of teamBlocks) {
  if (block.includes('sport: "Football"')) {
    const slugMatch = block.match(/^([^"]+)/);
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    if (slugMatch) {
      footballTeams.push({ slug: slugMatch[1], name: nameMatch ? nameMatch[1] : '' });
    }
  }
}
console.log('Football teams count:', footballTeams.length);
console.log(footballTeams);

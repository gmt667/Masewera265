const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

const source = fs.readFileSync("lib/football-logic.ts", "utf8");
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleBox = { exports: {} };
vm.runInNewContext(output, { module: moduleBox, exports: moduleBox.exports, URL, JSON });
const { validateCorrection, filterRecords, recoverLocalDraft, connectedFailureMessage } = moduleBox.exports;

assert.deepEqual(Array.from(filterRecords([{ name: "The Flames" }, { name: "Scorchers" }], "flam", x => x.name), x => x.name), ["The Flames"]);
assert.deepEqual(Array.from(filterRecords([{ title: "1984 AFCON" }, { title: "2023 COSAFA Women" }], "cosafa", x => x.title), x => x.title), ["2023 COSAFA Women"]);
assert.equal(Object.keys(validateCorrection({ subject: "x", proposedChange: "short", sourceUrl: "not-a-url" })).length, 3);
assert.equal(Object.keys(validateCorrection({ subject: "Club name", proposedChange: "This is a documented correction.", sourceUrl: "https://fam.mw/example" })).length, 0);
assert.equal(recoverLocalDraft('{"title":"Archive claim","notes":"Official source","status":"Draft"}').title, "Archive claim");
assert.equal(recoverLocalDraft("broken"), null);
assert.match(connectedFailureMessage("connected", false), /no approved/i);
assert.equal(connectedFailureMessage("demo", false), null);
console.log("8 football regression checks passed: filters, archive search, correction validation, draft recovery and connected-mode failure.");

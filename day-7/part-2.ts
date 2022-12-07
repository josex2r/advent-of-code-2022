import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const tree: Record<string, number> = {};

function parseLine(line: string, parents: string[]) {
  let [prompt, cmd, val] = line.split(" ");

  if (prompt === "$") {
    if (cmd === "cd") {
      if (val === "..") {
        parents.pop();
        return parents;
      }

      return [...parents, `${parents[parents.length - 1]}${val}/`];
    }

    return parents;
  }

  val = cmd;
  cmd = prompt;

  if (cmd !== "dir") {
    parents.forEach((path) => {
      tree[path] ||= 0;
      tree[path] += parseInt(cmd);
    });
  }

  return parents;
}

let parents = ["/"];

for await (const line of await readLines(filePath)) {
  parents = parseLine(line, parents);
}

const freeSpace = 70000000 - tree['/']
const upgradeSpace = 30000000
const minFreeSpace = upgradeSpace - freeSpace
const result = Math.min(...Object.values(tree).filter((val) => val >= minFreeSpace));

console.log(`Result: ${result}`);

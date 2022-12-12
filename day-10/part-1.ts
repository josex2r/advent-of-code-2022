import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const cycles: number[] = [1];

for await (const line of await readLines(filePath)) {
  const [cmd, value] = line.split(" ");

  if (value) {
    cycles.push(0);
  }

  cycles.push(value ? Number(value) : 0);
}

const results = [20, 60, 100, 140, 180, 220].map((cycle) => {
  const values = cycles.slice(0, cycle);

  return values.reduce((acc, val) => acc + val, 0) * cycle;
});

const total = results.reduce((acc, val) => acc + val, 0);

console.log(total);

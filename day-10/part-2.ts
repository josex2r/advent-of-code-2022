import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const cycles: number[] = [];
const lines: string[] = [];

for await (const line of await readLines(filePath)) {
  const [cmd, value] = line.split(" ");

  if (value) {
    cycles.push(0);
  }

  cycles.push(value ? Number(value) : 0);
}

[40, 80, 120, 160, 200, 240].forEach((cycle, index) => {
  for (let i = 0; i < 40; i++) {
    const currIndex = cycle - 40 + i;

    const value = cycles.slice(0, currIndex).reduce((acc, val) => acc + val, 1);
    const isVisible = value >= (i - 1) && value <= (i + 1);

    lines[index] ||= "";
    lines[index] += isVisible ? "#" : ".";
  }
});

console.log(lines);

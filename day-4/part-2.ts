import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const formatPair = (str: string) => {
  const [min, max] = str.split("-");

  return [parseInt(min), parseInt(max)];
};

const isOverlaping = (a: number[], b: number[]) => {
  if (b[0] <= a[0]) {
    return b[1] >= a[0];
  }

  return b[0] <= a[1];
};

let results = 0;

for await (const line of await readLines(filePath)) {
  const pairs = line.split(",");
  const pair1 = formatPair(pairs[0]);
  const pair2 = formatPair(pairs[1]);
  const pair1IsOverlaping = isOverlaping(pair1, pair2);
  const pair2IsOverlaping = isOverlaping(pair2, pair1);

  if (pair1IsOverlaping || pair2IsOverlaping) {
    results++;
  }
}

console.log(`Overlaping results: ${results}`);

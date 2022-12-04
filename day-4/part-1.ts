import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const formatPair = (str: string) => {
  const [min, max] = str.split("-");

  return [parseInt(min), parseInt(max)];
};

const isInRange = (a: number, [min, max]: number[]) => !!(a >= min && a <= max);

let results = 0;

for await (const line of await readLines(filePath)) {
  const pairs = line.split(",");
  const pair1 = formatPair(pairs[0]);
  const pair2 = formatPair(pairs[1]);
  const pair1IsInRange = isInRange(pair1[0], pair2) &&
    isInRange(pair1[1], pair2);
  const pair2IsInRange = isInRange(pair2[0], pair1) &&
    isInRange(pair2[1], pair1);

  if (pair1IsInRange || pair2IsInRange) {
    results++;
  }
}

console.log(`Containing results: ${results}`);

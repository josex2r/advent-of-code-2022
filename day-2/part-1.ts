import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

type Matches = "X" | "Y" | "Z";

const POINTS_BY_SELECTION: Record<Matches, number> = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const POINTS_BY_SCORE = {
  LOOSE: 0,
  DRAW: 3,
  WIN: 6,
};

const normalize = (a: string): Matches =>
  a === "A" ? "X" : a === "B" ? "Y" : "Z";

const getPointsByResult = (a: Matches, b: Matches) => {
  if (a === b) {
    return POINTS_BY_SCORE.DRAW;
  }

  if (a === "X" && b === "Y") return POINTS_BY_SCORE.LOOSE;
  if (a === "Y" && b === "Z") return POINTS_BY_SCORE.LOOSE;
  if (a === "Z" && b === "X") return POINTS_BY_SCORE.LOOSE;

  return POINTS_BY_SCORE.WIN;
};

let points = 0;

for await (const line of await readLines(filePath)) {
  const results = line.split(" ");
  const a = normalize(results[0]) as Matches;
  const b = results[1] as Matches;

  points += getPointsByResult(b, a) + POINTS_BY_SELECTION[b];
}

console.log(`Points: ${points}`);

import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

let currCalories = 0;
let ranking: number[] = [0, 0, 0];

for await (const line of await readLines(filePath)) {
  if (line.length) {
    const calories = parseInt(line);

    currCalories += calories;
  } else {
    const isTop3 = Math.min(...ranking, currCalories) !== currCalories;

    if (isTop3) {
      ranking = [...ranking, currCalories].sort().slice(-3);
    }

    currCalories = 0;
  }
}

const totalCalories = ranking.reduce((acc, calories) => acc + calories, 0);

console.log(`Top 3 elfs carrying calories: ${ranking}`);
console.log(`Total calories of top 3 elfs: ${totalCalories}`);

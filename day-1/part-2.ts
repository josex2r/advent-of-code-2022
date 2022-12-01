import { buffer, path } from "../deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");
const inputFile = await Deno.open(filePath);

const lines = buffer.readLines(inputFile);
let iterator = await lines.next();
let currCalories = 0;
let ranking: number[] = [0, 0, 0];

while (!iterator.done) {
  if (iterator.value.length) {
    const calories = parseInt(iterator.value);

    currCalories += calories;
  } else {
    const isTop3 = Math.min(...ranking, currCalories) !== currCalories;

    if (isTop3) {
      ranking = [...ranking, currCalories].sort().slice(-3);
    }

    currCalories = 0;
  }

  iterator = await lines.next();
}

const totalCalories = ranking.reduce((acc, calories) => acc + calories, 0);

console.log(`Top 3 elfs carrying calories: ${ranking}`);
console.log(`Total calories of top 3 elfs: ${totalCalories}`);

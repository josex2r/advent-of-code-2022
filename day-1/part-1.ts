import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

let maxCalories = -Infinity;
let currCalories = 0;

for await (const line of await readLines(filePath)) {
  if (line) {
    const calories = parseInt(line);

    currCalories += calories;
  } else {
    maxCalories = Math.max(currCalories, maxCalories);
    currCalories = 0;
  }
}

console.log(`Elf carrying max number of calories: ${maxCalories}`);

import { buffer, path } from "../deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");
const inputFile = await Deno.open(filePath);

const lines = buffer.readLines(inputFile);
let iterator = await lines.next();
let maxCalories = -Infinity;
let currCalories = 0;

while (!iterator.done) {
  if (iterator.value.length) {
    const calories = parseInt(iterator.value);

    currCalories += calories;
  } else {
    maxCalories = Math.max(currCalories, maxCalories);
    currCalories = 0;
  }

  iterator = await lines.next();
}

console.log(`Elf carrying max number of calories: ${maxCalories}`);

import { buffer, path } from "../deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");
const inputFile = await Deno.open(filePath);

let maxCalories = -Infinity;
let currCalories = 0;

for await (const line of buffer.readLines(inputFile)) {
  if (line.length) {
    const calories = parseInt(line);

    currCalories += calories;
  }

  if (!line.length) {
    maxCalories = Math.max(currCalories, maxCalories);
    currCalories = 0;
  }
}

maxCalories = Math.max(currCalories, maxCalories);

console.log(`Elf carrying max number of calories: ${maxCalories}`);

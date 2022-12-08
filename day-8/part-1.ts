import { path } from "../deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const text = (await Deno.readTextFile(filePath)) as string;
const grid = text
  .split("\n")
  .map((row) => row.split(""))
  .slice(0, -1);

function checkTop(grid: string[][], value: number, i: number, j: number) {
  let cursor = j;

  while (--cursor >= 0) {
    if (parseInt(grid[i][cursor]) >= value) {
      return 0;
    }
  }

  return 1;
}

function checkBottom(grid: string[][], value: number, i: number, j: number) {
  let cursor = j;

  while (++cursor < grid.length) {
    if (parseInt(grid[i][cursor]) >= value) {
      return 0;
    }
  }

  return 1;
}

function checkLeft(grid: string[][], value: number, i: number, j: number) {
  let cursor = i;

  while (--cursor >= 0) {
    if (parseInt(grid[cursor][j]) >= value) {
      return 0;
    }
  }

  return 1;
}

function checkRight(grid: string[][], value: number, i: number, j: number) {
  let cursor = i;

  while (++cursor < grid[i].length) {
    if (parseInt(grid[cursor][j]) >= value) {
      return 0;
    }
  }

  return 1;
}

function checkTile(grid: string[][], i: number, j: number) {
  const value = parseInt(grid[i][j]);
  return checkTop(grid, value, i, j) ||
      checkBottom(grid, value, i, j) ||
      checkLeft(grid, value, i, j) ||
      checkRight(grid, value, i, j)
    ? 1
    : 0;
}

let result = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    result += checkTile(grid, i, j);
  }
}

console.log(result);

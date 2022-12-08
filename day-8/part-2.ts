import { path } from "../deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const text = (await Deno.readTextFile(filePath)) as string;
const grid = text
  .split("\n")
  .map((row) => row.split(""))
  .slice(0, -1);

function checkTop(grid: string[][], value: number, i: number, j: number) {
  let cursor = i;
  let result = 0;

  while (--cursor >= 0) {
    result++;
    if (parseInt(grid[cursor][j]) >= value) {
      break;
    }
  }

  return result;
}

function checkBottom(grid: string[][], value: number, i: number, j: number) {
  let cursor = i;
  let result = 0;

  while (++cursor < grid.length) {
    result++;
    if (parseInt(grid[cursor][j]) >= value) {
      break;
    }
  }

  return result;
}

function checkLeft(grid: string[][], value: number, i: number, j: number) {
  let cursor = j;
  let result = 0;

  while (--cursor >= 0) {
    result++;
    if (parseInt(grid[i][cursor]) >= value) {
      break;
    }
  }

  return result;
}

function checkRight(grid: string[][], value: number, i: number, j: number) {
  let cursor = j;
  let result = 0;

  while (++cursor < grid[i].length) {
    result++;
    if (parseInt(grid[i][cursor]) >= value) {
      break;
    }
  }

  return result;
}

function getTileScore(grid: string[][], i: number, j: number) {
  const value = parseInt(grid[i][j]);

  return (
    checkTop(grid, value, i, j) *
    checkBottom(grid, value, i, j) *
    checkLeft(grid, value, i, j) *
    checkRight(grid, value, i, j)
  );
}

let max = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    max = Math.max(max, getTileScore(grid, i, j));
  }
}

console.log(max);

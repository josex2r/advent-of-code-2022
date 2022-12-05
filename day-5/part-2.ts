import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const cratesFilePath = path.join(__dirname, "crates.txt");
const inputFilePath = path.join(__dirname, "input.txt");

const transpose = (matrix: string[][]) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < row; column++) {
      let temp = matrix[row][column];
      matrix[row][column] = matrix[column][row];
      matrix[column][row] = temp;
    }
  }
  return matrix;
};
const reverse = (matrix: string[][]) =>
  matrix.map((row) =>
    row
      .reverse()
      .filter(Boolean)
  );

const move = (matrix: string[][], amount: number, from: number, to: number) => {
  const elems = matrix[from].splice(-amount);

  matrix[to].push(...elems);
};

const crates: string[][] = [];

for await (const line of await readLines(cratesFilePath)) {
  const lineCrates = line
    ?.match(/\[\w\]\s?|\s\s\s/g)
    ?.map((c) => c.replace(/\s/g, ""));

  crates.push(lineCrates as string[]);
}

const matrix = reverse(transpose(crates));

for await (const line of await readLines(inputFilePath)) {
  const [amount, from, to] = (line.match(/\d+/g) as string[]).map((n) =>
    Number(n)
  );

  move(matrix, amount, from - 1, to - 1);
}
console.log(matrix.map((row) => row[row.length - 1]).join(""));

import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

type Direction = "R" | "L" | "U" | "D";

const knots: [number, number][] = new Array(2).fill(0).map(() => [0, 0]);

const getPosition = (x: number, y: number) => `${x}:${y}`;

const visited: Record<string, number> = {};

function moveHead(direction: Direction, head: [number, number]) {
  // Move Head
  if (direction === "L") {
    head[0]--;
  } else if (direction === "R") {
    head[0]++;
  } else if (direction === "U") {
    head[1]--;
  } else {
    head[1]++;
  }
}

function moveKnot(
  direction: Direction,
  head: [number, number],
  tail: [number, number],
) {
  // Move tail
  const deltaX = Math.abs(head[0] - tail[0]);
  const deltaY = Math.abs(head[1] - tail[1]);

  // Skip move
  if (deltaX < 2 && deltaY < 2) {
    return;
  }

  // diagonal
  if ((deltaY > 1 && deltaX === 1) || (deltaX > 1 && deltaY === 1)) {
    // to right
    if (tail[0] < head[0]) {
      tail[0]++;
    } else {
      // to left
      tail[0]--;
    }
    // to up
    if (tail[1] < head[1]) {
      tail[1]++;
    } else {
      // to down
      tail[1]--;
    }
  } else if (deltaY === 2 || deltaX === 2) {
    // normal step
    moveHead(direction, tail);
  } else {
    // stay
  }
}

for await (const line of await readLines(filePath)) {
  const [direction, value] = line.split(" ");

  new Array(parseInt(value, 10)).fill(0).forEach(() => {
    moveHead(direction as Direction, knots[0]);

    knots.slice(1).forEach((knot, i) => {
      const prev: [number, number] = knots[i];

      moveKnot(direction as Direction, prev, knot);
    });

    // Register position
    const last = getPosition(...knots[knots.length - 1]);

    visited[last] = 1;
  });
}

console.log(Object.keys(visited).length);

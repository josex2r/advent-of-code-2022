import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const getLowerValue = (str: string) =>
  str.charCodeAt(0) - "a".charCodeAt(0) + 1;
const getUpperValue = (str: string) =>
  str.charCodeAt(0) - "A".charCodeAt(0) + 27;
const isUpper = (str: string) => str.charCodeAt(0) <= "Z".charCodeAt(0);
const getValue = (str: string): number =>
  isUpper(str) ? getUpperValue(str) : getLowerValue(str);

let result = 0;

for await (const line of await readLines(filePath)) {
  const half = Math.ceil(line.length / 2);
  const left = line.slice(0, half);
  const right = line.slice(half);
  const common = left.split("").find((char) => right.includes(char)) as string;

  result += getValue(common);
}

console.log(`Sum of common chars: ${result}`);

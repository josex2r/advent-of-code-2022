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
let lines: string[] = [];

for await (const line of await readLines(filePath)) {
  lines.push(line);

  if (lines.length < 3) continue;

  const [line1, line2, line3] = lines;
  const common = line1
    .split("")
    .find((char) => line2.includes(char) && line3.includes(char)) as string;

  result += getValue(common);
  lines = [];
}

console.log(`Sum of common chars: ${result}`);

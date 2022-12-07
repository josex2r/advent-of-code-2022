import { path } from "../deps.ts";
import { readLines } from "../utils/fs.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const filePath = path.join(__dirname, "input.txt");

const text = await Deno.readTextFile(filePath) as string;

const cursor = [...text].findIndex((c, i) => {
  const chunk = text.slice(i - 4, i);

  return [...new Set(chunk)].length === 4;
});

console.log(`Cursor: ${cursor}`);

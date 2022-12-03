import { buffer } from "../deps.ts";

export const readLines = async (filePath: string) => {
  const inputFile = await Deno.open(filePath);

  return buffer.readLines(inputFile);
};

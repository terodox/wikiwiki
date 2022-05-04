import { getRandomInt } from './get-random-int';

export async function sentenceFactory(): Promise<string> {
  const response = await fetch(`https://poetrydb.org/author,linecount/Shakespeare;14/lines`);
  if (!response.ok) {
    throw new Error('Failed to get a response');
  }

  const body = await response.json();

  const setCount = body.length;
  const randomSetIndex = getRandomInt(0, setCount - 1);

  const availableLineCount = body[randomSetIndex].lines.length;
  const randomLineIndex = getRandomInt(0, availableLineCount - 1);

  return body[randomSetIndex].lines[randomLineIndex];
}

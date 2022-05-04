import { getRandomInt } from './get-random-int';

export async function sentenceFactory(authorSearchTerm = 'Shakespeare'): Promise<string> {
  const response = await fetch(`https://poetrydb.org/author/${authorSearchTerm}/lines.json`);
  if (!response.ok) {
    throw new Error('Failed to get a response');
  }

  const body = await response.json();
  const availableLineCount = body[0].lines.length;

  const randomLineIndex = getRandomInt(0, availableLineCount - 1);

  return body[0].lines[randomLineIndex];
}

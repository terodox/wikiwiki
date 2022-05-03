export async function sentenceFactory(searchTerm = 'harry potter'): Promise<String[]> {
  const response = await fetch(
    `https://poetrydb.org/title/${searchTerm}/lines.json`
  );
  if (!response.ok) {
    throw new Error('Failed to get a response');
  }

  const body = await response.json();
  return body[0].lines;
}

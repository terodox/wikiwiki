import { attributes, SentenceDisplay } from './components/sentence-display';

export function gameManager({
  congratsTag,
  sentence,
  sentenceTag,
}: {
  congratsTag: HTMLElement;
  sentence: string;
  sentenceTag: SentenceDisplay;
}): AbortController {
  let currentIndex = 0;
  sentenceTag.setAttribute(attributes.sentence, sentence);
  sentenceTag.setAttribute(attributes.currentIndex, currentIndex.toString());
  congratsTag.classList.remove('show');
  sentenceTag.classList.remove('hidden');
  const gameOverAbortController = new AbortController();

  document.addEventListener(
    'keypress',
    (event) => {
      sentenceTag.removeAttribute(attributes.isFailing);
      if (event.key === sentence[currentIndex]) {
        currentIndex++;
        sentenceTag.setAttribute(attributes.currentIndex, currentIndex.toString());
      } else {
        sentenceTag.setAttribute(attributes.isFailing, '');
      }
      if (currentIndex === sentence.length) {
        congratsTag.classList.add('show');
        sentenceTag.classList.add('hidden');
        gameOverAbortController.abort();
      }
    },
    {
      signal: gameOverAbortController.signal,
    }
  );

  return gameOverAbortController;
}

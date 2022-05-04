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
  let { currentIndex } = resetGame({ congratsTag, sentence, sentenceTag });
  const gameOverAbortController = new AbortController();

  document.addEventListener(
    'keypress',
    (event) => {
      sentenceTag.removeAttribute(attributes.isFailing);
      if (event.key === sentence[currentIndex]) {
        currentIndex++;
        sentenceTag.setAttribute(attributes.currentIndex, currentIndex.toString());
      } else {
        setToFailingState(sentenceTag);
      }
      if (currentIndex === sentence.length) {
        finishGame({ congratsTag, sentenceTag });
        gameOverAbortController.abort();
      }
    },
    {
      signal: gameOverAbortController.signal,
    }
  );

  return gameOverAbortController;
}

function setToFailingState(sentenceTag: SentenceDisplay) {
  sentenceTag.setAttribute(attributes.isFailing, '');
}

function finishGame({ congratsTag, sentenceTag }: { congratsTag: HTMLElement; sentenceTag: SentenceDisplay }) {
  congratsTag.classList.add('show');
  sentenceTag.classList.add('hidden');
}

function resetGame({
  congratsTag,
  sentence,
  sentenceTag,
}: {
  congratsTag: HTMLElement;
  sentence: string;
  sentenceTag: SentenceDisplay;
}) {
  const currentIndex = 0;
  sentenceTag.setAttribute(attributes.sentence, sentence);
  sentenceTag.setAttribute(attributes.currentIndex, currentIndex.toString());
  congratsTag.classList.remove('show');
  sentenceTag.classList.remove('hidden');

  return {
    currentIndex,
  };
}

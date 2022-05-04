import './components/letter-display';
import { gameManager } from './game-manager';
import { congratsTag, resetButton, sentenceTag } from './index-tags';
import { sentenceFactory } from './services/sentence-factory';

const sentence = await sentenceFactory();
let abortController = gameManager({ congratsTag, sentence, sentenceTag });

resetButton.addEventListener('click', async () => {
  abortController.abort();
  const sentence = await sentenceFactory();
  abortController = gameManager({ congratsTag, sentence, sentenceTag });
  resetButton.blur();
});

export {};

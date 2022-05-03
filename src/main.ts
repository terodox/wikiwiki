import './components/letter-display';
import { attributes, SentenceDisplay } from './components/sentence-display';

const sentence = 'Mary';
let currentIndex = 0;
const sentenceTag = document.querySelector(SentenceDisplay.tag)!;
const congratsTag = document.querySelector('.congrats')!;
sentenceTag.setAttribute(attributes.sentence, sentence);

document.addEventListener('keypress', (event) => {
  console.log(event.key);
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
  }
});

export {};

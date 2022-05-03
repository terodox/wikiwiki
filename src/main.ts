import './components/letter-display';
import { attributes, SentenceDisplay } from './components/sentence-display';

const sentence = "Mary had a little lamb who's fleece was white as snow";
let currentIndex = 0;
const sentenceTag = document.querySelector(SentenceDisplay.tag)!;
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
});

export {};

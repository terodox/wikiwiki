import { attributes, SentenceDisplay } from './components/sentence-display';

document.addEventListener('keypress', (event) => {
  console.log(event.key);
});

const sentenceDisplay = document.querySelector(SentenceDisplay.tag)!;
sentenceDisplay.setAttribute(attributes.sentence, 'Hooray');

export {};

import { attributes as letterDisplayAttributes, LetterDisplay, LetterState } from './letter-display';
import { WordContainer } from './word-container';

export const attributes = {
  currentIndex: 'current-index',
  isFailing: 'is-failing',
  sentence: 'sentence',
};

const NONE_COMPLETED = 0;
export class SentenceDisplay extends HTMLElement {
  private root: ShadowRoot;
  private _currentIndex = NONE_COMPLETED;
  private _isFailing = false;
  private _sentence = '';
  private _sentenceContainer: HTMLElement;

  static get tag() {
    return 'sentence-display';
  }

  static get observedAttributes() {
    return Object.values(attributes);
  }

  attributeChangedCallback(attributeName: string, _: string, newValue: string) {
    if (attributeName === attributes.currentIndex) {
      this._currentIndex = parseInt(newValue);
    } else if (attributeName === attributes.isFailing) {
      this._isFailing = newValue !== null;
    } else if (attributeName === attributes.sentence) {
      this._sentence = newValue.trim();
    }
    this._updateDisplay();
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `
      <style>
        :host {
          --letter-container-size: 60px;
          --letter-size: var(--font-sizeLrg);
        }
        section > * {
          padding-left: var(--spacing-Med);
          padding-bottom: var(--spacing-Lrg);
        }

        ${WordContainer.tag} > * {
          padding-left: var(--spacing-xSm);
        }
      </style>
      <section>
      </section>
    `;

    // a trailing ! is a non-null assertion operator
    this._sentenceContainer = this.root.querySelector<HTMLElement>('section')!;
  }

  private _updateDisplay() {
    this._sentenceContainer.innerHTML = '';
    const letters: HTMLElement[] = [];
    [...this._sentence].forEach((letter, index) => {
      let letterState = LetterState.untouched;
      if (index < this._currentIndex) {
        letterState = LetterState.correct;
      } else if (index === this._currentIndex && this._isFailing) {
        letterState = LetterState.incorrect;
      } else if (index === this._currentIndex) {
        letterState = LetterState.active;
      }

      let safeLetter = letter;
      if (letter === ' ') {
        appendWord(this._sentenceContainer, letters);
        letters.length = 0;
        safeLetter = '&nbsp;';
        const letterDisplay = createLetterDisplay(safeLetter, letterState);
        appendWord(this._sentenceContainer, [letterDisplay]);
        return;
      }

      const letterDisplay = createLetterDisplay(letter, letterState);
      letters.push(letterDisplay);
      if (index === this._sentence.length - 1) {
        appendWord(this._sentenceContainer, letters);
      }
    });
  }
}

function appendWord(sentenceContainer: HTMLElement, letters: HTMLElement[]) {
  if (letters.length === 0) {
    return;
  }
  const wordContainer = document.createElement(WordContainer.tag);
  letters.forEach((letterDisplay) => wordContainer.appendChild(letterDisplay));
  sentenceContainer.appendChild(wordContainer);
}

function createLetterDisplay(letter: string, letterState: LetterState) {
  const letterDisplay = document.createElement(LetterDisplay.tag);
  letterDisplay.innerHTML = letter;
  letterDisplay.setAttribute(letterDisplayAttributes.state, letterState);
  return letterDisplay;
}

if (!customElements.get(SentenceDisplay.tag)) {
  customElements.define(SentenceDisplay.tag, SentenceDisplay);
}

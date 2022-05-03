import { attributes as letterDisplayAttributes, LetterDisplay, LetterState } from './letter-display';

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
      this._sentence = newValue;
    }
    this._updateDisplay();
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `
      <style>
        h2 > * {
          padding-left: 10px;
          padding-bottom: 20px;
        }
      </style>
      <section>
        <h2>

        </h2>
      </section>
    `;

    // a trailing ! is a non-null assertion operator
    this._sentenceContainer = this.root.querySelector<HTMLElement>('h2')!;
  }

  private _updateDisplay() {
    this._sentenceContainer.innerHTML = '';
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
        safeLetter = '&nbsp;';
      }
      const letterDisplay = document.createElement(LetterDisplay.tag);
      letterDisplay.innerHTML = safeLetter;
      letterDisplay.setAttribute(letterDisplayAttributes.state, letterState);
      this._sentenceContainer.appendChild(letterDisplay);
    });
  }
}

if (!customElements.get(SentenceDisplay.tag)) {
  customElements.define(SentenceDisplay.tag, SentenceDisplay);
}

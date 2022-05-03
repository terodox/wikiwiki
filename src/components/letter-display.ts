import { ColorPalette } from '../color-palette';

export const attributes = {
  letter: 'letter',
  state: 'state',
};
export enum LetterState {
  untouched = 'untouched',
  incorrect = 'incorrect',
  correct = 'correct',
}
export class LetterDisplay extends HTMLElement {
  private _root: ShadowRoot;
  private _letterContainer: HTMLElement;
  private _stateContainer: HTMLElement;

  static get tag() {
    return 'letter-display';
  }

  static get observedAttributes() {
    return Object.values(attributes);
  }

  attributeChangedCallback(attributeName: string, _: string, newValue: string) {
    if (attributeName === attributes.letter) {
      this._updateLetter(newValue);
    }

    if (attributeName === attributes.state) {
      if (!Object.values(LetterState).includes(newValue as any)) {
        console.warn('Invalid letter state provided. Provided value:', newValue);
        return;
      }
      this._updateState(newValue as LetterState);
    }
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
      <style>
        .${LetterState.untouched} {
          background-color: ${ColorPalette.untouched};
        }
      </style>
      <figure class="${LetterState.untouched}">
        <span class="letter-container"></span>
      </figure>
    `;

    // a trailing ! is a non-null assertion operator
    this._letterContainer = this._root.querySelector<HTMLElement>('.letter-container')!;
    this._stateContainer = this._root.querySelector<HTMLElement>('figure')!;
  }

  private _updateLetter(newLetter: string) {
    this._letterContainer.textContent = newLetter;
  }

  private _updateState(newState: LetterState) {
    Object.values(LetterState).forEach((state) => {
      this._stateContainer.classList.remove(state);
    });

    this._stateContainer.classList.add(newState);
  }
}

if (!customElements.get(LetterDisplay.tag)) {
  customElements.define(LetterDisplay.tag, LetterDisplay);
}

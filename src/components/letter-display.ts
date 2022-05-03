import { ColorPalette, Font } from '../styles';

export const attributes = {
  state: 'state',
};
export enum LetterState {
  active = 'active',
  untouched = 'untouched',
  incorrect = 'incorrect',
  correct = 'correct',
}
export class LetterDisplay extends HTMLElement {
  private _root: ShadowRoot;
  private _stateContainer: HTMLElement;

  static get tag() {
    return 'letter-display';
  }

  static get observedAttributes() {
    return Object.values(attributes);
  }

  attributeChangedCallback(attributeName: string, _: string, newValue: string) {
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
        :host {
          display: inline-block;
        }
        figure {
          border-radius: 10px;
          color: ${Font.color};
          font-family: ${Font.family};
          font-size: ${Font.sizeLrg};
          height: 60px;
          width: 60px;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        figure .result-container > * {
          font-size: ${Font.sizeSm};
          position: absolute;
          display: none;
        }

        figure.${LetterState.correct} .correct-symbol,
        figure.${LetterState.incorrect} .incorrect-symbol {
          display: block;
          color: transparent;
          text-shadow: 0 0 0 black;
        }

        .${LetterState.active} {
          background-color: ${ColorPalette.active};
          border: 3px solid ${ColorPalette.activeBorder};
          border-bottom: 5px solid black;
        }
        .${LetterState.correct} {
          background-color: ${ColorPalette.correct};
          border: 3px solid ${ColorPalette.correctBorder};
        }
        .${LetterState.incorrect} {
          background-color: ${ColorPalette.incorrect};
          border: 3px solid ${ColorPalette.incorrectBorder};
          border-bottom: 5px solid black;
        }
        .${LetterState.untouched} {
          background-color: ${ColorPalette.untouched};
          border: 3px solid ${ColorPalette.untouchedBorder};
          font-weight: bold;
        }
      </style>
      <figure class="${LetterState.untouched}">
        <span class="letter-container">
          <slot></slot>
        </span>
        <div class="result-container">
          <span class="correct-symbol">✔️</span>
          <span class="incorrect-symbol">❌</span>
        </div>
      </figure>
    `;

    // a trailing ! is a non-null assertion operator
    this._stateContainer = this._root.querySelector<HTMLElement>('figure')!;
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

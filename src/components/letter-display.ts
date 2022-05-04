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
          color: var(--font-color);
          font-family: var(--font-family);
          font-size: var(--font-sizeLrg);
          line-height: var(--font-sizeLrg);
          height: var(--letter-container-size);
          width: var(--letter-container-size);
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        figure .result-container > * {
          font-size: var(--font-sizeSm);
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
          background-color: var(--color-active);
          border: 3px solid var(--color-activeBorder);
          border-bottom: 5px solid var(--color-activeBottomBorder);
          font-weight: bold;
        }
        .${LetterState.correct} {
          background-color: var(--color-correct);
          border: 3px solid var(--color-correctBorder);
        }
        .${LetterState.incorrect} {
          background-color: var(--color-incorrect);
          border: 3px solid var(--color-incorrectBorder);
          border-bottom: 5px solid black;
        }
        .${LetterState.untouched} {
          background-color: var(--color-untouched);
          border: 3px solid var(--color-untouchedBorder);
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

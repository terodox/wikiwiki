export const attributes = {
  sentence: 'sentence',
  typedLetters: 'typed-letters',
};
export class SentenceDisplay extends HTMLElement {
  private root: ShadowRoot;
  private _sentenceCompleted: HTMLSpanElement;
  private _sentenceRemaining: HTMLSpanElement;

  static get tag() {
    return 'sentence-display';
  }

  static get observedAttributes() {
    return Object.values(attributes);
  }

  attributeChangedCallback(attributeName: string, _: string, newValue: string) {
    if (attributeName === attributes.sentence) {
      this._sentenceRemaining.textContent = newValue;
    }

    if (attributeName === attributes.typedLetters) {
      this._sentenceCompleted.textContent = newValue;
    }
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `
      <style>
      </style>
      <section>
        <h2>
          <span class="completed"></span>
          <span class="remaining"></span>
        </h2>
      </section>
    `;

    // a trailing ! is a non-null assertion operator
    this._sentenceCompleted = this.root.querySelector<HTMLSpanElement>('.completed')!;
    this._sentenceRemaining = this.root.querySelector<HTMLSpanElement>('.remaining')!;
  }
}

if (!customElements.get(SentenceDisplay.tag)) {
  customElements.define(SentenceDisplay.tag, SentenceDisplay);
}

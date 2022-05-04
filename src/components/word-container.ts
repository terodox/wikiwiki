export class WordContainer extends HTMLElement {
  static get tag() {
    return 'word-container';
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        section {
          display: inline-block;
          height: var(--letter-container-size);
        }
      </style>
      <section>
        <slot></slot>
      </section
    `;
  }
}

if (!customElements.get(WordContainer.tag)) {
  customElements.define(WordContainer.tag, WordContainer);
}

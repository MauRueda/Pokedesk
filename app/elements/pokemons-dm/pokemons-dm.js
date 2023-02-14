import { LitElement, html } from 'lit-element';
class PokemonsDm extends LitElement {
  static get properties() {
    return {
      host: { type: String },
      results: { type: Array },
    };
  }

  constructor() {
    super();
    this.host = 'https://pokeapi.co/api/v2';
  }

  getPage(page) {
    const dp = this.shadowRoot.querySelector('#results');
    dp.host = this.host;
    dp.method = 'get';
    dp.generateRequest();
  }

  firstUpdated() {
    const dp = this.shadowRoot.querySelector('#results');
    dp.host = this.host;
    dp.path = this.path;
    dp.method = 'get';
    dp.generateRequest();
  }

  getResults(e) {
    this.dispatchEvent(new CustomEvent('firstData-event', {
      bubbles: true,
      composed: true,
      detail: e.detail.results
    }));
  }

  render() {
    return html`
      <bbva-core-generic-dp @request-success="${this.getResults}" id="results"></bbva-core-generic-dp>
    `
  }

}
customElements.define('pokemon-dm', PokemonsDm);

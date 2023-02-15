//import { CellsPage } from '@cells/cells-page';
import { LitElement, html } from "lit-element";
import styles from "./list-pokemon-elements-styles.js";

class ListPokemon extends LitElement {
  static get properties() {
    return {
      dataPokeInfo: { Type: Array },
      page: { Type: Number, notify: true },
      pokImage: { type: String },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.dataPokeInfo = [];
    this.page = 0;
  }

  firstUpdated() {
    const pagination = this.shadowRoot.querySelector("#pagination");

    pagination.addEventListener("next-click", (ev) => {
      this.page += 20;
      console.log("Next Page", this.page);
      this._CustomEvent("navigation-event", this.page);
    });

    pagination.addEventListener("back-click", (ev) => {
      this.page -= 20;
      console.log("Back Page", this.page);
      this._CustomEvent("navigation-event", this.page);
    });

    pagination.addEventListener("first-click", () => {
      this.page = 0;
      console.log("First Page", this.page);
      this._CustomEvent("navigation-event", this.page);
    });

    pagination.addEventListener("number-click", (ev) => {
      console.log("Number Page", ev.detail * 10 * 2);
      this.page = ev.detail * 10 * 2 - 20;
      this._CustomEvent("navigation-event", this.page);
    });
  }

  _CustomEvent(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: detail,
      })
    );
  }

  render() {
    return html`${this.dataTemplate}`;
  }

  _goToPokeDetail(pokeDetail) {
    this.dispatchEvent(
      new CustomEvent("detail-event", {
        bubbles: true,
        composed: true,
        detail: pokeDetail,
      })
    );
  }

  get dataTemplate() {
    this.dataPokeInfo.map((pokeItem) => console.log("datatempolate", pokeItem));
    return html`
      <div data-grid="region">
        <div data-grid="zone">
          <div class="container">
            ${this.dataPokeInfo.map(
              (pokeItem) => html`
          ${console.log("nuevo", pokeItem)}
          <bbva-web-card-product
            image="${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeItem.id}.png`}"
            @click="${() => this._goToPokeDetail(pokeItem)}" heading="${
                pokeItem.name
              }">
          </bbva-web-card-product>
        </div>`
            )}
          </div>
        </div>
      </div>
      <bbva-web-navigation-pagination
        current-page="1"
        id="pagination"
        pages="24"
        results="460"
        visible-pages="10"
        visible-result="${this.page + 20}"
      >
      </bbva-web-navigation-pagination>
    `;
  }
}
customElements.define("list-pokemon-elements", ListPokemon);

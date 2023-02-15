import { LitElement, html } from "lit-element";
import styles from "./detail-pokemon-element-styles";

class DetailPokemon extends LitElement {
  static get properties() {
    return {
      pokemonDetail: { type: Object },
      evolutions: { type: Array },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [styles];
  }

  _goToEvolution({ evolutions }) {
    this.dispatchEvent(
      new CustomEvent("evolution-event", {
        bubbles: true,
        composed: true,
        detail: evolutions,
      })
    );
  }

  _getVariant(name) {
    switch (name) {
      case "hp":
        return "success";
      case "attack":
        return "warning";
      case "defense":
        return "";
      case "special-attack":
        return "error";
      case "special-defense":
        return "";
      case "speed":
        return "error";
    }
  }

  get buldingDetailStructure() {
    return html`
      <div data-grid="region">
        <div data-grid="zone">
          <div class="container">
            <bbva-core-image
              alt="Ascender logo"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this
                .pokemonDetail.id}.png"
            ></bbva-core-image>
            <bbva-web-card-product
              heading="${this.pokemonDetail.name.toUpperCase()}"
              subheading="Type: ${this.pokemonDetail.types[0].type.name}"
              categories-list-label="Categories List"
              main-link-icon="bbva:info"
              button-text="${this.evolutions.length > 0 ? "Evolutions" : ""}"
              @button-click="${() => this._goToEvolution(this.pokemonDetail)}"
            >
              ${this.pokemonDetail.stats.map(
                (statItem) => html`
                  <bbva-web-list-item-bullet slot="option">
                    ${statItem.stat.name.toUpperCase()}
                    <bbva-web-progress-bar
                      variant=${this._getVariant(statItem.stat.name)}
                      current="${statItem.base_stat}"
                    >
                    </bbva-web-progress-bar>
                  </bbva-web-list-item-bullet>
                `
              )}

              <bbva-web-badge-category
                slot="category"
                icon="bbva:bullet"
                text="Height: ${this.pokemonDetail.height} cm"
              >
              </bbva-web-badge-category>
              <bbva-web-badge-category
                slot="category"
                icon="bbva:bullet"
                text="Weigth: ${this.pokemonDetail.weight} g"
              >
              </bbva-web-badge-category>
            </bbva-web-card-product>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`${this.buldingDetailStructure}`;
  }
}

customElements.define("detail-pokemon-element", DetailPokemon);

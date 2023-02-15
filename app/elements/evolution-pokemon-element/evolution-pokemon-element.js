import { LitElement, html } from "lit-element";
import styles from "./evolutions-pokemon-element-styles";

class EvolutionPokemon extends LitElement {
  static get properties() {
    return {
      pokemonEvolution: { type: Array },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [styles];
  }

  get buldingDetailStructure() {
    return html`
      <div data-grid="region">
        <div data-grid="zone">
          <div class="container">
            ${this.pokemonEvolution.map(
              (EvoItem) => html`
                <bbva-web-card-product
                  image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${EvoItem.id}.png"
                  heading="${EvoItem.name}"
                  subheading="Type: ${EvoItem?.types[0]?.type.name}"
                  categories-list-label="Categories List"
                  main-link-icon="bbva:info"
                >
                  ${EvoItem.stats.map(
                    (statItem) => html`
                      <bbva-web-list-item-bullet slot="option">
                        <p class="legend">"${statItem.stat.name}"</p>
                        <bbva-web-progress-bar
                          variant="warning"
                          current="${statItem.base_stat}"
                        >
                        </bbva-web-progress-bar>
                      </bbva-web-list-item-bullet>
                    `
                  )}
                  <bbva-web-badge-category
                    slot="category"
                    icon="bbva:bullet"
                    text="Height:${EvoItem.height} cm"
                  >
                  </bbva-web-badge-category>
                  <bbva-web-badge-category
                    slot="category"
                    icon="bbva:bullet"
                    text="Weigth: ${EvoItem.weight} g"
                  >
                  </bbva-web-badge-category>
                </bbva-web-card-product>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`${this.buldingDetailStructure}`;
  }
}

customElements.define("evolution-pokemon-element", EvolutionPokemon);

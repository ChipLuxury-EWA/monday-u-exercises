const URL = "https://pokeapi.co/api/v2/pokemon";

export class PokemonClient {
    constructor() {
        this.pokemonName = "";
    }
    fetchPokemonById = async (id) => {
        const response = await fetch(`${URL}/${id}`);
        const ans = await response.json();
        this.pokemonName = ans.name;
    };
}

const URL = "https://pokeapi.co/api/v2/pokemon";

export class PokemonClient {
    constructor() {
        this.pokemonName = "";
    }
    fetchPokemonById = async (id) => {
        const response = await fetch(`${URL}/${id}`);
        const ans = await response.json();
        return ans
    };
    getPokemonNameById = async (id) => {
        const pokemon = await this.fetchPokemonById(id)
        this.pokemonName = [pokemon.name]
    }

    testReturn = () => {
        return "2"
    }
}

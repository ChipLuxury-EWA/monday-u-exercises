const URL = "https://pokeapi.co/api/v2/pokemon";

export class PokemonClient {
    constructor() {
        this.pokemonName = [];
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
    catchThemAll = async(idsArray) => {
        this.pokemonName = []        
        await Promise.all(idsArray.map(async id => {
            const pokemon = await this.fetchPokemonById(id)
            this.pokemonName.push(pokemon.name)
        }))
    }

}

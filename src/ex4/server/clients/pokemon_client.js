import axios from "axios";

const URL = "https://pokeapi.co/api/v2/pokemon";

export class PokemonClient {
    constructor() {
        this.pokemonNames = [];
    }
    fetchPokemonByIdOrName = async (id) => {
        const response = await axios.get(`${URL}/${id}`);
        if (response.status === 200) {
            const ans = await response.data;
            return ans;
        } else if (response.status === 404) {
            return false;
        }
    };
    getPokemonNameById = async (id) => {
        const pokemon = await this.fetchPokemonByIdOrName(id);
        this.pokemonNames = [pokemon.name];
    };
    getPokemonImgByName = async (name) => {
        const pokemon = await this.fetchPokemonByIdOrName(name);
        if (pokemon === false) {
            return "";
        } else {
            this.pokemonImgUrl = pokemon.sprites.front_default;
            return this.pokemonImgUrl;
        }
    };
    catchThemAll = async (idsArray) => {
        this.pokemonNames = [];
        await Promise.all(
            idsArray.map(async (id) => {
                const pokemon = await this.fetchPokemonByIdOrName(id);
                this.pokemonNames.push(pokemon.name);
            })
        );
    };
}

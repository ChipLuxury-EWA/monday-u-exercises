import Image from "ascii-art-image";
import fetch from "node-fetch";
const URL = "https://pokeapi.co/api/v2/pokemon";

export class PokemonClient {
    constructor() {
        this.pokemonNames = [];
    }

    fetchPokemonByIdOrName = async (id) => {
        const response = await fetch(`${URL}/${id}`);
        if (response.status === 200) {
            const ans = await response.json();
            return ans;
        } else if (response.status === 404) {
            console.log("ERROR - fetching pokemon failed")
            return false;
        }
    };

    getPokemonNameById = async (id) => {
        const pokemon = await this.fetchPokemonByIdOrName(id);
        this.pokemonNames = [pokemon.name];
        return this.pokemonNames;
    };

    getPokemonImgById = async (name) => {
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

    printPokemonAscii = async (id) => {
        const img = await this.getPokemonImgById(id)
        const image = new Image({
            filepath: img,
            alphabet: "blocks",
        });
    
        image.write(function (err, rendered) {
            console.log(rendered);
        });
    };

}

const PokemonClient = require("../clients/pokemon_client");
const { Task } = require("../db/models");

class ItemManager {
    constructor() {
        this.pokemonClient = new PokemonClient();
        this.items =  this.getItems()
    }

    getItems = async () => {
        return await Task.findAll()
    };
    

    handleItem = async (item) => {
        if (this._isNumber(item)) {
            return await this.fetchAndAddPokemon(item);
        }
        if (this._isList(item)) {
            return await this.fetchAndAddManyPokemon(item);
        }

        this.addItem(item);
    };

    addItem = (item) => {
        Task.create(item)
    };

    addPokemonItem = (pokemon) => {
        this.addItem(`Catch ${pokemon.name}`);
    };

    fetchAndAddPokemon = async (pokemonId) => {
        try {
            const pokemon = await this.pokemonClient.getPokemon(pokemonId);
            this.addPokemonItem(pokemon);
        } catch (error) {
            this.addItem(`Pokemon with ID ${pokemonId} was not found`);
        }
    };

    fetchAndAddManyPokemon = async (inputValue) => {
        try {
            const pokemons = await this.pokemonClient.getManyPokemon(
                inputValue.replace("/ /g", "").split(",")
            );
            pokemons.forEach(this.addPokemonItem);
        } catch (error) {
            console.error(error);
            this.addItem(
                `Failed to fetch pokemon with this input: ${inputValue}`
            );
        }
    };

    deleteItem = (item) => {
        this.items = this.items.filter((i) => i !== item);
    };

    _isNumber = (value) => !isNaN(Number(value));
    _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();

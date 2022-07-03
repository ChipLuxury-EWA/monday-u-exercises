const PokemonClient = require("../clients/pokemon_client");
const { Task } = require("../db/models");

class ItemManager {
    constructor() {
        this.pokemonClient = new PokemonClient();
        this.items = this.getItems();
    }

    getItems = async () => {
        console.log("get items from server route")
        return await Task.findAll();
    };

    handleItem = async (item) => {
        console.log(item);
        if (this._isNumber(item.taskName)) {
            return await this.fetchAndAddPokemon(item.taskName);
        }
        if (this._isList(item.taskName)) {
            return await this.fetchAndAddManyPokemon(item.taskName);
        }

        return await this.addItem(item);
    };

    addItem = async (item) => {
        return await Task.create(item);
    };

    addPokemonItem = (pokemon) => {
        this.addItem({ taskName: `Catch ${pokemon.name}` });
    };

    fetchAndAddPokemon = async (pokemonId) => {
        try {
            const pokemon = await this.pokemonClient.getPokemon(pokemonId);
            this.addPokemonItem(pokemon);
            return "ok";
        } catch (error) {
            this.addItem(`Pokemon with ID ${pokemonId} was not found`);
            return "Error";
        }
    };

    fetchAndAddManyPokemon = async (inputValue) => {
        try {
            const pokemons = await this.pokemonClient.getManyPokemon([
                ...new Set(inputValue.replace(/\s/g, "").split(",")),
            ]);
            pokemons.forEach(this.addPokemonItem);
        } catch (error) {
            console.error(error);
            this.addItem(
                `Failed to fetch pokemon with this input: ${inputValue}`
            );
        }
    };

    deleteItem = async (item) => {
        const ans = await Task.destroy({ where: { id: item.id } });
        if (ans === 1) {
            return `delete task #${item.id}`;
        } else {
            return `error delete task #${item.id}`;
        }
    };

    updateItem = async (item) => {
        console.log(`Update item ${item.id} status to ${item.status}`);
        const ans = await Task.update(
            { status: item.status, done: item.done },
            { where: { id: item.id } }
        );
        return `updated rows: ${ans}`;
    };

    _isNumber = (value) => !isNaN(Number(value));
    _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();

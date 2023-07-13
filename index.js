  
function getAllPokemon() {
    $.get("https://pokeapi.co/api/v2/pokemon", function (data) {
    for (let i = 0; i < 20; i++) {
        const pokemon = data.results[i];
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = pokemon.url;
        link.textContent = pokemon.name;
        link.addEventListener("click", function (event) {
        event.preventDefault();
        const pokemonUrl = this.href;
        getSinglePokemon(pokemonUrl);
        });
        listItem.appendChild(link);
        document.getElementById("pokemonList").appendChild(listItem);
    }
    });
}

function getSinglePokemon(url) {
    $.get(url, function (data) {
    const pokemonDetails = document.getElementById("pokemonDetails");
    pokemonDetails.innerHTML = "";
    const name = document.createElement("h2");
    name.textContent = data.name;
    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    const types = document.createElement("p");
    types.textContent =
        "Types: " +
        data.types
        .map(function (type) {
            return type.type.name;
        })
        .join(", ");
    pokemonDetails.appendChild(name);
    pokemonDetails.appendChild(image);
    pokemonDetails.appendChild(types);
    });
}

getAllPokemon();
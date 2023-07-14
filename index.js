document.addEventListener("DOMContentLoaded", function () {
  const pokemonList = document.getElementById("pokemonList");
  const pokemonDetails = document.getElementById("pokemonDetails");
  const backButton = document.getElementById("backButton");
  const pokemonInfo = document.getElementById("pokemonInfo");

  function getAllPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((pokemon) => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = pokemon.url;
          link.textContent = pokemon.name;
          link.addEventListener("click", function (event) {
            event.preventDefault();
            const pokemonUrl = this.href;
            showSinglePokemon(pokemonUrl);
          });
          listItem.appendChild(link);
          pokemonList.appendChild(listItem);
        });
      })
      .catch((error) => console.log(error));
  }

  function showSinglePokemon(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        pokemonList.classList.add("hidden");
        pokemonDetails.classList.remove("hidden");

        const name = document.createElement("h2");
        name.textContent = data.name;

        const image = document.createElement("img");
        image.src = data.sprites.front_default;

        const types = document.createElement("p");
        types.textContent =
          "Types: " + data.types.map((type) => type.type.name).join(", ");

        pokemonInfo.innerHTML = "";
        pokemonInfo.appendChild(name);
        pokemonInfo.appendChild(image);
        pokemonInfo.appendChild(types);
      })
      .catch((error) => console.log(error));
  }

  backButton.addEventListener("click", function () {
    pokemonList.classList.remove("hidden");
    pokemonDetails.classList.add("hidden");
  });

  getAllPokemon();
});

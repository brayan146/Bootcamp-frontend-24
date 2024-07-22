const url = "https://pokeapi.co/api/v2/pokemon";
const power = document.querySelector('.power');
async function getPokemon(id) {
  return fetch(`${url}/${id}`)
    .then((data) => data.json())
    .then((data) => data);
}

async function getPokemonValues(id) {
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return data.name;
}

function getImageID(id) {
  if (id >= 1000) {
    return id.toString();
  } else {
    const imageString = "00" + id;
    return imageString.slice(-3);
  }
}

function pokedexId() {
  const indexes = [];
  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * 1025) + 1;
    indexes.push(randomNumber);
  }
  return indexes;
}

let pokemonValues = [];

let selectedPokemon;

function showSelectedPokemon() {
  console.log(pokemonValues);
  const randomPokemonIndex = selectedPokemon;
  const pokemonId = pokemonValues[randomPokemonIndex];
  const id = getImageID(pokemonId);
  getPokemon(pokemonId).then((data) => {
    if (data) {
      const pokemonInfoDiv = document.getElementById("pokegame-info");

      pokemonInfoDiv.innerHTML = `
          <img id ="hide" src= ${
            "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
            id +
            ".png"
          }>
          `;
    }
  });
}

async function search() {
  pokemonValues = pokedexId();
  selectedPokemon = Math.floor(Math.random() * pokemonValues.length);
  await showSelectedPokemon();
  if (!document.getElementById("pokegame-container-button-4")) {
    await createButtons();
  }
  await updateButtons();
  power.classList.add('power-on');
}

function createButtons() {
  const pokegameContainer = document.getElementById(
    "pokegame-buttons-container"
  );
  const gameValue = document.getElementById("initial-value");
  gameValue.addEventListener("click", returnToNormalState);

  for (let i = 0; i < 3; i++) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "pokegame-container-button";
    buttonContainer.id = `pokegame-container-button-${i + 4}`;

    const newButton = document.createElement("button");
    newButton.id = `pokegame-button-${i}`;
    getPokemonValues(pokemonValues[i]).then((name) => {
      newButton.textContent = name;
    });
    buttonContainer.appendChild(newButton);
    newButton.addEventListener("click", checkButtonName);
    pokegameContainer.appendChild(buttonContainer);
  }
  gameValue.innerText = "Play Again";
}


async function updateButtons() {
  for (let i = 0; i < 3; i++) {
    const button = document.getElementById(`pokegame-button-${i}`);
    const name = await getPokemonValues(pokemonValues[i]);
    button.textContent = name;
  }
}
function checkButtonName(event) {
  getPokemonValues(pokemonValues[selectedPokemon]).then((correctName) => {
    const buttonName = event.target.textContent;
    const hideImage = document.getElementById("hide");

    if (buttonName === correctName) {
      event.target.style.backgroundColor = "green";
      hideImage.style.filter = "brightness(1)";
    } else {
      event.target.style.backgroundColor = "red";
      hideImage.style.filter = "brightness(0)";
    }
  });
}

function returnToNormalState() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.backgroundColor = "";
  });
}

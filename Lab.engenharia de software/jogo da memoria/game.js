const grid = document.querySelector(".grid");

const characters = [
  "castlevania",
  "final_fantasy",
  "mario",
  "megaman_x",
  "metal_slug",
  "metroid",
  "pacman",
  "pokemon",
  "sonic",
  "zelda",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('./imagens/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

loadGame();

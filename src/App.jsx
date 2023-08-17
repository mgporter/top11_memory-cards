import { useEffect, useState } from 'react';
import Section from './Section';
import MainWindow from './MainWindow';
import './App.css';
import defaultLoadingImg from './default-loading.png';

// Moana 4591; Tala 2796; Heihei 3045; Sina 6166; Chief Tui 1236; tamatoa 6582
// Kakamora 3580; Maui 4324; Pua 5507; Ocean 4967; Te Fiti 6623; Matai 4317

// Used for an unique id for both the initial list and the actual list
let counter = 0;

// before the API data comes in, use this info
const initialCards = [];
for (let i = 0; i < 12; i++) {
  initialCards.push(makeCharacterObject());
}

function makeCharacterObject(
  name = 'loading...',
  imageUrl = defaultLoadingImg
) {
  counter++;

  return {
    name: name.slice(0, 40), // make sure the name isn't too long
    imageUrl,
    id: counter,
  };
}

export default function App() {
  const [clickHistory, setClickedHistory] = useState([]);
  const [cards, setCards] = useState(initialCards);
  const [cardOrder, setCardOrder] = useState([...Array(cards.length).keys()]);

  const characterIds = [
    4591, 2796, 3045, 6166, 1236, 6582, 3580, 4324, 5507, 4967, 6623, 4317,
  ];

  useEffect(() => {
    // Create an array of promises representing an API call for each character
    const promises = [];
    for (let characterId of characterIds) {
      promises.push(fetchCharacterData(characterId));
    }

    // When all of those promises resolve, we'll set the 'cards' array to their values
    Promise.all(promises).then((dataArray) => {
      setCards(dataArray);
    });
  }, []);

  async function fetchCharacterData(id) {
    const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
    const data = await response.json();
    const {
      data: { name, imageUrl },
    } = data;
    const characterObject = makeCharacterObject(name, imageUrl);
    return characterObject;
  }

  async function addCard() {
    // This function will keep looping until a new character is found. If not found
    // after maxAttempts, then it will just return a loading placeholder.
    let attemptCount = 0;
    const maxAttempts = 50;
    while (true) {
      const randomCharacterId = Math.floor(Math.random() * 5000);
      const newCharacter = await fetchCharacterData(randomCharacterId);
      attemptCount++;
      console.log(newCharacter);
      if (newCharacter.name !== 'loading...') {
        setCards([...cards, newCharacter]);
        setCardOrder([...cardOrder, cardOrder.length]);
        return;
      } else if (attemptCount >= maxAttempts) {
        const newCharacter = makeCharacterObject();
        setCards([...cards, newCharacter]);
        setCardOrder([...cardOrder, cardOrder.length]);
        return;
      }
    }
  }

  function removeLastCard() {
    const newCardArray = [...cards];
    const newCardOrder = [...cardOrder];

    const lastCard = newCardArray.reduce((highest, current) => {
      return current.id > highest.id ? current : highest;
    }, -1);

    const lastOrderNumber = Math.max(...newCardOrder);

    newCardArray.splice(newCardArray.indexOf(lastCard), 1);
    newCardOrder.splice(newCardOrder.indexOf(lastOrderNumber), 1);

    setCards(newCardArray);
    setCardOrder(newCardOrder);
  }

  return (
    <div id="content-container">
      <Section
        clickHistory={clickHistory}
        cards={cards}
        addCard={addCard}
        removeLastCard={removeLastCard}
      />
      <Header />
      <MainWindow
        clickHistory={clickHistory}
        setClickedHistory={setClickedHistory}
        cards={cards}
        cardOrder={cardOrder}
        setCardOrder={setCardOrder}
      />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Moana (and Disney) Memory Cards</h1>
      <p>
        Can you click on every card once, but only once? If you click on the
        same card twice, your score will reset! Beware: the cards switch order
        after every click! For a greater challenge, add more random Disney
        characters by clicking the &#039;add random card&#039; button below.
      </p>
      <br />
      <p>
        Note that the character and images are pulled from the{' '}
        <a href="https://disneyapi.dev/" target="_blank" rel="noreferrer">
          Disney Api
        </a>
        , and not stored locally. If that api stops sending data, then the
        characters will not load.
      </p>
    </header>
  );
}

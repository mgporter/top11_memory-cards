import { useEffect, useState } from 'react';
import Section from './Section';
import MainWindow from './MainWindow';
import './App.css';

// Moana 4591; Tala 2796; Heihei 3045; Sina 6166; Chief Tui 1236; tamatoa 6582
// Kakamora 3580; Maui 4324; Pua 5507; Ocean 4967; Te Fiti 6623; Matai 4317

// Used for an unique id for both the initial list and the actual list
let counter = 0;

// before the API data comes in, use this info
const initialCards = [];
for (let i = 0; i < 12; i++) {
  initialCards.push(makeCharacterObject());
}

function makeCharacterObject(name = 'loading...', imageUrl = './') {
  counter++;

  return {
    name,
    imageUrl,
    id: counter,
  };
}

export default function App() {
  const [clickHistory, setClickedHistory] = useState([]);
  const [cards, setCards] = useState(initialCards);

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

    async function fetchCharacterData(id) {
      const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
      const data = await response.json();
      const {
        data: { name, imageUrl },
      } = data;
      const characterObject = makeCharacterObject(name, imageUrl);
      return characterObject;
    }
  }, []);

  return (
    <div id="content-container">
      <Section clickHistory={clickHistory} cards={cards} />
      <Header />
      <MainWindow
        clickHistory={clickHistory}
        setClickedHistory={setClickedHistory}
        cards={cards}
      />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Moana Memory Cards</h1>
      <p>
        Can you click on every card once, but only once? If you click on the
        same card twice, your score will reset! Beware: the cards switch order
        after every click! Good luck!
      </p>
    </header>
  );
}

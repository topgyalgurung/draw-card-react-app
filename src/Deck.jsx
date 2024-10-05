import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

/*

https://deckofcardsapi.com/api/deck/new/shuffle/ 
{
  "success": true,
  "deck_id": "gzng59wew91l",
  "remaining": 52,
  "shuffled": true
}

https://deckofcardsapi.com/api/deck/new/draw/ 
{
  "deck_id": "hgksrothrawm",
  "cards":[
    {
      "code": "QS",
      "image": "https://deckofcardsapi.com/static/img/QS.png",
      "images": {
        "svg": "https://deckofcardsapi.com/static/img/QS.svg",
        "png": "https://deckofcardsapi.com/static/img/QS.png"
      },
      "value": "QUEEN",
      "suit": "SPADES"
    }
  ],
  remaining: 
}
*/
const URL = "https://deckofcardsapi.com/api/deck";
function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [shuffling, setShuffling] = useState(false);

  const [isDrawing, setIsDrawing] = useState(false); // initial state no drawing
  const intervalRef = useRef(); // ref to hold the interval

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDrawing && deck) {
      intervalRef.current = setInterval(async () => {
        try {
          const res = await axios.get(`${URL}/${deck.deck_id}/draw/`);
          if (res.data.remaining === 0) {
            throw new Error("Error: no cards remaining!");
            clearInterval(intervalRef.current);
          }
          const card = res.data.cards[0];

          setDrawn((d) => [
            ...d,
            {
              id: card.code,
              name: card.suit + " of " + card.value,
              image: card.image,
            },
          ]);
        } catch (error) {
          alert(error);
          clearInterval(intervalRef.current);
          setIsDrawing(false);
        }
      }, 1000); // every second
    } else {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isDrawing, deck]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // shuffle the cards
        const response = await axios.get(`${URL}/new/shuffle`);
        setDeck(response.data); // success, deck_id, remaining, shuffled
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center"> Loading...</p>;
  if (error) return <p> Error: {error}</p>;

  // // draw card from the deck we got from first shuffle card
  // useEffect(async function draw() {
  //   try {
  //     // draw a card using deck_id stored in deck
  //     const res = await axios.get(`${URL}/${deck.deck_id}/draw/`);

  //     if (res.data.remaining === 0) {
  //       throw new Error("Error: no cards remaining ");
  //     }

  //     const card = res.data.cards[0];

  //     setDrawn((d) => [
  //       ...d, // spread prev drawn cards
  //       {
  //         id: card.code,
  //         name: card.suit + " of " + card.value,
  //         image: card.image,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.log("error from draw fetch ");
  //     console.log(error.message);
  //     alert(error);
  //   }
  // });

  async function shuffle() {
    setShuffling(true);
    try {
      await axios.get(`${URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]); // reset the drawn cards state to an empty array
    } catch (error) {
      alert(error);
    } finally {
      setShuffling(false);
    }
  }
  // const shuffleRef = useRef();
  // useEffect(() => {
  //   shuffleRef.data = setInterval(() => {}, 1000);

  //   return () => {
  //     second;
  //   };
  // }, [third]);

  // useRef hook to manage a setInterval call
  // when click button, draw single card and page will draw one card  every second
  // will continue until you press button again or until deck exhausted
  async function toggleDrawing() {
    if (!deck) return null;
    setIsDrawing((d) => !d);
  }

  function handleShuffleButton() {
    if (!deck) return null;
    return (
      <button
        className=" bg-[black] text-[white] mx-2.5 my-5 p-[15px] rounded-lg border-[none] hover:cursor-pointer hover:bg-[#444]"
        onClick={shuffle}
        disabled={shuffling}
      >
        Shuffle
      </button>
    );
  }
  function handleDrawButton() {
    if (!deck) return null;
    return (
      <button
        className=" bg-[black] text-[white] mx-2.5 my-5 p-[15px] rounded-lg border-[none] hover:cursor-pointer hover:bg-[#444]"
        onClick={toggleDrawing}
        disabled={shuffling}
      >
        {isDrawing ? "Stop Drawing" : "Start Drawing"}
      </button>
    );
  }

  return (
    <div className="text-center">
      <h1 className="my-4 text-teal-600"> Click to Draw Cards</h1>
      {handleDrawButton()}
      {/* Part 2: shuffle the deck */}
      {handleShuffleButton()}

      {/* {/* <button onClick={draw}> Gimme a Card</button>; */}
      <div className="mt-20 ">
        {drawn.map((c) => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </div>
  );
}

export default Deck;

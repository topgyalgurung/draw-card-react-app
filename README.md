#  Click to Draw Cards
- React + Vite + Tailwindcss 
- fetch api using axios, useEffect, useRef for setInterval

**Click to Draw**
An App that displays a deck of cards, one card at a time. When the page loads, go to the [Deck of Cards API](http://deckofcardsapi.com/) to create a new deck, and show a button on the page that will let you draw a card.

Every time you click the button, the page will draw one card every second. These draws will continue until you press the button again, or until the deck has been exhausted, an alert message should appear on the screen with the text “Error: no cards remaining!”.

**Shuffle The Deck**

Add a button that when clicked, will shuffle the deck, so that you can start drawing from a full deck without refreshing the page. You’ll have to make a call to the cards api to shuffle the existing deck. The button should not be clickable while the shuffle is in progress. The shuffle should remove all of the cards from the screen.
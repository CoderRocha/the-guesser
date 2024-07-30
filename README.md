# The Guesser

"The Guesser" is a simple card game project created by me, Guilherme Rocha, to understand more the process of creating a React Application from the ground up, utilizing many of the React features, such as "useEffect, useRef, useState" and many more.

# How to play the game?

After you download and extract all the source code on the zip file to it's own folder, you can run the following command in the project directory to install the necessary dependencies and components to run the application without any issues:

### `npm install`

After the installation, to run the application in a local server, run the following command:

### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The game is about a simple magical card game, where it displays 12 cards on the screen in a random order, and a "Turns" counter at the end of the array of cards. The player must find the match of each card in order to get all of the cards matched with the least amount of turns possible. After that, the game will then end because all of the cards have been matched.
If the player wants to try again, there's a "Start a New Game" button right below the cards so it can start a new game again, generating 12 new cards in random positions to try again and get a better score with less "Turns" to finish the game.

## Game Features

- 12 Randomly positioned cards each time a new game is started
- Option to start a new game anytime you want
- A "Turns" counter so you can see how many turns it took to you finish the game
- Last but not least, some music ambience to cheer you up (or to spook you up, it depends on your mood)

## Technologies used in this project

- HTML5
- CSS3
- Javascript
- React.js

### Final Considerations

The music may or may not start when the project is launched in the browser. If it doesn't start automatically, 
you can scroll to the bottom of the page and then, you can find a button named "Play Music" to play it manually and
enjoy this mysterious little theme i selected for the game's ambience.
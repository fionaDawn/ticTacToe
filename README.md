# TicTacToe

# Problem
Create a backend API that provides the necessary capabilities to support the game of Tic Tac Toe or Naughts and Crosses

### Basic user stories
- As an API user I should be able to create a new tic tac toe game session
- As an API user I should be able to complete a turn as the crosses (X) player
- As an API user I should be able to complete a turn as the naughts (O) player
- As an API user when I make a winning move, I should be informed and the game should be completed with a win status

#### Option 3: Front end
Build a frontend for your game, anyway you like, and have the full stack operational

### [Trello board](https://trello.com/b/Fndd8nNr/tictactoe)


# Solution

#### Pre-requisites:
- node
- yarn
- PORTS 3000 and 3001 are available to use

### How to run locally?
- Clone this repo

#### API
- go to the API folder e.g. `cd API/`
- run `yarn run dev`
- After that you’ll be able make requests to http://localhost:3001/
- API Documentation can be found [here](https://github.com/fionaDawn/ticTacToe/blob/api-docs/API/README.md)

#### Frontend
- go to the fronten folder e.g. `cd frontend/`
- run `yarn start`
- After that may access the game by typing in  http://localhost:3000/ on your browser

Homepage of the website will display an input that asks for board size and who the first player will be. Once game is started the players should take turns in choosing a card to own.

### How to test?
For API, run `yarn test` in the root folder

### What are the highlights of your logic/code writing style?
Initially I have thought of making the board size fixed to 3x3 size, but since it wasn't on the requirement and I wanted to have some level of difficulty on this game, players can choose how big the board size can be.

I have placed XY values on the grid to know specifically which grids the player owns. 

For horizontal matching, if player owns grids "22", "21", and "20" for a 3x3 board, then he wins since he owns all squares at the bottom grid(index 2). Since this is dynamic it always checks if the length of all same characters at index 0 is equal to the board size, then the user has made a horizontal winning match.

For vertical matching, it has the same concept as horizontal matching but it checks the character at index 1 instead of 0.

For the diagonal matching there a 2 ways to check. One is that both chracters ar index 0 and 1 are equal, e.g "00", "11", "22". Then the player gets a top left to bottom right diagonal match.

The top right to bottom left diagonal matching on the other hand checks the sum of characters at index 0 and index 1. If player owns all (x + y is equal to board size - 1), then he gets a diagonal match!

How do we decide if a game already has a winner? The game holds a winner key. By default this is empty. After checking for any winning moves, game.winner automatically gets updated if we find a match.

### Limitation
This can support dynamic number of board size but I don't recommend for it to be more than 10 since we have been using arrays in storing grid values then memory allocation could be really heavy. Imagine having a 10x10 board, so we automatically have 100items stored in XY array.
 

### What could you do better in your next iteration?
For the backend, boost test coverage, add more cases and integrate it to an actual DB to keep the game records. Right now, game data is only stored in memory, thus data will only be removed once we change something on the server.

As for the logic, find a way to not heavily use arrays.

For the frontend, styling and more interactive components. Validation for text inputs. 

### What were the questions you asked and your own answers/assumptions.

1. Is the board size fixed to 3x3?
   
2. How much test coverage should we place in order for the app to be tagged as tested with perfect quality.
   
3. Can we support other symbols aside from X and O?
   
### Any other notes you feel relevant for the evaluation of your solution?
I learned a lot of new stuff while doing the code assessment. This is my first time creating React and node app  from scratch in TypeScript. I felt like I dwelled too much on how logic of tic tac toe works. It has many ways to calculate the winner but I went with the dynamic way of doing it so we can support game difficulty level.

I would love to run all these in docker so no need to setup API and frontend separately if I had more time.

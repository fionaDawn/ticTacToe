/**
 * Data Model Interfaces
 */

import { Game, GameRequest, XOstr } from "./game.interface";
import { Player } from "../player/player.type";


/**
 * In-Memory Store
 */
let games: Game[] = [];

/**
 * Service Methods
 */
export const findAll = async (): Promise<Game[]> => games;

export const findById = async (id: number): Promise<Game> => games.find(g => g.id === id);

export const create = async (boardSize: number = 3, firstPlayer: XOstr = "X"): Promise<Game> => {
    const players: Player = {
        'X': [],
        'O': [],
    }
    const emptyStr: XOstr = '';
    const newEntry: Game = {
        id: new Date().valueOf(),
        boardSize: boardSize,
        blockedPositions: [],
        currentPlayer: firstPlayer,
        winner: emptyStr,
        players: players
    }
    games.push(newEntry)
    return newEntry;
}

export const move = async (id: number, updatedGame: GameRequest): Promise<Game> => {
    const { newPosition } = updatedGame;
    // get the current game session
    let currGame = await findById(id);
    if (!currGame) throw new Error("game does not exist")
    if (currGame.winner) throw new Error("this game was already won by player " + currGame.winner)
    const { boardSize, blockedPositions, currentPlayer } = currGame;

    // check for invalid index input
    // allowed range is only 0 to boardSize -1
    if (newPosition.split("").find(char => parseInt(char) >= boardSize))
        throw new Error("Invalid index position!")

    if (blockedPositions.find(p => p === newPosition)) throw new Error("position is taken!")

    // add newPosition to taken positions
    currGame.blockedPositions.push(newPosition)

    if (currGame.blockedPositions.length === (boardSize * boardSize)) throw new Error("DRAW!!!")

    // add new clicked cell
    currGame.players[currentPlayer].push(newPosition)

    // check if winner here
    // we check how many move the currentPlayer did,
    // if it's less than the boardSide no need to check if already the winner
    const positions = currGame.players[currentPlayer];
    let hasWinningPosition = false;
    if (positions.length >= boardSize) {
        // check for horizontal and vertical match
        // we do this together so we iterate on boardSize only once
        Array.from(Array(boardSize).keys()).every(idx => {
            if (hasWinningPosition) return false;
            hasWinningPosition = positions.filter(p => parseInt(p.charAt(0)) === idx).length === boardSize || positions.filter(p => parseInt(p.charAt(1)) === idx).length === boardSize;
            return true;
        })
        // check for diagonal match 
        // top-left to bottom right: all index positions are equal
        if (!hasWinningPosition) hasWinningPosition = positions.filter(p => p.charAt(0) === p.charAt(1)).length === boardSize
        if (!hasWinningPosition) hasWinningPosition = positions.filter(p => (parseInt(p.charAt(0)) + parseInt(p.charAt(1))) === boardSize - 1).length === boardSize
    }
    if (hasWinningPosition) currGame.winner = currentPlayer;
    else {
        // continue the game change player
        currGame.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    return currGame;
}

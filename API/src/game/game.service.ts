/**
 * Data Model Interfaces
 */

import { Game, GameRequest, XOstr } from "./game.interface";
import { Player } from "../player/player.type";
import { hasInvalidIndex, hasTopLeftToBottomRightDiagonal, hasTopRightToBottomLeftDiagonal, hasStraightLineMatch, isGameDraw, isNewPositionTaken } from "../util";

/**
 * In-Memory Store
 */
let games: Game[] = [];

/**
 * Service Methods
 */
export const findAllGames = async (): Promise<Game[]> => games;

export const findGameById = async (id: number): Promise<Game> => games.find(g => g.id === id);

export const startGame = async (boardSize: number = 3, firstPlayer: XOstr = "X"): Promise<Game> => {
    const players: Player = {
        'X': [],
        'O': [],
    }
    const emptyStr: string = '';
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

export const playerMove = async (id: number, updatedGame: GameRequest): Promise<Game> => {
    const { newPosition } = updatedGame;
    // get the current game session
    let currGame: Game = await findGameById(id);

    if (!currGame) throw new Error("game does not exist")

    if (currGame.winner)
        throw new Error("this game was already won by player " + currGame.winner)

    const { boardSize, blockedPositions, currentPlayer } = currGame;

    // check for invalid index input
    // allowed range is only 0 to boardSize -1
    if (hasInvalidIndex(newPosition, boardSize))
        throw new Error("Invalid index position!")

    if (isNewPositionTaken(blockedPositions, newPosition))
        throw new Error("position is taken!")

    // add newPosition to taken positions
    currGame.blockedPositions.push(newPosition)

    if (isGameDraw(currGame.blockedPositions, boardSize)) throw new Error("DRAW!!!")

    // add new clicked cell
    currGame.players[currentPlayer].push(newPosition)

    // check if winner here
    // we check how many move the currentPlayer did,
    // if it's less than the boardSide no need to check if already the winner
    const positions = currGame.players[currentPlayer];
    let hasWinningPosition = false;
    if (positions.length >= boardSize) {
        // check for diagonal match 
        // top-left to bottom right: all index positions are equal
        hasWinningPosition = hasTopLeftToBottomRightDiagonal(positions, boardSize);
        console.log("DIagonal 1", hasWinningPosition)
        // bottom-left to top right: all sum of positions are equal
        if (!hasWinningPosition) hasWinningPosition = hasTopRightToBottomLeftDiagonal(positions, boardSize);
        console.log("DIagonal 2", hasWinningPosition)
        // check for horizontal and vertical match
        // we do this together so we iterate on boardSize only once
        if (!hasWinningPosition) hasWinningPosition = hasStraightLineMatch(boardSize, positions);
    }

    if (hasWinningPosition) currGame.winner = currentPlayer;
    else {
        // continue the game change player
        currGame.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    return currGame;
}

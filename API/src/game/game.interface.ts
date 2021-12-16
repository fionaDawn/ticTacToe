import { Player } from "../player/player.type";

export type XOstr = 'X' | 'O';

export interface BaseGame {
  // positions: Array<number[]>;
  boardSize: number,
  players: Player,
  currentPlayer: XOstr;
  // blockedPositions: Array<number[]>;
  blockedPositions: string[];
  // winner is empty string by default. If there's 
  // a winner, current game is over
  winner: string;
}

export interface Game extends BaseGame {
  id: number;
}

export interface GameRequest {
  newPosition: string;
}
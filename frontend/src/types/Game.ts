export type GameRequestProps = {
    currentPlayer?: string,
    boardSize?: number
}
export type XOstr = 'X' | 'O' | '';

export interface BaseGame {
    // positions: Array<number[]>;
    boardSize?: number,
    players?: Player,
    currentPlayer?: XOstr;
    // blockedPositions: Array<number[]>;
    blockedPositions?: string[];
    // winner is empty string by default. If there's 
    // a winner, current game is over
    winner?: XOstr;
}

export interface Game extends BaseGame {
    id?: number;
}

export type Player = {
    // [key in XOstr]?: Array<number[]>;
    [key in XOstr]?: string[];
};

export type GridProps = {
    display: string;
    value: string;
}
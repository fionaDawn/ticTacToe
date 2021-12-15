import { XOstr } from "../game/game.interface";

export type Player = {
    // [key in XOstr]?: Array<number[]>;
    [key in XOstr]?: string[];
};
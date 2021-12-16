import { XOstr } from "../game/game.interface";

export type Player = {
    [key in XOstr]: string[];
}
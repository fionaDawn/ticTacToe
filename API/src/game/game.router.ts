/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as GameService from "./game.service";
import { BaseGame, Game, GameRequest, XOstr } from "./game.interface";

export const gamesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
gamesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Game[] = await GameService.findAll();

        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET items/:id
gamesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const item: Game = await GameService.findById(id);
        console.log(item)
        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send("game not found");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST game
gamesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseGame = req.body;
        const newItem = await GameService.create(item.boardSize, item.currentPlayer);

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id
gamesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const updatedGame: GameRequest = req.body;
        const updatedItem = await GameService.move(id, updatedGame);

        if (updatedItem) return res.status(200).json(updatedItem);
        else res.status(404).send("game not found");

    } catch (e) {
        res.status(500).send(e.message);
    }
});
import express from 'express';
import cors from 'cors';
import { gamesRouter } from "./src/game/game.router";

const app = express();

app.use(cors())
app.use(express.json());
app.use("/games", gamesRouter);


const port = 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
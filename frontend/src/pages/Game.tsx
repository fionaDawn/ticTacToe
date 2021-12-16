import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchGameById } from "../api/Game";
import Grid from "../components/Grid";
import { Game as GameProps, GridProps } from "../types/Game";

const Game: React.FC = () => {
    const { pathname } = useLocation()
    const [game, setGame] = useState<GameProps>({});
    const [list, setList] = useState<GridProps[]>([]);
    useEffect(() => {
        (async () => {
            const gameInfo: GameProps = await fetchGameById(pathname.replace("/game/", ""))
            if (gameInfo.id) setGame(gameInfo)
            else alert(gameInfo)
        })()
    }, [pathname])

    useEffect(() => {
        if (game.boardSize) {
            const arr: number[] = Array.from(Array(game.boardSize).keys());

            const list: GridProps[] = (arr.map(x =>
                arr.map(y => {
                    return { display: '', value: `${x}${y}` }
                })
            )).flat();
            setList(list);
        }
    }, [game.boardSize])

    if (!game.id) return null;

    const { boardSize, id, currentPlayer, winner, players } = game;

    return <div className="w-full" >
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Player: {currentPlayer}
            </label>
        </div>
        {winner ? <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                WINNER!: {winner}
            </label>
        </div> : null}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {boardSize ? <Grid currentPlayer={currentPlayer} list={list} size={boardSize} gameId={`${id}`} setGame={setGame} setList={setList} /> : null}
        </div>
    </div >

}

export default Game;
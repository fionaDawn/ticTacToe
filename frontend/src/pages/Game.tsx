import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchGameById, playerClickAction } from "../api/Game";
import Grid from "../components/Grid";
import { Game as GameProps, GridProps } from "../types/Game";

const Game: React.FC = () => {
    const { pathname } = useLocation()

    // store game information and any changes retrieved from API
    const [game, setGame] = useState<GameProps>({} as GameProps);
    // grid holder. should hold display text and cell value
    const [list, setList] = useState<GridProps[]>([]);

    useEffect(() => {
        (async () => {
            // get Id from URL path
            const gameInfo: GameProps = await fetchGameById(pathname.replace("/game/", ""))

            // if game info exist, load to game state
            if (gameInfo.id) {
                setGame(gameInfo)
            }
            else alert(gameInfo)
        })()
    }, [pathname])

    useEffect(() => {
        if (game.boardSize) {
            // create array from 0 to boardSize
            const arr: number[] = Array.from(Array(game.boardSize).keys());

            const xPositions = game.players['X'];
            const oPositions = game.players['O'];

            // then create a list of possible grid values
            // e.g. "00", "01", "02", etc
            const list: GridProps[] = (arr.map(x =>
                arr.map(y => {
                    const newPosition = `${x}${y}`;
                    return {
                        display: xPositions.indexOf(newPosition) >= 0 ? 'X' :
                            (oPositions.indexOf(newPosition) >= 0 ? 'O' : ''),
                        value: newPosition
                    }
                })
            )).flat();

            setList(list);
        }
    }, [game.boardSize, game.players])

    const handleSquareClick = async (position: string) => {
        if (game.id) {
            const { currentPlayer } = game;
            // update API through player actions
            const response = await playerClickAction(game.id, position)
            if (response.id) {
                // let's update the board here
                const currIdx: number = list.findIndex(v => v.value === position)
                list[currIdx] = { display: currentPlayer || '', value: position }
                setList(list)
                setGame(response)
            } else alert(response)
        }
    }

    if (!game.id) return null;

    const { boardSize, currentPlayer, winner } = game;

    return <div className="w-full" >
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Player: {currentPlayer}
            </label>
        </div>
        {/* {winner ? <div className="absolute m-auto bg-red-900 p-14">
            <label className="block text-white text-lg font-bold mb-2">
                Congratulations Player {winner}!
            </label>
        </div> : null} */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {boardSize ?
                <Grid
                    list={list}
                    size={boardSize}
                    handleSquareClick={handleSquareClick} /> : null}
        </div>
    </div >

}

export default Game;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGameById, playerClickAction } from "../api/Game";
import Grid from "../components/Grid";
import { Game as GameProps, GridProps } from "../types/Game";

const Game: React.FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate();

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

    return <div className="flex flex-col items-center justify-center m-20">

        <div className="flex flex-col  justify-center items-center bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            {winner ? <div className="mb-2 text-gray-900 text-lg font-bold bg-amber-300 p-4">
                WINNER: Player {winner}!
            </div> : <div className="mb-2 text-gray-700 text-sm font-bold">
                Current Player: {currentPlayer}
            </div>}

            {boardSize && !winner ?
                <Grid
                    list={list}
                    size={boardSize}
                    handleSquareClick={handleSquareClick} /> : null}
            <button className="mt-4 bg-orange-900 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate("/")}>Reset</button>
        </div>
    </div >

}

export default Game;
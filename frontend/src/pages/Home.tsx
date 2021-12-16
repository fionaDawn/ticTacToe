import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { start } from "../api/Game";
import { Game, GameRequestProps } from "../types/Game";

const Home: React.FC<GameRequestProps> = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<GameRequestProps>({
        boardSize: 3,
        currentPlayer: ''

    })

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.name === "boardSize" ? parseInt(e.currentTarget.value) : e.currentTarget.value })
    }

    const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
        console.log(form)
        const game: Game = await start(form);
        if (game.id) navigate(`/game/${game.id}`)
    }

    return <div className="w-full max-w-xs" >
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Board Size
                </label>
                <input value={form.boardSize} min="1" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="boardSize" type="number" placeholder="Defaults to 3" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Player
                </label>
                <input value={form.currentPlayer} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="currentPlayer" type="text" placeholder="X or O?" />
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClick}>
                    Start
                </button>
            </div>
        </form>
    </div >

}

export default Home;
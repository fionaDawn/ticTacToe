import axios from "axios";
import { GameRequestProps } from "../types/Game";

const API_BASE_URL = "http://localhost:3001"

export const start = async (gameConfig: GameRequestProps) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/games`, gameConfig)
        return response.data;
    } catch (e: any) {
        return e.response.data;
    }
}

export const fetchGameById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/games/${id}`)
        return response.data;
    } catch (e: any) {
        return e.response.data;
    }
}

export const playerClickAction = async (id: number, position: string) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/games/${id}`,
            { newPosition: position })
        return response.data;
    } catch (e: any) {
        return e.response.data;
    }
}
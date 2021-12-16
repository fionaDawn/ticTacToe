import { verify } from "crypto";
import { listenerCount } from "process";
import { playerClickAction } from "../api/Game";
import { Game, GridProps, Player, XOstr } from "../types/Game";

type GridComponentProps = {
    list: GridProps[];
    size: number;
    gameId: string;
    currentPlayer?: XOstr;
    setGame: (g: Game) => void;
    setList: (g: GridProps[]) => void;
}

const Grid: React.FC<GridComponentProps> = (props: GridComponentProps) => {
    const handleSquareClick = async (position: string) => {
        const { list } = props;
        const currIdx: number = list.findIndex(v => v.value === position)
        if (!list[currIdx].display) {
            list[currIdx] = { display: props.currentPlayer || '', value: position }
            props.setList(list)
        }
        const response = await playerClickAction(props.gameId, position)
        console.log(response)
        if (response.id) props.setGame(response)
        else alert(response)
    }

    return <div className={`grid grid-cols-${props.size}`}>
        {props.list.map((grid: GridProps, i: number) =>
            <button className="border-2 border-gray-400 h-36"
                key={i}
                onClick={() => handleSquareClick(grid.value)}>
                <h1 className="text-lg">{grid.display}</h1>
            </button>
        )}
    </div >
}

export default Grid;
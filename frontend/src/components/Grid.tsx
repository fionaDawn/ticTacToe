import { GridProps } from "../types/Game";
import Square from "./Square";

type GridComponentProps = {
    list: GridProps[];
    size: number;
    handleSquareClick: (g: string) => void;
}

const Grid: React.FC<GridComponentProps> = (props: GridComponentProps) => {
    const { size, list, handleSquareClick } = props;
    let arr = [...list];
    let result = [];
    while (arr.length > 0) {
        result.push(
            <div className="flex align-center justify-center">
                {arr.splice(0, size).map((grid: GridProps) =>
                    <Square key={grid.value} grid={grid} handleSquareClick={handleSquareClick} />
                )}
            </div>
        )
    }
    return <div>
        {result}
    </div >
}

export default Grid;
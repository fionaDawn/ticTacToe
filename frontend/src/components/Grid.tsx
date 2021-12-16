import { GridProps } from "../types/Game";
import Square from "./Square";

type GridComponentProps = {
    list: GridProps[];
    size: number;
    handleSquareClick: (g: string) => void;
}

const Grid: React.FC<GridComponentProps> = (props: GridComponentProps) => {
    const { size, list, handleSquareClick } = props;
    return <div className={`grid grid-cols-${size}`}>
        {list.map((grid: GridProps) =>
            <Square key={grid.value} grid={grid} handleSquareClick={handleSquareClick} />
        )}
    </div >
}

export default Grid;
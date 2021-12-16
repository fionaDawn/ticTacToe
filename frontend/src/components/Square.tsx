import { GridProps } from "../types/Game";

type SquareComponentProps = {
    grid: GridProps;
    handleSquareClick: (p: string) => void;
}

const Square: React.FC<SquareComponentProps> = (props: SquareComponentProps) => {
    const { grid, handleSquareClick } = props;
    return <button className="border-2 border-gray-400 h-36"
        onClick={() => handleSquareClick(grid.value)}>
        <h1 className="text-lg">{grid.display}</h1>
    </button>
}

export default Square;
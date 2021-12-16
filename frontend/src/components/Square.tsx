import { GridProps } from "../types/Game";

type SquareComponentProps = {
    grid: GridProps;
    handleSquareClick: (p: string) => void;
}

const Square: React.FC<SquareComponentProps> = (props: SquareComponentProps) => {
    const { grid, handleSquareClick } = props;
    return <button className="border-2 border-orange-900 bg-orange-300 h-20 w-20"
        onClick={() => handleSquareClick(grid.value)}>
        <h1 className="text-xl text-orange-900">{grid.display}</h1>
    </button>
}

export default Square;
interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
    isWinning?: boolean | null;
}

export default function Square({
    value,
    onSquareClick,
    isWinning,
}: SquareProps) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
            style={{
                backgroundColor: isWinning ? "#ffec99" : "#fff",
            }}>
            {value}
        </button>
    );
}

import Square from "./Square";
import type { Player } from "../../../types";
import { PLAYER_O, PLAYER_X } from "../../../constants";

interface BoardProps {
    xIsNext: boolean;
    squares: Player[];
    onPlay: (nextSquares: Player[]) => void;
    winningLine?: number[];
}

const range = [0, 1, 2];

export default function Board({
    xIsNext,
    squares,
    onPlay,
    winningLine,
}: BoardProps) {
    function handleClick(i: number) {
        if (squares[i] || (winningLine && winningLine.length > 0)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? PLAYER_X : PLAYER_O;
        onPlay(nextSquares);
    }

    function isWinningSquare(i: number) {
        return winningLine && winningLine.includes(i);
    }

    return (
        <div className="board-row">
            {range.map((row) => (
                <div key={row} className="row">
                    {range.map((col) => {
                        const index = row * 3 + col;

                        return (
                            <Square
                                key={index}
                                value={squares[index]}
                                onSquareClick={() => handleClick(index)}
                                isWinning={isWinningSquare(index)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

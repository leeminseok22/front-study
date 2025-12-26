import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner, type Player } from "./utils/calculateWinner";

interface HistoryItem {
    squares: Player[];
    lastMoveIndex: number | null;
}

export default function Game() {
    const [history, setHistory] = useState<HistoryItem[]>([
        { squares: Array(9).fill(null), lastMoveIndex: null },
    ]);
    const [currentMove, setCurrentMove] = useState<number>(0);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares: Player[]) {
        const diffIndex = nextSquares.findIndex(
            (val, index) => val !== currentSquares[index]
        );

        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            { squares: nextSquares, lastMoveIndex: diffIndex },
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((step, move) => {
        let description;

        if (move > 0 && step.lastMoveIndex !== null) {
            const row = Math.floor(step.lastMoveIndex / 3) + 1;
            const col = (step.lastMoveIndex % 3) + 1;
            description = `Go to move #${move} (${row}행 ${col}열)`;
        } else {
            description = "Go to game start";
        }

        return (
            <li key={move} style={{ marginBottom: "5px" }}>
                <button
                    onClick={() => jumpTo(move)}
                    style={{ padding: "5px 10px", cursor: "pointer" }}>
                    {description}
                </button>
            </li>
        );
    });

    const winInfo = calculateWinner(currentSquares);
    const winner = winInfo?.winner;

    let status;
    if (winner) {
        status = `Winner: ${winner} 🎉`;
    } else if (!currentSquares.includes(null)) {
        status = "Draw! (무승부)";
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <div
            className="game"
            style={{ display: "flex", gap: "40px", padding: "20px" }}>
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    winningLine={winInfo?.line}
                />
            </div>

            <div className="game-info">
                <div
                    style={{
                        fontSize: "24px",
                        marginBottom: "20px",
                        fontWeight: "bold",
                    }}>
                    {status}
                </div>
                <ol style={{ paddingLeft: "20px" }}>{moves}</ol>
            </div>
        </div>
    );
}

import { useState } from "react";
import { calculateWinner, type Player } from "../utils/calculateWinner";

interface HistoryItem {
    squares: Player[];
    lastMoveIndex: number | null;
}

export default function useTicTacToe() {
    const [history, setHistory] = useState<HistoryItem[]>([
        {
            squares: Array(9).fill(null),
            lastMoveIndex: null,
        },
    ]);
    const [currentMove, setCurrentMove] = useState<number>(0);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    const winInfo = calculateWinner(currentSquares);
    const winner = winInfo?.winner;

    let status;
    if (winner) {
        status = `Winner: ${winner} 🎉`;
    } else if (!currentSquares.includes(null)) {
        status = "Draw!";
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    function handlePlay(nextSquares: Player[]) {
        const diffIndex = nextSquares.findIndex(
            (val, index) => val !== currentSquares[index]
        );

        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            {
                squares: nextSquares,
                lastMoveIndex: diffIndex,
            },
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    return {
        history,
        currentMove,
        currentSquares,
        xIsNext,
        status,
        winningLine: winInfo?.line,

        handlePlay,
        jumpTo,
    };
}

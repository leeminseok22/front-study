import { useState } from "react";
import { calculateWinner } from "../utils/calculateWinner";
import type { Player, HistoryItem } from "../../../types";
import {
    PLAYER_O,
    PLAYER_X,
    STATUS_DRAW,
    STATUS_NEXT,
    STATUS_WINNER,
} from "../../../constants";

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
        status = `${STATUS_WINNER}${winner} 🎉`;
    } else if (!currentSquares.includes(null)) {
        status = STATUS_DRAW;
    } else {
        status = `${STATUS_NEXT}${xIsNext ? PLAYER_X : PLAYER_O}`;
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

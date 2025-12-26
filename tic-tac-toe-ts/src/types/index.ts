export type Player = "X" | "O" | null;

export interface WinnerResult {
    winner: Player;
    line: number[];
}

export interface HistoryItem {
    squares: Player[];
    lastMoveIndex: number | null;
}

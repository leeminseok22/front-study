import Board from "./components/Board";
import useTicTacToe from "./hooks/useTicTacToe";

export default function Game() {
    const {
        history,
        currentSquares,
        xIsNext,
        status,
        winningLine,
        handlePlay,
        jumpTo,
    } = useTicTacToe();

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

    return (
        <div
            className="game"
            style={{ display: "flex", gap: "40px", padding: "20px" }}>
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    winningLine={winningLine}
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

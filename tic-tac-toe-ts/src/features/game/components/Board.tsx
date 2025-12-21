import Square from "./Square";

export default function Board() {
    function handleClick() {
        console.log("test");
    }
    return (
        <div className="board-row">
            <div className="row">
                <Square value="1" onSquareClick={handleClick} />
                <Square value="2" onSquareClick={handleClick} />
                <Square value="3" onSquareClick={handleClick} />
            </div>
            <div className="row">
                <Square value="4" onSquareClick={handleClick} />
                <Square value="5" onSquareClick={handleClick} />
                <Square value="6" onSquareClick={handleClick} />
            </div>
            <div className="row">
                <Square value="7" onSquareClick={handleClick} />
                <Square value="8" onSquareClick={handleClick} />
                <Square value="9" onSquareClick={handleClick} />
            </div>
        </div>
    );
}

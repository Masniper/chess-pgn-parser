// Import necessary libraries
const { Chess } = require('chess.js');
let parse = require("@mliebelt/pgn-parser").parse;
const fs = require('fs');

// Define the PGN (Portable Game Notation) string
const pgn = "1. e4 e5 (1... c5 2. Nf3 d6 3. d4 (3. Nc3 Nf6 4. Bc4 (4. d4))) 2. Nf3 Nf6 3. Nxe5 (3. Nc3 Bc5 4. Bc4 d6 (4... O-O 5. O-O)) 3... d6 4. Nf3";
// Define the initial chess position in FEN (Forsyth–Edwards Notation)
const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
// Create a new instance of the Chess game
const chessInstance = new Chess(initialPosition);
chessInstance.load(initialPosition);
// Parse the PGN string into a game object
let game = parse(pgn, { startRule: "game" });
// Function to convert move notation into an object
const convertMoveToObject = (id, number, name, player, fen) => {
    return {
        id: id,
        number: number,
        name: name,
        player: player,
        fen: fen,
        commentary: "",
        styles: {},
        arrows: [],
        sub_variation: [],
    };
};

// Function to parse chess notation into an object
function parseChessNotation(notation) {
    let parsedMoves = [];
    // Get initial position's FEN
    const FirstFen = chessInstance.fen();
    // Add initial position to parsedMoves
    parsedMoves.push(convertMoveToObject("m0", "", "", "", FirstFen));
    // Iterate through moves in the notation
    notation.moves.map((move, m_index) => {
        const secFen = chessInstance.fen();
        const Id = `m${m_index + 1}`;
        const Move = move.notation.notation;
        const Player = move.turn;
        const Number = chessInstance.moveNumber();
        // Make the move on the chess board
        chessInstance.move(Move);
        const Fen = chessInstance.fen();
        // Convert move to object
        const moveObj = convertMoveToObject(Id, Number, Move, Player, Fen);
        // Recursive function to parse sub-moves
        function parseMoves(SubMovesOfSubMoves, subChessInstance, parentIndex) {
            return SubMovesOfSubMoves.map((item, index) => {
                let SubMoveId = `${Id}-s${parentIndex + 1}-${index + 1}`;
                let SubMovePlayer = item.turn;
                let subMoveName = item.notation.notation;
                let initialSubFen = subChessInstance.fen();
                let SubMoveNumber = subChessInstance.moveNumber();
                // Make the sub-move on the sub-board
                try {
                    subChessInstance.move(subMoveName);
                } catch (error) {
                    console.error(`Error Invalid Move ! Standards Move for ( ${SubMoveId} ) Is:`, subChessInstance.moves());
                }
                let SubMoveFen = subChessInstance.fen();
                const SMTO = convertMoveToObject(SubMoveId, SubMoveNumber, subMoveName, SubMovePlayer, SubMoveFen);
                // Recursively parse sub-variations
                if (item.variations[0]) {
                    let letSubOfSubMove = item.variations.map((SecItem) => {
                        const SecsubChessInstance = new Chess(initialSubFen);
                        return parseMoves(SecItem, SecsubChessInstance, parentIndex + 1);
                    });
                    SMTO.sub_variation = letSubOfSubMove;
                }
                return SMTO;
            });
        }
        // Parse sub-moves
        const SubMoves = move.variations.map((s_move, s_index) => {
            const subChessInstance = new Chess(secFen);
            return parseMoves(s_move, subChessInstance, s_index);
        });
        // Add sub-moves to main move object
        moveObj.sub_variation = SubMoves;
        parsedMoves.push(moveObj);
    });
    return parsedMoves;
}
// Parse the chess notation and log the result
const parsedMoves = parseChessNotation(game);
// console.log(JSON.stringify(parsedMoves, null, 2));
// Save the parsed moves to a JSON file
fs.writeFile('parsedMoves.json', JSON.stringify(parsedMoves, null, 2), (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('Successfully wrote to parsedMoves.json');
    }
});
console.log(chessInstance.ascii());

import React from "react";
import io from 'socket.io-client';

import BoardCell from "../../classes/BoardCell";
import BoardPiece from "../../classes/BoardPiece";

import "./Board.scss";

const ENDPOINT = 'http://localhost:5000/';

const socket = io(ENDPOINT);

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        let board = [];
        for (let i = 0; i < 8; i++) {
            board.push([]);
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 1) {
                    if (i < 3) {
                        board[i].push(new BoardCell(i, j, new BoardPiece(2, i, j)));
                    } else if (i >= 5) {
                        board[i].push(new BoardCell(i, j, new BoardPiece(1, i, j)));
                    } else {
                        board[i].push(new BoardCell(i, j));
                    }
                } else {
                    board[i].push(new BoardCell(i, j));
                }
            }
        }

        this.state = {
            board: board,
            targets: [],
            pieceToMove: null,
            player: 1
        };

        
    }

    componentDidMount() {
        socket.on('move', (cell, piece) => {
            this.movePiece(piece, cell);
        });
    }

    showMoveTargets(piece, row, col) {
        this.setState({
            targets: this.getMoveTargets(row, col),
            pieceToMove: piece
        })
    }

    // Returns an array of coordinates of valid move targets
    getMoveTargets(row, col) {
        const board = this.state.board;
        const piece = board[row][col].piece;

        let res = []

        let targets = [
            [row-1, col-1],
            [row+1, col-1],
            [row-1, col+1],
            [row+1, col+1]
        ]
        
        targets.forEach(el => {
            if (this.canMoveTo(piece, el[0], el[1])) {
                res.push(board[el[0]][el[1]]);
            }
        })

        return res;

    }

    canMoveTo(piece, row, col) {
        if (!piece.isKing) {
            // Player 1 cannot move down
            // Player 2 cannot move up
            if ((piece.player === 1 && row > piece.row) || (piece.player === 2 && row < piece.row)) {
                return false;
            }
        }
        if (row >= 0 && col >= 0 && row < 8 && col < 8) {
            if (!this.state.board[row][col].hasPiece()) {
                return true;
            }
        }

        return false;
    }

    handleCellClick(cell) {
        if (!this.state.targets.includes(cell)) {
            return;
        }
        socket.emit('move', cell, this.state.pieceToMove);
        this.movePiece(this.state.pieceToMove, cell)
    }

    movePiece(piece, cell) {
        let board = this.state.board;

        board[piece.row][piece.col].piece = null;
        piece.row = cell.row;
        piece.col = cell.col;
        board[cell.row][cell.col].piece = piece;

        this.setState({
            targets: [],
            pieceToMove: null,
            board: board
        });
    }

    render() {
        return (
            <div className="board">
                {this.state.board.map((row, rowId) => (
                    <div className="row" key={rowId}>
                        {row.map((cell, colId) => (
                            <div 
                                className={`cell ${cell.canHavePiece() ? "moveable" : ""}`} 
                                key={colId}
                                onClick={() => this.handleCellClick(cell)}
                            >
                                {
                                    cell.hasPiece() && 
                                    <div 
                                        className={`piece player${cell.piece.player}`}
                                        onClick={() => this.showMoveTargets(cell.piece, rowId, colId)}
                                    />
                                }
                                {
                                    this.state.targets.includes(cell) && 
                                    <div className="target-marker"></div>
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

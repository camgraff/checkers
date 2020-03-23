import React from 'react';
import io from 'socket.io-client';

import BoardCell from '../../classes/BoardCell';
import BoardPiece from '../../classes/BoardPiece';

import { Icon } from '@iconify/react';
import chessQueen from '@iconify/icons-mdi/chess-queen';
import './Board.scss';

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
            player: null,
            isMyTurn: false,
            inJumpChain: false
        };
    }

    componentDidMount() {
        socket.on('player-number', (player) => {
            if (player === 1) {
                this.setState({
                    isMyTurn: true
                });
            }
            this.setState({
                player: player
            });
        });
        socket.on('move', (cell, piece) => {
            this.movePiece(piece, cell);
        });

        socket.on('endturn', () => {
            console.log('my turn');
            this.setState({
                isMyTurn: true
            });
        });
    }

    showMoveTargets(piece) {
        if (this.state.isMyTurn && !this.state.inJumpChain && piece.player === this.state.player) {
            this.setState({
                targets: this.getMoveTargets(piece.row, piece.col),
                pieceToMove: piece
            });  
        }
        
    }

    // Returns an array of coordinates of valid move targets
    getMoveTargets(row, col) {
        const board = this.state.board;
        const piece = board[row][col].piece;

        let res = [];

        this.getPossibleTargets(piece).forEach(adj => {
            if (adj.hasPiece()) {
                const jumpTarget = this.canJumpOver(piece, adj.piece);
                if (jumpTarget !== null) {
                    res.push(jumpTarget);
                }
            } else {
                if (this.canMoveTo(piece, adj)) {
                    res.push(adj);
                }
            }
        });
        return res;
    }

    canMoveTo(piece, cell) {
        if (!piece.isKing) {
            // Player 1 cannot move down
            // Player 2 cannot move up
            if ((piece.player === 1 && cell.row > piece.row) || (piece.player === 2 && cell.row < piece.row)) {
                return false;
            }
        }
        if (!cell.hasPiece()) {
            return true;
        }
        return false;
    }

    /**
     * Returns the target cell if the pieceToJump can be jumped, otherwise returns false.
     *
     * @param BoardPiece pieceToMove
     * @param BoardPiece pieceToJump
     */
    canJumpOver(pieceToMove, pieceToJump) {
        if (pieceToMove.player === pieceToJump.player) {
            return false;
        }
        const board = this.state.board;
        const row = 2 * (pieceToJump.row - pieceToMove.row) + pieceToMove.row;
        const col = 2 * (pieceToJump.col - pieceToMove.col) + pieceToMove.col;

        if (row >= 0 && col >= 0 && row < 8 && col < 8 && !board[row][col].hasPiece()) {
            return board[row][col];
        }

        return false;
    }

    handleCellClick(cell) {
        if (!this.state.targets.includes(cell)) {
            return;
        }
        socket.emit('move', cell, this.state.pieceToMove);
        if (!this.movePiece(this.state.pieceToMove, cell)) {
            this.endTurn();
        }
    }

    /**
     * Moves a piece on the board.
     *
     * @param BoardPiece piece
     * @param BoardCell cell
     *
     */
    movePiece(piece, cell) {
        let board = this.state.board;
        let isJump = false;

        // Handle the case where we are jumping a piece
        if (Math.abs(piece.row - cell.row) === 2) {
            const jumpRow = (piece.row + cell.row) / 2;
            const jumpCol = (piece.col + cell.col) / 2;
            board[jumpRow][jumpCol].piece = null;
            isJump = true;
        }

        board[piece.row][piece.col].piece = null;
        piece.row = cell.row;
        piece.col = cell.col;
        if (!piece.isKing && (piece.row === 0 || piece.row === 7)) {
            piece.isKing = true;
        }
        board[cell.row][cell.col].piece = piece;
        this.setState({
            targets: [],
            pieceToMove: null,
            board: board,
            inJumpChain: false
        });

        if (isJump) {
            //Check if another piece can be jumped
            this.getPossibleTargets(piece).forEach(adj => {
                if (adj.hasPiece() && this.canJumpOver(piece, adj.piece)) {
                    this.showMoveTargets(piece);
                    this.setState({
                        inJumpChain: true,
                        pieceToJump: piece
                    });
                    return true;
                }
            });
        }

        return false;
    }

    endTurn() {
        socket.emit('endturn');
        this.setState({
            isMyTurn: false
        });
    }

    /**
     * Returns an array of diagnolly adjacent cells.
     *
     * @param BoardPiece piece
     */
    getPossibleTargets(piece) {
        let adj = [];
        const directions = [
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]
        ];

        directions.forEach(dir => {
            // For non-king pieces: player 1 cannot move down, and player 2 cannot move up
            if (!piece.isKing && ((piece.player === 1 && dir[0] === 1) || (piece.player === 2 && dir[0] === -1))) {
                return;
            }
            const row = piece.row + dir[0];
            const col = piece.col + dir[1];
            if (row >= 0 && col >= 0 && row < 8 && col < 8) {
                adj.push(this.state.board[row][col]);
            }
        });

        return adj;
    }

    render() {
        return (
            <div className='board'>
                {this.state.board.map((row, rowId) => (
                    <div className='row' key={rowId}>
                        {row.map((cell, colId) => (
                            <div
                                className={`cell ${cell.canHavePiece() ? 'moveable' : ''}`}
                                key={colId}
                                onClick={() => this.handleCellClick(cell)}
                            >
                                {cell.hasPiece() && (
                                    <div
                                        className={`piece player${cell.piece.player}`}
                                        onClick={() => this.showMoveTargets(cell.piece, rowId, colId)}
                                    >
                                        {cell.piece.isKing && <Icon icon={chessQueen} className='king' />}
                                    </div>
                                )}
                                {this.state.targets.includes(cell) && <div className='target-marker'></div>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

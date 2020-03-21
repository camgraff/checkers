import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Board.scss";

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        let board = new Array();
        for (let i = 0; i < 8; i++) {
            board.push([]);
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 == 1) {
                    if (i < 4) {
                        board[i].push(2);
                    } else {
                        board[i].push(1);
                    }
                } else {
                    board[i].push(0);
                }
            }
        }

        this.state = {
            board: board
        };
    }

    render() {
        return (
            <div className="board">
                {this.state.board.map((row, rowId) => (
                    <div className="row" key={rowId}>
                        {row.map((col, colId) => (
                            <div className={`cell ${(rowId + colId) % 2 == 1 ? 'moveable' : ''}`} key={colId}>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

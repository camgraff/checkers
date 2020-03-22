export default class BoardPiece {
    constructor(player, row, col, isKing = false) {
        this.player = player;
        this.row = row;
        this.col = col;
        this.isKing = isKing;
    }
}
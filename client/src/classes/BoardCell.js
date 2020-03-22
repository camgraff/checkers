export default class BoardCell {
    constructor(row, col, piece = null) {
        this.row = row;
        this.col = col;
        this.piece = piece;
    }

    canHavePiece() {
        return (this.row + this.col) % 2 == 1;
    }

    hasPiece() {
        return this.piece !== null;
    }
}
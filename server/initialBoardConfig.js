const initialBoard = [
    [
        { row: 0, col: 0, piece: null },
        { row: 0, col: 1, piece: { player: 2, row: 0, col: 1, isKing: false } },
        { row: 0, col: 2, piece: null },
        { row: 0, col: 3, piece: { player: 2, row: 0, col: 3, isKing: false } },
        { row: 0, col: 4, piece: null },
        { row: 0, col: 5, piece: { player: 2, row: 0, col: 5, isKing: false } },
        { row: 0, col: 6, piece: null },
        { row: 0, col: 7, piece: { player: 2, row: 0, col: 7, isKing: false } }
    ],
    [
        { row: 1, col: 0, piece: { player: 2, row: 1, col: 0, isKing: false } },
        { row: 1, col: 1, piece: null },
        { row: 1, col: 2, piece: { player: 2, row: 1, col: 2, isKing: false } },
        { row: 1, col: 3, piece: null },
        { row: 1, col: 4, piece: { player: 2, row: 1, col: 4, isKing: false } },
        { row: 1, col: 5, piece: null },
        { row: 1, col: 6, piece: { player: 2, row: 1, col: 6, isKing: false } },
        { row: 1, col: 7, piece: null }
    ],
    [
        { row: 2, col: 0, piece: null },
        { row: 2, col: 1, piece: { player: 2, row: 2, col: 1, isKing: false } },
        { row: 2, col: 2, piece: null },
        { row: 2, col: 3, piece: { player: 2, row: 2, col: 3, isKing: false } },
        { row: 2, col: 4, piece: null },
        { row: 2, col: 5, piece: { player: 2, row: 2, col: 5, isKing: false } },
        { row: 2, col: 6, piece: null },
        { row: 2, col: 7, piece: { player: 2, row: 2, col: 7, isKing: false } }
    ],
    [
        { row: 3, col: 0, piece: null },
        { row: 3, col: 1, piece: null },
        { row: 3, col: 2, piece: null },
        { row: 3, col: 3, piece: null },
        { row: 3, col: 4, piece: null },
        { row: 3, col: 5, piece: null },
        { row: 3, col: 6, piece: null },
        { row: 3, col: 7, piece: null }
    ],
    [
        { row: 4, col: 0, piece: null },
        { row: 4, col: 1, piece: null },
        { row: 4, col: 2, piece: null },
        { row: 4, col: 3, piece: null },
        { row: 4, col: 4, piece: null },
        { row: 4, col: 5, piece: null },
        { row: 4, col: 6, piece: null },
        { row: 4, col: 7, piece: null }
    ],
    [
        { row: 5, col: 0, piece: { player: 1, row: 5, col: 0, isKing: false } },
        { row: 5, col: 1, piece: null },
        { row: 5, col: 2, piece: { player: 1, row: 5, col: 2, isKing: false } },
        { row: 5, col: 3, piece: null },
        { row: 5, col: 4, piece: { player: 1, row: 5, col: 4, isKing: false } },
        { row: 5, col: 5, piece: null },
        { row: 5, col: 6, piece: { player: 1, row: 5, col: 6, isKing: false } },
        { row: 5, col: 7, piece: null }
    ],
    [
        { row: 6, col: 0, piece: null },
        { row: 6, col: 1, piece: { player: 1, row: 6, col: 1, isKing: false } },
        { row: 6, col: 2, piece: null },
        { row: 6, col: 3, piece: { player: 1, row: 6, col: 3, isKing: false } },
        { row: 6, col: 4, piece: null },
        { row: 6, col: 5, piece: { player: 1, row: 6, col: 5, isKing: false } },
        { row: 6, col: 6, piece: null },
        { row: 6, col: 7, piece: { player: 1, row: 6, col: 7, isKing: false } }
    ],
    [
        { row: 7, col: 0, piece: { player: 1, row: 7, col: 0, isKing: false } },
        { row: 7, col: 1, piece: null },
        { row: 7, col: 2, piece: { player: 1, row: 7, col: 2, isKing: false } },
        { row: 7, col: 3, piece: null },
        { row: 7, col: 4, piece: { player: 1, row: 7, col: 4, isKing: false } },
        { row: 7, col: 5, piece: null },
        { row: 7, col: 6, piece: { player: 1, row: 7, col: 6, isKing: false } },
        { row: 7, col: 7, piece: null }
    ]
];

module.exports = initialBoard;

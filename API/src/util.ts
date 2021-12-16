export const hasInvalidIndex = (newPosition, boardSize): boolean =>
    newPosition.split("").find(char => parseInt(char) >= boardSize);

export const isNewPositionTaken = (blockedPositions, newPosition): boolean =>
    blockedPositions.find(p => p === newPosition);

export const isGameDraw = (blockedPositions, boardSize): boolean =>
    blockedPositions.length === (boardSize * boardSize);

export const hasStraightLineMatch = (boardSize, positions) => {
    let hasWinningPosition = false;
    Array.from(Array(boardSize).keys()).every(idx => {
        if (hasWinningPosition) return false;

        hasWinningPosition = positions.filter(p =>
            // horizontal
            parseInt(p.charAt(0)) === idx).length === boardSize ||
            // vertical
            positions.filter(p =>
                parseInt(p.charAt(1)) === idx).length === boardSize;

        return true;
    })
    return hasWinningPosition;
}

export const hasTopLeftToBottomRightDiagonal = (positions, boardSize) =>
    positions.filter(p => p.charAt(0) === p.charAt(1)).length === boardSize;

export const hasTopRightToBottomLeftDiagonal = (positions, boardSize) =>
    positions.filter(p =>
        (parseInt(p.charAt(0)) + parseInt(p.charAt(1))) === boardSize - 1).length === boardSize;
let sizeOfPieces;

/**
 * Function to check if piece has a maching side piece
 *
 * @param {Element} selectedPiece - selected piece
 * @param {Array<Array<Element>>} piecesMatrix - matrix with all puzzle pieces on their respective position
 * @param {number} ps - piece size
 * @param {number} numRows - number of rows in pieces matrix
 * @param {number} numCols- number of columns in pieces matrix
 * @returns {boolean} - returns true if the piece was connected to other piece
 */
export function checkSidePieces(selectedPiece, piecesMatrix, ps, numRows, numCols ) {
  let threshold = 5;
  sizeOfPieces = ps;

  // CHECK TOP PIECE
  if( selectedPiece.y > 0 ) {
    let pieceOnTop = piecesMatrix[selectedPiece.y-1][selectedPiece.x];
    if( isSameAngle(selectedPiece, pieceOnTop) ) {
      let isTopPieceNear = isOnTop(selectedPiece, pieceOnTop, threshold);
      if( isTopPieceNear && isHierarchyAvailableToConnect(selectedPiece, pieceOnTop) ) {
        console.log('connect with piece in top: ', isTopPieceNear);
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnTop);
        return true;
      }
    }
  }
  // CHECK BOTTOM PIECE
  if(  selectedPiece.y < numRows-1 ) {
    let pieceOnBottom = piecesMatrix[selectedPiece.y+1][selectedPiece.x];
    if( isSameAngle(selectedPiece, pieceOnBottom) ) {
      let isBottomPieceNear = isOnTop(pieceOnBottom, selectedPiece, threshold);
      if( isBottomPieceNear && isHierarchyAvailableToConnect(selectedPiece, pieceOnBottom) ) {
        console.log('connect with piece in bottom: ', isBottomPieceNear);
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnBottom);
        return true;
      }
    }
  }
  // CHECK LEFT PIECE
  if(  selectedPiece.x > 0 ) {
    let pieceOnLeft = piecesMatrix[selectedPiece.y][selectedPiece.x - 1];
    if( isSameAngle(selectedPiece, pieceOnLeft) ) {
      let isLeftPieceNear = isOnRight(pieceOnLeft, selectedPiece, threshold);
      if( isLeftPieceNear && isHierarchyAvailableToConnect(selectedPiece, pieceOnLeft) ) {
        console.log('connect with piece in left: ', isLeftPieceNear);
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnLeft);
        return true;
      }
    }
  }
  // CHECK RIGHT PIECE
  if(  selectedPiece.x < numCols - 1 ) {
    let pieceOnRight = piecesMatrix[selectedPiece.y][selectedPiece.x + 1];
    if( isSameAngle(selectedPiece, pieceOnRight) ) {
      let isRightPieceNear = isOnRight(selectedPiece, pieceOnRight, threshold);
      if( isRightPieceNear && isHierarchyAvailableToConnect(selectedPiece, pieceOnRight) ) {
        console.log('connect with piece in right: ', isRightPieceNear);
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnRight);
        return true;
      }
    }
  }

  return false;

}

/**
 * Check if both pieces have the same rotation
 *
 * @param {Element} piece1 - first puzzle piece to compare
 * @param {Element} piece2 - second puzzle piece to compare
 * @returns {boolean} - value indicating if both pieces have the same rotation
 */
function isSameAngle(piece1, piece2) {
  return piece1.angle === piece2.angle;
}

/**
 * Check if a piece is on top (above) of the other so it can be connected
 *
 * @param bottomPiece - bottom puzzle piece
 * @param topPiece - top puzzle piece
 * @param threshold - threshold at which a piece is considered on top of the other
 * @returns {boolean} - value indicating if the top piece is on top of the bottom piece
 */
function isOnTop(bottomPiece, topPiece, threshold) {
  let bottomPieceCoords = getCoords(bottomPiece);
  let topRect = bottomPieceCoords.top - threshold;
  let bottomRect = bottomPieceCoords.top + threshold;
  let rightRect = bottomPieceCoords.left + parseInt(bottomPiece.clientWidth / 2) + threshold;
  let leftRect = bottomPieceCoords.left + parseInt(bottomPiece.clientWidth / 2) - threshold;
  let pieceOnTopCoords = getCoords(topPiece);
  let pieceOnTopTopRect = pieceOnTopCoords.top + topPiece.clientHeight - threshold;
  let pieceOnTopBottomRect = pieceOnTopCoords.top + topPiece.clientHeight + threshold;
  let pieceOnTopRightRect = pieceOnTopCoords.left + parseInt(topPiece.clientWidth / 2) + threshold;
  let pieceOnTopLeftRect = pieceOnTopCoords.left + parseInt(topPiece.clientWidth / 2) - threshold;

  return rectanglesIntersect(leftRect,topRect,rightRect,bottomRect , pieceOnTopLeftRect,pieceOnTopTopRect,pieceOnTopRightRect,pieceOnTopBottomRect );
}

/**
 * Check if a piece is on the right of the other so it can be connected
 *
 * @param leftPiece - left puzzle piece
 * @param rightPiece - right puzzle piece
 * @param threshold - threshold at which a piece is considered on the right of the other
 * @returns {boolean} - value indicating if the left piece is on the left of the right piece
 */
function isOnRight(leftPiece, rightPiece, threshold) {
  let leftPieceCoords = getCoords(leftPiece);
  let topRect = leftPieceCoords.top + parseInt(leftPiece.clientHeight / 2) - threshold;
  let bottomRect = leftPieceCoords.top + parseInt(leftPiece.clientHeight / 2) + threshold;
  let rightRect = leftPieceCoords.left + leftPiece.clientWidth + threshold;
  let leftRect = leftPieceCoords.left + leftPiece.clientWidth - threshold;
  let rightPieceCoords = getCoords(rightPiece);
  let pieceOnRightTopRect = rightPieceCoords.top + parseInt(rightPiece.clientHeight / 2) - threshold;
  let pieceOnRightBottomRect = rightPieceCoords.top + parseInt(rightPiece.clientHeight / 2) + threshold;
  let pieceOnRightRightRect = rightPieceCoords.left + threshold;
  let pieceOnRightLeftRect = rightPieceCoords.left - threshold;

  return rectanglesIntersect(leftRect,topRect,rightRect,bottomRect , pieceOnRightLeftRect,pieceOnRightTopRect,pieceOnRightRightRect,pieceOnRightBottomRect );
}

/**
 * Function indicating if the positions of two rectangles intersect
 *
 * @param minAx - min x value of first rectangle
 * @param minAy - min y value of first rectangle
 * @param maxAx - max x value of first rectangle
 * @param maxAy - max y value of first rectangle
 * @param minBx - min x value of second rectangle
 * @param minBy - min y value of second rectangle
 * @param maxBx - max x value of second rectangle
 * @param maxBy - max y value of second rectangle
 * @returns {boolean} - boolean indicating if the positions of the two passed rectangles intersect
 */
function rectanglesIntersect(
  minAx, minAy, maxAx, maxAy,
  minBx, minBy, maxBx, maxBy ) {
  return maxAx >= minBx && minAx <= maxBx && minAy <= maxBy && maxAy >= minBy;
}

/**
 * Check if two puzzle pieces have a compatible hierarchy so they could be connected.
 * If one is children, parent or sibling of the other, they cannot be connected.
 *
 * @param pieceToConnectTo - puzzle piece to connect to
 * @param pieceToBeConnected - puzzle piece to be connected
 * @returns {boolean} - value indicating if pieces have a valid hierarchy to connect
 */
function isHierarchyAvailableToConnect(pieceToConnectTo, pieceToBeConnected) {
  if(pieceToConnectTo.contains(pieceToBeConnected) || pieceToBeConnected.contains(pieceToConnectTo)) return false;
  if(pieceToConnectTo.parentElement.className === 'move' && pieceToConnectTo.parentElement === pieceToBeConnected.parentElement) return false;
  return true;
}

/**
 * Function to check for child puzzle pieces and connect them to the other parent, to maintain order
 *
 * @param pieceToConnectTo - puzzle piece to connect to
 * @param pieceToBeConnected - puzzle piece to be connected
 */
function checkHierarchyBeforeConnecting(pieceToConnectTo, pieceToBeConnected) {
  //check if piece to be connected is a parent, in that case the parent piece and all the children have to pass for the piece to connect to
  if([...pieceToBeConnected.childNodes].find(child => child.className === 'move')) {
    console.log('is a parent, children will be moved to piece to connect. Children: ', pieceToBeConnected.childNodes);
    connectChildPieces(pieceToConnectTo, pieceToBeConnected);
    connectPieces(pieceToConnectTo, pieceToBeConnected);
  }
  // check if the piece to be connected has a parent piece, in that case connect the parent and all its children
  else if(pieceToBeConnected.parentElement.className === 'move' ) {
    console.log('is child, connect parent');
    pieceToBeConnected = pieceToBeConnected.parentElement;

    //if destination piece has a parent piece, connect to parent piece instead
    if( pieceToConnectTo.parentElement.className === 'move' ) {
      pieceToConnectTo = pieceToConnectTo.parentElement;
    }

    connectChildPieces(pieceToConnectTo, pieceToBeConnected);
    connectPieces(pieceToConnectTo, pieceToBeConnected);
  }else {
    connectPieces(pieceToConnectTo, pieceToBeConnected);
  }

}

/**
 * Connect child pieces of a given puzzle piece to other puzzle piece
 *
 * @param pieceToConnectTo - puzzle piece to connect to
 * @param pieceToBeConnected - parent of child pieces to connect
 */
function connectChildPieces(pieceToConnectTo, pieceToBeConnected) {
  let childrenToMove = [];
  pieceToBeConnected.childNodes.forEach(function(child){
    if(child.className === 'move') {
      childrenToMove.push(child);
    }
  });

  childrenToMove.forEach(function(child){
    connectPieces(pieceToConnectTo, child);
  });
}

/**
 * Connect two puzzle pieces
 *
 * @param {Element} pieceToConnectTo - puzzle piece to connect to
 * @param {Element} pieceToBeConnected - puzzle piece to be connected
 */
function connectPieces (pieceToConnectTo, pieceToBeConnected){
  /**
   * @type {number} topPosition - new top position of connected piece relative to the new parent
   */
  let topPosition = (pieceToBeConnected.y - pieceToConnectTo.y) * sizeOfPieces;
  /**
   * @type {number} leftPosition - new left position of connected piece relative to the new parent
   */
  let leftPosition = (pieceToBeConnected.x - pieceToConnectTo.x) * sizeOfPieces;

  pieceToBeConnected.parentElement.removeChild(pieceToBeConnected);
  pieceToConnectTo.appendChild(pieceToBeConnected);
  pieceToBeConnected.style.top = topPosition + 'px';
  pieceToBeConnected.style.left = leftPosition + 'px';
}

/**
 * Get absolute coordinates of an element in the document, counting with the scroll
 *
 * @param {Element} elem - element to get the coordinates from
 * @returns {{top: number, left: number}} - coordinates
 */
export function getCoords(elem) { // crossbrowser version
  let box = elem.getBoundingClientRect();

  let body = document.body;
  let docEl = document.documentElement;

  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  let clientTop = docEl.clientTop || body.clientTop || 0;
  let clientLeft = docEl.clientLeft || body.clientLeft || 0;

  let top  = box.top +  scrollTop - clientTop;
  let left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}
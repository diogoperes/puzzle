let sizeOfPieces;

/*
*  Returns true if the piece was connected to other piece
*/
export function checkSidePieces(selectedPiece, piecesMatrix, ps, numRows, numCols ) {

  // console.log(selectedPiece[0]);

  let threshold = 5;
  sizeOfPieces = ps;

  // CHECK TOP PIECE
  if( selectedPiece.y > 0 ) {
    let pieceOnTop = piecesMatrix[selectedPiece.y-1][selectedPiece.x];
    if( isSameAngle(selectedPiece, pieceOnTop) ) {
      let isTopPieceNear = isOnTop(selectedPiece, pieceOnTop, threshold);
      if( isTopPieceNear && isHierarchyAvailableToConnect(selectedPiece, pieceOnTop) ) {
        console.log('connect with piece in top: ', isTopPieceNear);
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnTop, -sizeOfPieces, 0);
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
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnBottom, sizeOfPieces, 0);
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
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnLeft, 0, -sizeOfPieces);
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
        checkHierarchyBeforeConnecting(selectedPiece, pieceOnRight, 0, sizeOfPieces);
        return true;
      }
    }
  }

  return false;

}

function isSameAngle(piece1, piece2) {
  return piece1.angle === piece2.angle;
}

function isOnTop(bottomPiece, topPiece, threshold) {
  // let topRect = bottomPiece.offsetTop - threshold;
  // let bottomRect = bottomPiece.offsetTop + threshold;
  // let rightRect = bottomPiece.offsetLeft + parseInt(bottomPiece.clientWidth / 2) + threshold;
  // let leftRect = bottomPiece.offsetLeft + parseInt(bottomPiece.clientWidth / 2) - threshold;
  //
  // let pieceOnTopTopRect = topPiece.offsetTop + topPiece.clientHeight - threshold;
  // let pieceOnTopBottomRect = topPiece.offsetTop + topPiece.clientHeight + threshold;
  // let pieceOnTopRightRect = topPiece.offsetLeft + parseInt(topPiece.clientWidth / 2) + threshold;
  // let pieceOnTopLeftRect = topPiece.offsetLeft + parseInt(topPiece.clientWidth / 2) - threshold;

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

function isOnRight(leftPiece, rightPiece, threshold) {
  // let topRect = leftPiece.offsetTop + parseInt(leftPiece.clientHeight / 2) - threshold;
  // let bottomRect = leftPiece.offsetTop + parseInt(leftPiece.clientHeight / 2) + threshold;
  // let rightRect = leftPiece.offsetLeft + leftPiece.clientWidth + threshold;
  // let leftRect = leftPiece.offsetLeft + leftPiece.clientWidth - threshold;
  //
  // let pieceOnRightTopRect = rightPiece.offsetTop + parseInt(rightPiece.clientHeight / 2) - threshold;
  // let pieceOnRightBottomRect = rightPiece.offsetTop + parseInt(rightPiece.clientHeight / 2) + threshold;
  // let pieceOnRightRightRect = rightPiece.offsetLeft + threshold;
  // let pieceOnRightLeftRect = rightPiece.offsetLeft - threshold;

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

function rectanglesIntersect(
  minAx, minAy, maxAx, maxAy,
  minBx, minBy, maxBx, maxBy ) {
  return maxAx >= minBx && minAx <= maxBx && minAy <= maxBy && maxAy >= minBy;
}

function isHierarchyAvailableToConnect(pieceToConnectTo, pieceToBeConnected) {
  if(pieceToConnectTo.contains(pieceToBeConnected) || pieceToBeConnected.contains(pieceToConnectTo)) return false;
  if(pieceToConnectTo.parentElement.className === 'move' && pieceToConnectTo.parentElement === pieceToBeConnected.parentElement) return false;
  return true;
}

function checkHierarchyBeforeConnecting(pieceToConnectTo, pieceToBeConnected, topPosition, leftPosition) {
  // topPosition = (pieceToBeConnected.y - selectedPiece.y) * sizeOfPieces;
  // leftPosition = (pieceToBeConnected.x - selectedPiece.x) * sizeOfPieces;

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

function connectChildPieces(pieceToConnectTo, pieceToBeConnected) {
  console.log('children', pieceToBeConnected.children);
  let childrenToMove = [];

  pieceToBeConnected.childNodes.forEach(function(child){
    if(child.className === 'move') {
      childrenToMove.push(child);
      // console.log('connect child', child);
    }
  });

  childrenToMove.forEach(function(child){
    connectPieces(pieceToConnectTo, child);
  });

}

function connectPieces (pieceToConnectTo, pieceToBeConnected){
  // if(pieceToConnectTo.contains(pieceToBeConnected) || pieceToBeConnected.contains(pieceToConnectTo)) return;
  let topPosition = (pieceToBeConnected.y - pieceToConnectTo.y) * sizeOfPieces;
  let leftPosition = (pieceToBeConnected.x - pieceToConnectTo.x) * sizeOfPieces;
  // //check if piece to be connected is a parent, in that case the parent piece and all the children have to pass for the piece to connect to
  // if([...pieceToBeConnected.childNodes].find(child => child.className === 'move')) {
  //   console.log('is a parent, children will be moved to piece to connect');
  //   pieceToBeConnected.childNodes.forEach(function(child){
  //     if(child.className === 'move') {
  //       console.log('pieceToConnectTo', pieceToConnectTo);
  //       console.log('child', child);
  //       console.trace();
  //       connectPieces(pieceToConnectTo, child);
  //     }
  //   });
  //   // connectPieces(pieceToConnectTo, child);
  // }
  //
  // if(pieceToBeConnected.parentElement.className === 'move' ) {
  //   connectPieces(pieceToConnectTo, pieceToBeConnected.parentElement);
  //   return;
  // }

  // if(pieceToConnectTo.parentElement.className === 'move') {
  //   topPosition = (pieceToBeConnected.y - selectedPiece.parentElement.y) * sizeOfPieces;
  //   leftPosition = (pieceToBeConnected.x - selectedPiece.parentElement.x) * sizeOfPieces;
  //   pieceToConnectTo = pieceToConnectTo.parentElement;
  // }


  console.log('pieceToConnectTo', pieceToConnectTo);
  console.log('pieceToBeConnected', pieceToBeConnected);
  console.log('parent element', pieceToBeConnected.parentElement);

  pieceToBeConnected.parentElement.removeChild(pieceToBeConnected);
  pieceToConnectTo.appendChild(pieceToBeConnected);
  pieceToBeConnected.style.top = topPosition + 'px';
  pieceToBeConnected.style.left = leftPosition + 'px';
}

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
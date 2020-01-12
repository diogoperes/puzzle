/**
 * @typedef {Object} Path
 * @property {string} draw - svg path of correspondent side
 * @property {string} inverse - inverse of svg path of draw property
 */

/**
 * @typedef {Object} PieceData
 * @property {string} type - type of puzzle piece (location on puzzle grid)
 * @property {Path} a - top puzzle side data
 * @property {Path} b - right puzzle side data
 * @property {Path} c - bottom puzzle side data
 * @property {Path} d - left puzzle side data
 */

/**
 * Function to generate svg path according to a puzzle piece location
 *
 * @param row - puzzle piece row position index
 * @param col - puzzle piece column position index
 * @param index - index of puzzle piece on the matrix
 * @param numRows - number of rows in the puzzle matrix
 * @param numCols - number of columns in a puzzle row
 * @param {Array<Element>} director - list of pieces and their data, similar to the matrix but with a level only
 *
 * @returns {PieceData} - return each side of puzzle piece path
 */
export function pieceData(row,col,index, numRows, numCols, director){
  let object ={};
  switch (true) {
    case (col === 0 && row === 0) :
      object={
        type:"supEsquerra",
        a:{draw:" l 100,0 "},
        b:createRightFace(index),
        c:createBottomFace(index),
        d:{draw:" l 0,-100"},
      };
      break;
    case (row === 0 && col === numCols-1) :
      object={
        type:"supDreta",
        a:{draw:" l 100,0 "},
        b:{draw:" l 0,100 "},
        c:createBottomFace(index),
        d:getInverseRightFace(index, director),
      };
      break;
    case (row == numRows-1 && col == 0) :
      object={
        type:"infEsquerra",
        a:getInverseBottomFace(index, director, numCols),
        b:createRightFace(index),
        c:{draw:" l -100,0 "},
        d:{draw:" l 0,-100 "},
      };
      break;
    case (row === numRows-1 && col === numCols-1) :
      object={
        type:"infDreta",
        a:getInverseBottomFace(index, director, numCols),
        b:{draw:" l 0,100 "},
        c:{draw:" l -100,0 "},
        d:getInverseRightFace(index, director),
      };
      break;
    case (row === 0 ) :
      object={
        type:"superior",
        a:{draw:" l 100,0 "},
        b:createRightFace(index),
        c:createBottomFace(index),
        d:getInverseRightFace(index, director),
      };
      break;
    case (col === 0 ) :
      object={
        type:"esquerra",
        a:getInverseBottomFace(index, director, numCols),
        b:createRightFace(index),
        c:createBottomFace(index),
        d:{draw:" l 0,-100 "},
      };
      break;
    case (col === numCols-1 ) :
      object={
        type:"dreta",
        a:getInverseBottomFace(index, director, numCols),
        b:{draw:" l 0,100 "},
        c:createBottomFace(index),
        d:getInverseRightFace(index, director),
      };
      break;
    case (row === numRows-1 ) :
      object={
        type:"inferior",
        a:getInverseBottomFace(index, director, numCols),
        b:createRightFace(index),
        c:{draw:" l -100,0 "},
        d:getInverseRightFace(index, director),
      };
      break;
    default:
      object={
        type:"central",
        a:getInverseBottomFace(index, director, numCols),
        b:createRightFace(index),
        c:createBottomFace(index),
        d:getInverseRightFace(index, director),
      };
  }
  object.col=col;
  object.row=row;
  object.index=index;
  object.path=function(){return this.a.draw+this.b.draw+this.c.draw+this.d.draw+"z";};
  return object;

}


/**
 * Create right part of piece and inverse
 *
 * @param {number} i - index of puzzle piece
 * @returns {{draw: {string}, inverse: {string}}} - Return a random draw path
 */
function createRightFace(i){
  // return {draw:" l -10,50 l 10,50 ",inverse:" l  -10,-50 l 10,-50 "}

  // return {draw:"l 0, 43 l-5,0 a11,11 1,1,0 0,14 l5,0 l 0, 43",
  //   inverse:"l 0, -43 l-5,0 a11,11 1,1,1 0,-14 l5,0 l 0, -43"};

  let path = [

    {draw:"q -4,20 -5,43 a11,15 1,1,0 0,14 q1,20 5,43",
      inverse:"q -4,-20  -5,-43 a11,15 1,1,1 0,-14 q 1-20 5,-43"},
    {draw:"q -4,20 -5,43 a11,15 1,1,1 0,14 q1,20 5,43",
      inverse:"q -4,-20 -5,-43 a11,15 1,1,0 0,-14 q 1-20 5,-43"},
    {draw:"q 4,20 5,43 a11,15 1,1,0 0,14 q -1,20 -5,43",
      inverse:"q 4,-20  5,-43 a11,15 1,1,1 0,-14 q -1-20 -5,-43"},
    {draw:"q 4,20 5,43 a11,15 1,1,1 0,14 q -1,20 -5,43",
     inverse:"q 4,-20 5,-43 a11,15 1,1,0 0,-14 q -1-20 -5,-43"},

    // {draw: "q 15,50 0,100",
    // inverse: "q 15,-50  0,-100"},
    // {draw: "q -15,50 0,100",
    //   inverse: "q -15,-50  0,-100"}
  ];


  // let path =[
  //   {draw:"q -4,20 -5,43 l-5,0 a11,11 1,1,0 0,14 l5,0 q1,20 5,43",
  //     inverse:"q -4,-20  -5,-43 l-5,0 a11,11 1,1,1 0,-14 l5,0 q 1-20 5,-43"},
  //   {draw:"q -4,20 -5,43 l5,0 a11,11 1,1,1 0,14 l-5,0 q1,20 5,43",
  //     inverse:"q -4,-20 -5,-43 l 5,0 a11,11 1,1,0 0,-14 l-5,0 q 1-20 5,-43"},
  //   {draw:"q 4,20 5,43 l-5,0 a11,11 1,1,0 0,14 l5,0 q -1,20 -5,43",
  //     inverse:"q 4,-20  5,-43 l-5,0 a11,11 1,1,1 0,-14 l5,0 q -1-20 -5,-43"},
  //   {draw:"q 4,20 5,43 l5,0 a11,11 1,1,1 0,14 l-5,0	q -1,20 -5,43",
  //     inverse:"q 4,-20  5,-43 l5,0 a11,11 1,1,0 0,-14 l-5,0 q -1-20 -5,-43"},
  // ];

  return path[Math.floor(Math.random()*path.length)];

}

/**
 * Create bottom part of piece and inverse
 *
 * @param {number} i - index of puzzle piece
 * @returns {{draw: {string}, inverse: {string}}} - Return a random draw path
 */
function createBottomFace(i){
  // return {draw:" l -50,10 l -50,-10 ",inverse:" l  50,10 l 50,-10 "}

  //straight faces
  // return {draw:"l -43, 0 l0,-5 a11,11 1,1,0 -14,0 l0,5 l -43,0",
  //   inverse:"l 43, 0 l0,-5 a11,11 1,1,1 14,0 l0,5 l 43,0 "};

  let path = [

    {draw:"q -20,-4 -43,-5 a15,11 1,1,0 -14,0 q-20,1 -43,5",
      inverse:"q 20,-4 43,-5 a15,11 1,1,1 14,0 q20,1 43,5 "},
    {draw:"q -20,-4 -43,-5 a15,11 1,1,1 -14,0 q-20,1 -43,5",
      inverse:"q 20,-4 43,-5 a15,11 1,1,0 14,0 q20,1 43,5 "},
    {draw:"q -20,4 -43,5 a15,11 1,1,0 -14,0 q-20,-1 -43,-5",
      inverse:"q 20,4 43,5 a15,11 1,1,1 14,0 q20,-1 43,-5 "},
    {draw:"q -20,4 -43,5 a15,11 1,1,1 -14,0 q-20,-1 -43,-5",
      inverse:"q 20,4 43,5 a15,11 1,1,0 14,0 q20,-1 43,-5 "},


    // {draw: "q -50,15 -100,0",
    // inverse: "q 50,15 100,0"},
    // {draw: "q -50,-15 -100,0",
    // inverse: "q 50,-15 100,0"}
  ];

  // let path =[
  //   {draw:"q -20,-4 -43,-5 l0,-5 a11,11 1,1,0 -14,0 l0,5 q-20,1 -43,5",
  //     inverse:"q 20,-4 43,-5 l0,-5 a11,11 1,1,1 14,0 l0,5 q20,1 43,5 "},
  //   {draw:"q -20,-4 -43,-5 l0,5 a11,11 1,1,1 -14,0 l0,-5 q-20,1 -43,5",
  //     inverse:"q 20,-4 43,-5 l0,5 a11,11 1,1,0 14,0 l0,-5 q20,1 43,5 "},
  //   {draw:"q -20,4 -43,5 l0,-5 a11,11 1,1,0 -14,0 l0,5 q-20,-1 -43,-5",
  //     inverse:"q 20,4 43,5 l0,-5 a11,11 1,1,1 14,0 l0,5 q20,-1 43,-5 "},
  //   {draw:"q -20,4 -43,5 l0,5 a11,11 1,1,1 -14,0 l0,-5 q-20,-1 -43,-5",
  //     inverse:"q 20,4 43,5 l0,5 a11,11 1,1,0 14,0 l0,-5 q20,-1 43,-5 "},
  // ];

  return path[Math.floor(Math.random()*path.length)];
}


/**
 * Get the inverse of left piece's right face to be the left face of current piece
 *
 * @param {number} i - index of puzzle piece to get left face
 * @param {Array<PieceData>} director - list of pieces and their data, similar to the matrix but with a level only
 * @returns {{draw: string}} - path for the left face puzzle piece passed
 */
function getInverseRightFace(i, director){
  return {draw:director[i-1].b.inverse};
}

/**
 * Get the inverse of top piece's bottom face to be the top face of current piece
 *
 * @param {number} i - index of puzzle piece to get top face
 * @param {Array<PieceData>} director - list of pieces and their data, similar to the matrix but with a level only
 * @returns {{draw: string}} - path for the top face puzzle piece passed
 */
function getInverseBottomFace(i, director, numCols){
  return {draw:director[i-numCols].c.inverse};
}
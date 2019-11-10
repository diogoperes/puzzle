import '../styles/index.scss';
// import $ from 'jquery';
import {pieceData} from './puzzlePieceHelper.js';
import {checkSidePieces, getCoords} from './piecePlacementHelper.js';

// console.log('webpack starterkit');

const numberOfImagesToLoad = 32;
let zIndex=1;
// var host='http://www.wdisseny.com/puzzle/';
let host='http://picsum.photos';
let model;

let numRows = 3;
let numCols = 3;
let idOfImageSelected;

let director; //List with pieces and its data
let offset;
let piecesPlacedCorrectly;
let timeInitial;
let timeEnd;

//double click variables
let clickCount = 0;
let singleClickTimer;

let sizeOfPieces = 100;
let maxSizeOfPieces = 100;

let selectedPiece= false;
let realSelectedPiece = false;

let puzzleImagesList = {};
let imagesLoaded = 0;

let piecesMatrix = [];
let positionsList = [];

const seeImage_btn = document.getElementById("seeImage");

function createPiece(piecePath,x,y,index){

  piecePath = "M40,40 " + piecePath;

  let canvas = document.createElement('canvas');
  canvas.width = 180;
  canvas.height = 180;
  let ctx = canvas.getContext("2d");
  let mask = new Path2D(piecePath);
  ctx.save();
  ctx.clip(mask);
  // let imgSrc = `${host}/${model.width}/${model.height}`;
  // let imgSrc = model.imageUrl;

  // console.log('numCols', numCols);
  // console.log('numRows', numRows);
  // console.log('sizeOfPieces', sizeOfPieces);

  let imgSrc = `${host}/id/${idOfImageSelected}/${numCols*100}/${numRows*100}`;

  // console.log('imgSrc', imgSrc);

  let base_image = new Image();
  // check if //domain.com or http://domain.com is a different origin
  if (/^([\w]+\:)?\/\//.test(imgSrc) && imgSrc.indexOf(location.host) === -1) {
    base_image.crossOrigin = "anonymous"; // or "use-credentials"
  }
  base_image.src = imgSrc;
  base_image.onload = function(){
    ctx.drawImage(base_image, x*-100+40, y*-100+40);

    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 2;
    // ctx.stroke(mask);

    // get png data url
    let pngUrl = canvas.toDataURL();

    let image = new Image();
    image.src = pngUrl;
    image.className = "puzzle-piece-image";
    image.style.width = sizeOfPieces * 180 /  + "px";
    image.style.height = sizeOfPieces * 180 / 100 + "px";

    puzzleImagesList[x+'-'+y]  = {image: image, path: piecePath};
    imagesLoaded++;

    if(imagesLoaded === numRows * numCols ) {
      placePuzzleImagesInPlace();
    }

    // console.log(image);

    // document.body.appendChild(image);


  };

}

function placePuzzleImagesInPlace() {
  window.puzzleImagesList = puzzleImagesList;

  piecesMatrix = [];
  positionsList = [];

  let index = 0;
  for (let row=0; row<numRows; row++){
    let rowList = [];
    for (let col=0; col<numCols; col++){

      let image = puzzleImagesList[col+'-'+row].image;
      let move = document.createElement("DIV");

      move.innerHTML = `<svg viewbox="0 0 180 180" width="${sizeOfPieces * 180 / 100}" height="${sizeOfPieces * 180 / 100}"> 
        <path d="${puzzleImagesList[col+'-'+row].path}"></path>
      </svg>`;

      move.appendChild(image);

      move.className="move";
      move.style.width = sizeOfPieces + "px";
      move.style.height = sizeOfPieces + "px";
      // move.path=path;
      // move.onmousemove=getPos;
      move.onmousedown=getPos;
      move.onclick=onDblClick;
      move.ontouchstart=getPos;
      move.onmouseout=stopTracking;  move.touchcancel=stopTracking;
      //move.setAttribute("classangle","g0")
      move.angle=0;
      move.occupy= false;
      move.position=function(){return {left:this.offsetLeft+(sizeOfPieces/2),top:this.offsetTop +(sizeOfPieces/2)};};
      move.onmouseup=dropPiece;
      move.ontouchend=dropPiece;
      move.index=index;
      //position indicates the position on the board
      let position = document.createElement("DIV");
      position.className="position";
      position.style.width = sizeOfPieces + "px";
      position.style.height = sizeOfPieces + "px";
      position.index=index;
      position.occupied=false;
      document.querySelector("#container").appendChild(position);
      position.appendChild(move);
      positionsList.push(position);

      move.style.zIndex = zIndex++;
      move.zIndexPrevi=move.style.zIndex;
      move.x = col;
      move.y = row;

      rowList.push(move);
      // let xmlns = "http://www.w3.org/2000/svg";
      // let svg = document.createElementNS(xmlns, "svg");
      // let path = document.createElementNS(xmlns, 'path');
      // svg.setAttribute('viewbox', '0 0 180 180');
      // svg.setAttribute('width', sizeOfPieces * 180 / 100);
      // svg.setAttribute('height', sizeOfPieces * 180 / 100);
      // // svg.setAttribute('x', '0');
      // // svg.setAttribute('y', '0');
      // svg.setAttribute('preserveAspectRatio', 'none');
      // path.setAttribute('d', puzzleImagesList[col+'-'+row].path);
      // // svg.appendChild(path);
      // svg.innerHTML = `<path d="${puzzleImagesList[col+'-'+row].path}"></path>`;
      //
      // move.innerHTML = `<svg viewbox="0 0 180 180" width="${sizeOfPieces * 180 / 100}" height="${sizeOfPieces * 180 / 100}">
      //   <path d="${puzzleImagesList[col+'-'+row].path}"></path>
      // </svg>`;
      // move.appendChild(svg);

      index++;
    }
    piecesMatrix.push(rowList);
  }


}



// var i, element;
// var models=[
//
//   // {
//   //   numRows : 4,
//   //   numCols : 6,
//   //   urlImg :"4x6.jpg"
//   // },
//   {
//     numRows : 2,
//     numCols : 2,
//     // urlImg :"2x2.jpg",
//     // width: 200,
//     // height: 200,
//   },
//   {
//     numRows : 3,
//     numCols : 3,
//     // urlImg :"3x3.png",
//     // width: 300,
//     // height: 300,
//   },
//   {
//     numRows : 4,
//     numCols : 4,
//     // urlImg :"4x4.jpg",
//     // width: 400,
//     // height: 400,
//   },
//
//   {
//     numRows : 5,
//     numCols : 5,
//     // urlImg :"5x5.png",
//     // width: 500,
//     // height: 500,
//   },
//   {
//     numRows : 5,
//     numCols : 7,
//     // urlImg :"7x5.jpg",
//     // width: 700,
//     // height: 500,
//   },
//   {
//     numRows : 6,
//     numCols : 8,
//     // urlImg :"8x6.jpg",
//     // width: 800,
//     // height: 600,
//   },
//
// ];

function selectModel(i){
  // document.getElementById("models").style.height=0;
  document.querySelector("#start").style.height="";
  seeImage_btn.style.height="0";
  document.getElementById("arrangePieces").style.height="0";

  document.querySelector("#menu").classList.remove('active');
  document.querySelector("#menuButton").classList.remove('active');

  // model=models[i];

  idOfImageSelected = i;

  createPuzzle();
  // document.querySelector("#start").style.height="";
  // document.querySelector("#modelsButton").style.height="";
  // document.querySelector("#tap").style.opacity=0;
  // document.querySelector("#tap").style.display='none';
}

function createListModels(){
  // const response = fetch(`https://picsum.photos/v2/list?page=${getRandomImageId(10)}&limit=100`);
  // console.log('response', response)
  // const json = JSON.parse(response);

  return fetch(`https://picsum.photos/v2/list?page=${getRandomImageId(10)}&limit=100`)
    .then(response => response.json())
    .then( data => {

      // var HTMLmodels="<h2>Select model</h2>";
      // let HTMLmodels = document.createElement('h2');
      // HTMLmodels.innerHTML = "Select model";
      // document.getElementById("models").appendChild(HTMLmodels);

      let indexOfImageToLoad = getRandomInt(0., data.length - numberOfImagesToLoad);

      for (let i=0; i < numberOfImagesToLoad; i++) {
        // let e = models[i];
        // e.width = e.numCols* 100;
        // e.height = e.numRows * 100;
        // e.imageUrl = `${host}/id/${data[getRandomImageId(data.length)].id}/${e.width}/${e.height}`;
        // let id = data[getRandomImageId(data.length)].id;
        let id = data[indexOfImageToLoad].id;
        indexOfImageToLoad++;
        if(i === 0) idOfImageSelected = id;

        let img = new Image();
        img.src = `${host}/id/${id}/200/200`;
        img.alt = "imageNumber" + i;

        img.addEventListener("click", () => selectModel(id));
        document.getElementById("models").appendChild(img);

        //   let div = document.createElement('div');
        //   div.innerHTML = `
        //   <b>${(i+1)}</b><br>
        //   ${e.numCols * e.numRows} pieces<br>
        //   <img height="${(e.numRows/3*100)}" src="${e.imageUrl}" width="${e.numcols/3*100}"><br>
        //   <small>${e.numCols*100} x ${e.numRows*100}</small>
        // `;
        //   div.addEventListener("click", () => selectModel(i));
        //   document.getElementById("models").appendChild(div);

      }

      createPuzzle();

    });



}

function getRandomImageId(max = 10) {
  return Math.round(Math.random() * max);
}

function createPuzzle(){
  // imageSrc = `${host}/id/${getRandomImageId()}/${model.width}/${model.height}`;

  piecesPlacedCorrectly=0;
  // document.getElementById("container").innerHTML="";
  let child = document.getElementById("container").getElementsByClassName("position")[0];
  while (child) {
    document.getElementById("container").removeChild(child);
    child = document.getElementById("container").getElementsByClassName("position")[0];
  }

  let piecesOnBody = document.getElementsByTagName("body")[0].getElementsByClassName("move")[0];
  while (piecesOnBody) {
    document.getElementsByTagName("body")[0].removeChild(piecesOnBody);
    piecesOnBody = document.getElementsByTagName("body")[0].getElementsByClassName("move")[0];
  }

  director=[];
  let index=0;
  selectedPiece= false;
  realSelectedPiece= false;
  // numRows=model.numRows;
  // numCols=model.numCols;

  sizeOfPieces = maxSizeOfPieces;
  //adjust piece size to not overflow screen width
  if(window.innerWidth < numCols * sizeOfPieces + sizeOfPieces) {
    sizeOfPieces = Math.floor( window.innerWidth / numCols - 1 );
  }
  //adjust piece size so puzzle height don't overpass 2.2 of screen height
  if(window.innerHeight / 2.2 < numRows * sizeOfPieces) {
    sizeOfPieces = Math.floor( (window.innerHeight / 2.2) / numRows );
  }

  if(sizeOfPieces < 40) {
    sizeOfPieces = 40;
    alert('Sorry :/ Your device is too small for this puzzle');
  }

  document.getElementById("container").style.width=numCols*sizeOfPieces +"px";
  document.getElementById("container").style.height=numRows*sizeOfPieces +"px";
  document.getElementById("container").classList.remove('puzzleFinished');
  // document.getElementById("container").style.backgroundPositionY=sizeOfPieces*model.numRows+"px";
  // console.log(model.imageUrl);
  let backgroundUrl = `${host}/id/${idOfImageSelected}/${numCols*sizeOfPieces}/${numRows*sizeOfPieces}`;
  document.getElementById("backgroundImage").style.backgroundImage = `url(${backgroundUrl})`;

  puzzleImagesList = {};
  imagesLoaded = 0;
  for (let row=0; row<numRows; row++){
    for (let col=0; col<numCols; col++){
      let data = pieceData(row,col,index, numRows, numCols, director);
      director.push(data);
      createPiece(data.path(),col,row,index);
      index++;
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // model=models[1];

  // let image = new Image();
  // image.src = `${host}/${model.width}/${model.height}`;
  // image.id = "puzzleImage";
  // document.body.appendChild(image);

  createListModels();


  // document.getElementById("seeModel").onmouseover=function(){
  //   document.getElementById("container").style.backgroundImage="url("+model.imageUrl+")";
  //   document.getElementById("container").style.opacity="0.5";
  //   document.getElementById("container").style.opacity="0.5";
  // };
  // document.getElementById( "seeModel").onmouseout=function(){
  //   document.getElementById("container").style.backgroundPositionY=100*model.numRows+"px";
  // };

  document.getElementById("start").onclick= start;
  document.getElementById("arrangePieces").onclick = arrangePieces;
  document.getElementById("arrangePieces").style.height="0";
  // document.getElementById("modelsButton").onclick = showModels;
  seeImage_btn.onclick = seeImage;
  seeImage_btn.style.height="0";
  let buttonFullScreen=document.getElementById("fullscreen");
  // buttonFullScreen.fullScreen=false;
  buttonFullScreen.onclick=function(){
    let isFullscreen = !!document.fullscreen;
    let buttonFullScreen=document.getElementById("fullscreen");
    if ( isFullscreen ){
      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }else{
        document.exitFullscreen();
      }
      buttonFullScreen.className="fullscreen";
    }else{
      if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      }else{
        document.body.requestFullscreen();
      }
      buttonFullScreen.className="fullscreenOff";
    }
  };

  let radios = document.getElementsByName('radioDifficulty');
  for(let i = 0, max = radios.length; i < max; i++) {
    radios[i].addEventListener( 'click', (e) => {
      numRows = e.currentTarget.getAttribute("rows");
      numCols = e.currentTarget.getAttribute("cols");
    });
  }

});

document.addEventListener("fullscreenchange", function(){
    let isFullscreen = !!document.fullscreen;
    let buttonFullScreen=document.getElementById("fullscreen");
    if ( isFullscreen ){
      buttonFullScreen.className="fullscreenOff";
    }else{
      buttonFullScreen.className="fullscreen";
    }
  }, false);

function scrollBodyTop(){return document.body.scrollTop|| document.documentElement.scrollTop;}
function final(){
  // document.querySelectorAll(".move").forEach(function(e,i){
  //   e.path.style.strokeWidth="1px";
  //   e.path.style.stroke="black";
  // });
  document.getElementById("container").classList.add('puzzleFinished');
  // document.querySelector("#modelsButton").style.height="";
  // document.querySelector("#tap").style.height="";
  // document.querySelector("#tap").style.opacity=0;
  // document.querySelector("#seeModel").style.top="-35px";
  // document.getElementById("models").style.height=0;
  document.getElementById("time").innerHTML=timeEnd;
  document.getElementById("time").style.opacity = "1";

  seeImage_btn.style.height="0";
  document.getElementById("arrangePieces").style.height="0";
  document.getElementById("backgroundImage").classList.remove('checked');
  seeImage_btn.classList.remove('checked');

}
// function showModels(){
//   document.getElementById("models").style.height="calc(100vh - 100px)";
//   document.getElementById("time").innerHTML="";
//   document.querySelector("#modelsButton").style.height=0;
//   // document.querySelector("#tap").style.height="";
//   document.querySelector("#tap").style.display="unset";
//   // document.querySelector("#tap").style.opacity=1;
// }
function start(){
  document.querySelector("#start").style.height=0;
  document.getElementById("arrangePieces").style.height="";
  seeImage_btn.style.height="";
  // document.querySelector("#modelsButton").style.height=0;
  // document.querySelector("#seeModel").style.top="10px";
  // document.querySelector("#tap").style.height=0;
  // document.querySelector("#tap").style.opacity=0;
  // document.querySelector("#tap").style.display="none";
  // document.querySelector("#modelsButton").style.height=0;

  document.querySelectorAll(".move").forEach(function(e,i){

    let positionToSpawn = getPositionToSpawn();
    e.style.top = positionToSpawn.top;
    e.style.left = positionToSpawn.left;

    e.parentNode.removeChild(e);
    document.body.appendChild(e);
    // e.style.top= 80+ Math.random()*400 +"px";
    // e.style.top = getRandomInt(minHeightSpawnBottom, maxHeightSpawnBottom) + "px";

    // e.style.left=Math.random()*(window.innerWidth -100) +"px";


    setTimeout(function(){
      let angle=Math.floor(Math.random()*4);

      // let angle=0;

      // e.setAttribute("classangle","g"+angle);
      e.rotation=angle*90;
      e.angle=angle;
      e.style.transform="rotate("+e.rotation+"deg)";
    },10);

  });
  timeInitial = (new Date).getTime();
  document.getElementById("time").innerHTML="";
}

function arrangePieces() {
  document.querySelectorAll("body > .move").forEach(function(e,i){
    let positionToSpawn = getPositionToSpawn();
    e.classList.add("animate");

    if(e.timeout !== undefined) clearTimeout(e.timeout);
    e.timeout = setTimeout(() => {
      e.classList.remove("animate");
      e.timeout = undefined;
    }, 500);

    e.style.top = positionToSpawn.top;
    e.style.left = positionToSpawn.left;
  });
}

function getPositionToSpawn() {
  let minHeightSpawnBottom = document.getElementById('container').getBoundingClientRect().y + document.getElementById('container').getBoundingClientRect().height;
  let maxHeightSpawnBottom = document.body.clientHeight - sizeOfPieces;

  let minSpawnLeft = 0;
  let maxSpawnLeft = document.getElementById('container').getBoundingClientRect().x - sizeOfPieces;

  let minSpawnRight = document.getElementById('container').getBoundingClientRect().x + document.getElementById('container').getBoundingClientRect().width;
  let maxSpawnRight = window.innerWidth - sizeOfPieces ;

  let sideOfSpawn = getRandomInt(0, 2);
  //spawn bottom
  if (sideOfSpawn === 1 || document.getElementById('container').getBoundingClientRect().x < sizeOfPieces) {
    return {top: getRandomInt(minHeightSpawnBottom, maxHeightSpawnBottom) + "px",
      left: getRandomInt(0, window.innerWidth - sizeOfPieces) + "px"};
  }else if (sideOfSpawn === 0) { //spawn right
    return {top: getRandomInt(80, window.innerHeight - sizeOfPieces) + "px",
      left: getRandomInt(minSpawnLeft, maxSpawnLeft) + "px"};
  } else if (sideOfSpawn === 2) { //spawn left
    return {top: getRandomInt(80, window.innerHeight - sizeOfPieces) + "px",
      left: getRandomInt(minSpawnRight, maxSpawnRight) + "px"};
  }
}

function turn(){

  this.angle++;
  if( this.angle >= 4 ) this.angle = 0;
  this.rotation += 90;

  this.style.transform="rotate("+this.rotation+"deg)";

  // this.setAttribute("classangle","g"+this.angle%4);
  if ((this.occupy===this.index) && this.angle%4 ===0)fixPiece(this);


}

function fixPiece(p){
  let correspondentPositionOnContainer = positionsList[p.index];
  let offsetLeft = correspondentPositionOnContainer.offsetLeft + document.getElementById("container").offsetLeft;
  let offsetTop = correspondentPositionOnContainer.offsetTop + document.getElementById("container").offsetTop;
  p.style.top=offsetTop+"px";
  p.style.left=offsetLeft+"px";
  correspondentPositionOnContainer.occupied= true;
  p.occupy = p.index;

  p.parentElement.removeChild(p);
  correspondentPositionOnContainer.appendChild(p);
  p.onmousedown="";
  p.onclick="";
  p.onmouseover="";
  p.onmouseout="";
  p.onmousemove="";
  p.ondblclick="";
  p.onmouseup="";
  p.style.cursor="default";
  p.style.position="static";
  // setTimeout(function(){p.removeAttribute("classangle");},300);


  p.style.transition=".1s";
  // p.path.style.strokeWidth=".5px";
  setTimeout(function(){p.style.transform="scale(1.05)";},50);
  setTimeout(function(){p.style.transform="scale(1)";},150);
  // setTimeout(function(){p.path.style.strokeWidth="2px"; p.style.zIndex= 0;},250);
  // setTimeout(function(){p.style.filter = "drop-shadow(black 0px 0px 0)"; p.style.zIndex= 0;},250);
  piecesPlacedCorrectly++;
  if (piecesPlacedCorrectly === numRows * numCols ){
    timeEnd = Math.floor(((new Date).getTime()-timeInitial)/1000);
    let hours = Math.floor(timeEnd/3600);
    let minutes =  Math.floor((timeEnd - hours * 3600)/60);
    minutes= minutes<10 ? "0"+minutes : minutes;
    let seconds = timeEnd - hours * 3600 - minutes *60;
    seconds= seconds<10 ? "0"+seconds : seconds;
    timeEnd ="Time spent: " +
      +((hours>0) ? hours +":" :"")+
      + minutes +":" + seconds;
    document.getElementById("time").style.opacity=0;
    setTimeout(final,500);
  }
}


/*
*  Check if piece can be placed in correct position
*/
function placePiece(p){
  if(p.style) {
    p.style.zIndex = zIndex++;
    p.zIndexPrevi = p.style.zIndex;

    let correspondentPositionOnContainer = positionsList[p.index];
    let offsetLeft = correspondentPositionOnContainer.offsetLeft + document.getElementById("container").offsetLeft;
    let offsetTop = correspondentPositionOnContainer.offsetTop + document.getElementById("container").offsetTop;
    if ( ( p.position().left>offsetLeft && p.position().left<offsetLeft+sizeOfPieces ) &&
        ( p.position().top>offsetTop && p.position().top<offsetTop+sizeOfPieces ) &&
        !correspondentPositionOnContainer.occupied &&
          correspondentPositionOnContainer.index === p.index && p.angle%4 === 0){
        fixPiece(p);
        if ( [...p.childNodes].find(child => child.className === 'move') ) {
          let childrenToMove = [];
          for (let i = 0; i <  p.childNodes.length ; i++) {
            if( p.childNodes[i].className === 'move' ) {
              childrenToMove.push(p.childNodes[i]);
            }
          }
          childrenToMove.forEach(function(child){
            fixPiece(child);
          });
        }
        return true;
      }

    // let positionsInContainer = document.querySelectorAll(".position");
    // for (let i = 0; i < positionsInContainer.length; i++) {
    //   let position = positionsInContainer[i];
    //   let offsetLeft = position.offsetLeft + document.getElementById("container").offsetLeft;
    //   let offsetTop = position.offsetTop + document.getElementById("container").offsetTop;
    //   if ( ( p.position().left>offsetLeft && p.position().left<offsetLeft+sizeOfPieces ) &&
    //     ( p.position().top>offsetTop && p.position().top<offsetTop+sizeOfPieces ) &&
    //     !position.occupied &&
    //     position.index === p.index && p.angle%4 === 0){
    //     // if (position.index === p.index && p.angle%4 === 0) {
    //     fixPiece(p, position, offsetTop, offsetLeft);
    //     if ( [...p.childNodes].find(child => child.className === 'move') ) {
    //       for (let i = 0; i <  p.childNodes.length ; i++) {
    //         if( p.childNodes[i].className === 'move' ) {
    //           fixPiece(p, position, offsetTop, offsetLeft);
    //         }
    //       }
    //     }
    //     return true;
    //     // }
    //   }
    // }

    // document.querySelectorAll(".position").forEach (function(e,i){
    //
    // });
    return false;
  }
}
function dropPiece(){
  let pieceToPlace = selectedPiece;
  if( pieceToPlace && pieceToPlace.parentElement.className === 'move' ) pieceToPlace = pieceToPlace.parentElement;
  let didItPlace = placePiece(pieceToPlace);

  console.log('did it placed', didItPlace);

  if( !didItPlace ) {
    // check if the piece can be connected
    let hasConnected = checkSidePieces(selectedPiece, piecesMatrix, sizeOfPieces, numRows, numCols );
    // if not, check its children
    if(!hasConnected) {
      let pieceToCheckChildren;
      if( selectedPiece && selectedPiece.parentElement.className === 'move' ) {
        pieceToCheckChildren = selectedPiece.parentElement;
      } else if( selectedPiece && [...selectedPiece.childNodes].find(child => child.className === 'move') ) {
        pieceToCheckChildren = selectedPiece;
      }
      if( pieceToCheckChildren ) {
        for (let i = 0; i <  pieceToCheckChildren.childNodes.length ; i++) {
          if( pieceToCheckChildren.childNodes[i].className === 'move' ) {
            hasConnected = checkSidePieces(pieceToCheckChildren.childNodes[i], piecesMatrix, sizeOfPieces, numRows, numCols );
            if(hasConnected) break;
          }
        }
      }
    }
  }

  selectedPiece=false;

}

document.addEventListener('mousemove', drag, {passive: false});
document.addEventListener("touchmove", drag, {passive: false});

function drag(e) {
  // clickCount=0;
  // event.preventDefault();
  if (e.type === 'touchmove' ) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  let pieceToDrag = selectedPiece;
  if(selectedPiece && selectedPiece.parentElement.className === 'move') {
    pieceToDrag = pieceToDrag.parentElement;
    // offset = [
    //   getCoords(pieceToDrag).left - e.clientX,
    //   getCoords(pieceToDrag).top  - e.clientY
    // ];
  }

  if (pieceToDrag) {
    let mousePosition = {

      x : e.clientX,
      y : e.clientY

    };
    pieceToDrag.style.left = (mousePosition.x + offset[0]) + 'px';
    pieceToDrag.style.top  = (mousePosition.y + offset[1]) + 'px';

    e.preventDefault();
    e.stopPropagation();
  }


}

function takePiece(e){

  // console.log('take piece')

  if(e.target.parentElement.className === 'position') {
    return;
  }

  selectedPiece=this;
  offset = [
    this.offsetLeft - e.clientX,
    this.offsetTop - e.clientY
  ];

  if(e.target.parentElement.className === 'move') {
    // realSelectedPiece = selectedPiece;
    // selectedPiece = e.target.parentElement;
    // offset = [
    //   selectedPiece.offsetLeft - e.clientX,
    //   selectedPiece.offsetTop  - e.clientY
    // ];
    offset = [
      getCoords(e.target.parentElement).left - e.clientX,
      getCoords(e.target.parentElement).top  - e.clientY
    ];
  }


  if(typeof this.occupy == "number") {
    document.querySelectorAll(".position")[this.occupy].occupied= false;
    this.occupy=false;
  }

}


function getPos(e){
  if (e.type === 'touchstart' ) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  // let x = e.clientX - this.offsetLeft;
  // let y = e.clientY - this.offsetTop + scrollBodyTop();

  let cords = getCoords(this);
  let x = e.clientX - cords.left ;
  let y = e.clientY - cords.top;



  if ((x>0 && x<sizeOfPieces) && (y>0 && y<sizeOfPieces)){
    takePiece.call(this, e);
    // this.onmousedown=takePiece;
    // this.touchstart=takePiece;
    // this.ondblclick=turn;
    // this.style.cursor="move";

    this.style.zIndex=zIndex+1;



  }else{

    // this.onmousedown="";
    // this.touchstart="";
    // this.ondblclick="";
    // this.style.cursor="default";
    this.style.zIndex=this.zIndexPrevi;
  }


}


let lastTarget;
function onDblClick(e) {
  if(e.target.parentElement.className === 'move' || e.target.querySelectorAll('.move').length > 0) {
    return;
  }


  if ( lastTarget === undefined || lastTarget !== e.target) {
    lastTarget = e.target;
    clickCount = 1;
  }else {
    clickCount++;
  }

  if (clickCount === 1) {
    singleClickTimer = setTimeout(function() {
      clickCount = 0;
    }, 300);
  } else if (clickCount === 2) {
    clearTimeout(singleClickTimer);
    clickCount = 0;
    turn.call(this);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stopTracking(){



}

function seeImage() {
  let element = document.getElementById("backgroundImage");
  if (this.classList.contains('checked')) {
    element.classList.remove('checked');
    this.classList.remove('checked');
  } else {
    element.classList.add('checked');
    this.classList.add('checked');
  }

}

document.getElementById('menuButton').addEventListener('click', (e) => {
  let element = e.currentTarget;
  let menuElement = document.getElementById('menu');
  if (element.classList.contains('active')) {
    element.classList.remove('active');
    menuElement.classList.remove('active');
  } else {
    element.classList.add('active');
    menuElement.classList.add('active');
  }
  e.stopPropagation();
});

document.getElementById('menu').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.addEventListener("click", function(){
  let menuElement = document.getElementById('menu');
  let menuButtonElement = document.getElementById('menuButton');
  menuElement.classList.remove('active');
  menuButtonElement.classList.remove('active');
});
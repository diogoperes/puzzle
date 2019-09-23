import '../styles/index.scss';
// import $ from 'jquery';
import attachFastClick  from 'fastclick';

console.log('webpack starterkit');


var zIndex=1;
// var host='http://www.wdisseny.com/puzzle/';
var host='http://picsum.photos/';
let model;
let numRows;
let numCols;
let director;
let offset;
let pecaAlSeuLloc;
let timeInitial;
let timeEnd;

//double click variables
let clickCount = 0;
let singleClickTimer;

let sizeOfPieces = 100;

let pezaSeleccionada= false;

//create right part of piece and inversee
function createRightFace(i){
  // return {draw:" l -10,50 l 10,50 ",inverse:" l  -10,-50 l 10,-50 "}

  return {draw:"l 0, 43 l-5,0 a11,11 1,1,0 0,14 l5,0 l 0, 43",
    inverse:"l 0, -43 l-5,0 a11,11 1,1,1 0,-14 l5,0 l 0, -43"};

  var path =[
      {draw:"q -4,20 -5,43 l-5,0 a11,11 1,1,0 0,14 l5,0 q1,20 5,43",
      inverse:"q -4,-20  -5,-43 l-5,0 a11,11 1,1,1 0,-14 l5,0 q 1-20 5,-43"},
    {draw:"q -4,20 -5,43 l5,0 a11,11 1,1,1 0,14 l-5,0 q1,20 5,43",
      inverse:"q -4,-20 -5,-43 l 5,0 a11,11 1,1,0 0,-14 l-5,0 q 1-20 5,-43"},
    {draw:"q 4,20 5,43 l-5,0 a11,11 1,1,0 0,14 l5,0 q -1,20 -5,43",
      inverse:"q 4,-20  5,-43 l-5,0 a11,11 1,1,1 0,-14 l5,0 q -1-20 -5,-43"},
    {draw:"q 4,20 5,43 l5,0 a11,11 1,1,1 0,14 l-5,0	q -1,20 -5,43",
      inverse:"q 4,-20  5,-43 l5,0 a11,11 1,1,0 0,-14 l-5,0 q -1-20 -5,-43"},
  ];

  return path[Math.floor(Math.random()*path.length)];

}
function createBottomFace(i){
  // return {draw:" l -50,10 l -50,-10 ",inverse:" l  50,10 l 50,-10 "}

  //straight faces
  return {draw:"l -43, 0 l0,-5 a11,11 1,1,0 -14,0 l0,5 l -43,0",
    inverse:"l 43, 0 l0,-5 a11,11 1,1,1 14,0 l0,5 l 43,0 "};

  // var path =[
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

//get the inverse of left piece's right face to be the left face of current piece
function getInverseRightFace(i){
  return {draw:director[i-1].b.inverse};
}
//get the inverse of top piece's bottom face to be the top face of current piece
function getInverseBottomFace(i){
  return {draw:director[i-numCols].c.inverse};
}

function pieceData(row,col,index){
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
        d:getInverseRightFace(index),
      };
      break;
    case (row == numRows-1 && col == 0) :
      object={
        type:"infEsquerra",
        a:getInverseBottomFace(index),
        b:createRightFace(index),
        c:{draw:" l -100,0 "},
        d:{draw:" l 0,-100 "},
      };
      break;
    case (row === numRows-1 && col === numCols-1) :
      object={
        type:"infDreta",
        a:getInverseBottomFace(index),
        b:{draw:" l 0,100 "},
        c:{draw:" l -100,0 "},
        d:getInverseRightFace(index),
      };
      break;
    case (row === 0 ) :
      object={
        type:"superior",
        a:{draw:" l 100,0 "},
        b:createRightFace(index),
        c:createBottomFace(index),
        d:getInverseRightFace(index),
      };
      break;
    case (col === 0 ) :
      object={
        type:"esquerra",
        a:getInverseBottomFace(index),
        b:createRightFace(index),
        c:createBottomFace(index),
        d:{draw:" l 0,-100 "},
      };
      break;
    case (col === numCols-1 ) :
      object={
        type:"dreta",
        a:getInverseBottomFace(index),
        b:{draw:" l 0,100 "},
        c:createBottomFace(index),
        d:getInverseRightFace(index),
      };
      break;
    case (row === numRows-1 ) :
      object={
        type:"inferior",
        a:getInverseBottomFace(index),
        b:createRightFace(index),
        c:{draw:" l -100,0 "},
        d:getInverseRightFace(index),
      };
      break;
    default:
      object={
        type:"central",
        a:getInverseBottomFace(index),
        b:createRightFace(index),
        c:createBottomFace(index),
        d:getInverseRightFace(index),
      };
  }
  object.col=col;
  object.row=row;
  object.index=index;
  object.path=function(){return this.a.draw+this.b.draw+this.c.draw+this.d.draw+"z";};
  return object;

}


function createSvg(piecePath,x,y,index){
  let xmlns = "http://www.w3.org/2000/svg";
  let svg=document.createElementNS(xmlns,"svg");
  let idPattern="row"+x+"col"+y;
  // let pattern='<defs><pattern id="'+ idPattern +'" patternUnits="userSpaceOnUse" width="'+(numCols*sizeOfPieces)+'" height="'+(numRows*sizeOfPieces)+'"><image href="'+host+model.urlImg+'" x="'+(x*-100+40)+'" y="'+(y*-100+40)+'"  /></pattern></defs>';
  let pattern= `<defs>
    <pattern id="${idPattern}" patternUnits="userSpaceOnUse" width="${numCols*sizeOfPieces}" height="${numRows*sizeOfPieces}">
      <image href="${host}/${model.width}/${model.height}" x="${x*-100+40}" y="${y*-100+40}"></image>
    </pattern>
  </defs>`;
  svg.innerHTML= pattern;
  svg.setAttribute("width",sizeOfPieces * 180 / 100);
  svg.setAttribute("height",sizeOfPieces * 180 / 100);
  svg.setAttribute("viewBox","0 0 180 180");
  let path=  document.createElementNS(xmlns,"path");
  path.setAttribute("d","M40,40 "+piecePath);
  path.setAttribute("fill","url(#"+idPattern+")");
  path.style.fill="url(#"+idPattern+")";
  svg.appendChild(path);
  let move = document.createElement("DIV");
  move.appendChild(svg);
  move.className="move";
  move.style.width = sizeOfPieces + "px";
  move.style.height = sizeOfPieces + "px";
  move.path=path;
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
  move.style.zIndex = zIndex++;
  move.zIndexPrevi=move.style.zIndex;


}
var i, element;
var models=[

  // {
  //   numRows : 4,
  //   numCols : 6,
  //   urlImg :"4x6.jpg"
  // },
  {
    numRows : 2,
    numCols : 2,
    urlImg :"2x2.jpg",
    width: 200,
    height: 200,
  },
  {
    numRows : 3,
    numCols : 3,
    urlImg :"3x3.png",
    width: 300,
    height: 300,
  },
  {
    numRows : 4,
    numCols : 4,
    urlImg :"4x4.jpg",
    width: 400,
    height: 400,
  },

  {
    numRows : 5,
    numCols : 5,
    urlImg :"5x5.png",
    width: 500,
    height: 500,
  },
  {
    numRows : 5,
    numCols : 7,
    urlImg :"7x5.jpg",
    width: 700,
    height: 500,
  },
  {
    numRows : 6,
    numCols : 8,
    urlImg :"8x6.jpg",
    width: 800,
    height: 600,
  },

];

function selectModel(i){
  document.getElementById("models").style.height=0;
  model=models[i];
  createPuzzle(model);
  document.querySelector("#start").style.height="";
  document.querySelector("#modelsButton").style.height="";
  // document.querySelector("#tap").style.opacity=0;
  document.querySelector("#tap").style.display='none';
}

function createListModels(){
  // var HTMLmodels="<h2>Select model</h2>";
  let HTMLmodels = document.createElement('h2');
  HTMLmodels.innerHTML = "Select model";
  document.getElementById("models").appendChild(HTMLmodels);

  for (let i=0; i < models.length; i++) {
    let e = models[i];
    e.imageUrl = `${host}/${e.width}/${e.height}`;

    let div = document.createElement('div');
    div.innerHTML = `
        <b>${(i+1)}</b><br>
        ${e.numCols * e.numRows} pieces<br>
        <img height="${(e.numRows/3*100)}" src="${e.imageUrl}" width="${e.numcols/3*100}"><br>
        <small>${e.numCols*100} x ${e.numRows*100}</small>
      `;
    div.addEventListener("click", () => selectModel(i));
    document.getElementById("models").appendChild(div);

  }

}


function createPuzzle(model){
  pecaAlSeuLloc=0;
  document.getElementById("container").innerHTML="";
  director=[];
  let index=0;
  pezaSeleccionada= false;
  numRows=model.numRows;
  numCols=model.numCols;
  //adjust piece size to not overflow screen width
  if(window.innerWidth < numCols * sizeOfPieces + sizeOfPieces) {
    sizeOfPieces = window.innerWidth / numCols - 1;
  }
  //adjust piece size so puzzle height don't overpass 2.2 of screen height
  if(window.innerHeight / 2.2 < numRows * sizeOfPieces) {
    sizeOfPieces = (window.innerHeight / 2.2) / numRows;
  }

  if(sizeOfPieces < 40) {
    sizeOfPieces = 40;
    alert('Sorry :/ Your device is too small for this puzzle');
  }

  document.getElementById("container").style.width=numCols*sizeOfPieces +"px";
  document.getElementById("container").style.backgroundPositionY=sizeOfPieces*model.numRows+"px";
  for (let row=0; row<numRows; row++){
    for (let col=0; col<numCols; col++){
      var dades=pieceData(row,col,index);
      director.push(dades);
      createSvg(dades.path(),col,row,index);
      index++;
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  model=models[1];
  createPuzzle(model);
  createListModels();
  document.getElementById("seeModel").onmouseover=function(){
    document.getElementById("container").style.backgroundImage="url("+model.imageUrl+")";
    document.getElementById("container").style.backgroundPositionY=0;
  };
  document.getElementById( "seeModel").onmouseout=function(){
    document.getElementById("container").style.backgroundPositionY=100*model.numRows+"px";
  };
  document.getElementById("start").onclick= start;
  document.getElementById("arrangePieces").onclick = arrangePieces;
  document.getElementById("modelsButton").onclick = showModels;
  var botoFullScreen=document.getElementById("fullscreen");
  botoFullScreen.fullScreen=false;
  botoFullScreen.onclick=function(){
    if (this.fullScreen){
      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }else{
        document.exitFullscreen();
      }
      this.className="fullscreen";
    }else{
      if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      }else{
        document.body.requestFullscreen();
      }
      this.className="fullscreenOff";
    }
    this.fullScreen=!this.fullScreen;
  };

  // attachFastClick(document.body);

  // attachFastClick(document.body);
});

function scrollBodyTop(){return document.body.scrollTop|| document.documentElement.scrollTop;}
function final(){
  document.querySelectorAll(".move").forEach(function(e,i){
    e.path.style.strokeWidth="1px";
    e.path.style.stroke="black";
  });
  document.querySelector("#modelsButton").style.height="";
  // document.querySelector("#tap").style.height="";
  // document.querySelector("#tap").style.opacity=0;
  document.querySelector("#seeModel").style.top="-35px";
  document.getElementById("models").style.height=0;
  document.getElementById("time").innerHTML=timeEnd;
  document.getElementById("time").style.opacity=1;

}
function showModels(){
  document.getElementById("models").style.height="calc(100vh - 100px)";
  document.getElementById("time").innerHTML="";
  document.querySelector("#modelsButton").style.height=0;
  // document.querySelector("#tap").style.height="";
  document.querySelector("#tap").style.display="unset";
  // document.querySelector("#tap").style.opacity=1;
}
function start(){
  document.querySelector("#start").style.height=0;
  document.querySelector("#modelsButton").style.height=0;
  document.querySelector("#seeModel").style.top="10px";
  // document.querySelector("#tap").style.height=0;
  // document.querySelector("#tap").style.opacity=0;
  document.querySelector("#tap").style.display="none";
  document.querySelector("#modelsButton").style.height=0;

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
      var angle=Math.floor(Math.random()*4);
      e.setAttribute("classangle","g"+angle);
      e.style.transform="rotate("+angle*90+"deg)";
      e.angle=angle;
    },10);

  });
  timeInitial = (new Date).getTime();
  document.getElementById("time").innerHTML="";
}

function arrangePieces() {
  document.querySelectorAll("body > .move").forEach(function(e,i){
    let positionToSpawn = getPositionToSpawn();
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

function girar(){

  this.angle++;

  this.style.transform="rotate("+this.angle*90+"deg)";

  this.setAttribute("classangle","g"+this.angle%4);
  if ((this.occupy===this.index) && this.angle%4 ==0)fixPiece(this);


}
function takePiece(e){

  pezaSeleccionada=this;
  offset = [
    this.offsetLeft - e.clientX,
    this.offsetTop - e.clientY
  ];

  if(typeof this.occupy == "number") {
    document.querySelectorAll(".position")[this.occupy].occupied= false;
    this.occupy=false;
  }

}

function fixPiece(p){
  document.body.removeChild(p);
  document.querySelectorAll(".position")[p.index].appendChild(p);
  p.onmousedown="";
  p.onclick="";
  p.onmouseover="";
  p.onmouseout="";
  p.onmousemove="";
  p.ondblclick="";
  p.onmouseup="";
  p.style.cursor="default";
  p.style.position="static";
  setTimeout(function(){p.removeAttribute("classangle");},300);


  p.style.transition=".1s";
  p.path.style.strokeWidth=".5px";
  setTimeout(function(){p.style.transform="scale(1.05)";},50);
  setTimeout(function(){p.style.transform="scale(1)";},150);
  setTimeout(function(){p.path.style.strokeWidth="2px"; p.style.zIndex= 0;},250);
  pecaAlSeuLloc++;
  if (pecaAlSeuLloc == numRows * numCols ){
    timeEnd = Math.floor(((new Date).getTime()-timeInitial)/1000);
    var hores = Math.floor(timeEnd/3600);
    var minuts =  Math.floor((timeEnd - hores * 3600)/60);
    minuts= minuts<10 ? "0"+minuts : minuts;
    var segons = timeEnd - hores * 3600 - minuts *60;
    segons= segons<10 ? "0"+segons : segons;
    timeEnd ="Time spent: " +
      +((hores>0) ? hores +"h " :"")+
      + minuts +"' " + segons +"''";
    document.getElementById("time").style.opacity=0;
    setTimeout(final,1500);
  }
}
function placePiece(p){

  p.style.zIndex = zIndex++;
  p.zIndexPrevi=p.style.zIndex;
  document.querySelectorAll(".position").forEach (function(e,i){
    if ((p.position().left>e.offsetLeft && p.position().left<e.offsetLeft+sizeOfPieces)&&(p.position().top>e.offsetTop && p.position().top<e.offsetTop+sizeOfPieces) && !e.occupied ){
      p.style.left=e.offsetLeft+"px";
      p.style.top=e.offsetTop+"px";
      e.occupied= true;
      p.occupy = i;
      if (e.index == p.index && p.getAttribute("classangle")=="g0")fixPiece(p);

    }
  });

}
function dropPiece(){

  placePiece(pezaSeleccionada);


  pezaSeleccionada=false;

}
document.addEventListener('mousemove', drag, true);
document.addEventListener("touchmove", drag, true);

function drag(e) {
  // clickCount=0;
  // event.preventDefault();
  if (e.type === 'touchmove' ) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  if (pezaSeleccionada) {
    let mousePosition = {

      x : e.clientX,
      y : e.clientY

    };
    pezaSeleccionada.style.left = (mousePosition.x + offset[0]) + 'px';
    pezaSeleccionada.style.top  = (mousePosition.y + offset[1]) + 'px';


  }
}


function getPos(e){
  if (e.type === 'touchstart' ) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  let x = e.clientX - this.offsetLeft;
  let y = e.clientY - this.offsetTop + scrollBodyTop();

  if ((x>0 && x<sizeOfPieces) && (y>0 && y<sizeOfPieces)){
    takePiece.call(this, e);
    // this.onmousedown=takePiece;
    // this.touchstart=takePiece;
    // this.ondblclick=girar;
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
    girar.call(this);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stopTracking(){



}

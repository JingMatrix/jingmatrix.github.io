"use strict";

/*
----INITIAL CONSTRUCTIONS----
*/

//define canvas
let myCanvas = HyperbolicCanvas.create('#hyperbolic-canvas');
let ctx= myCanvas.getContext('2d');

//set constants, initialise global variables
const DOT_SIZE = .03;
const APPLE_SIZE = DOT_SIZE*1.5;
const SEG_SIZE = DOT_SIZE;
const START_LEN = 30;
//RADIUS obtained via clever calculations using cosh^-1
const RADIUS = 2.44845244;
const SAFE_RADIUS = 1.5;
const GROWTH_FACTOR = 10;
let DELAY = 50;
let inGame = false;
let difficulty = null;
const LEFT= 37;
const RIGHT= 39;
const SPACE = 32;
const START_DIRECTION = Math.PI/8;
const START_HEAD_POS = HyperbolicCanvas.Point.givenCoordinates(0,0);
let apple = {};
let snake = {};
let START_HEAD ={
    position : START_HEAD_POS, 
    direction : START_DIRECTION
 };
let START_BODY = [START_HEAD.position];

//construct the octagon
let surface = HyperbolicCanvas.Polygon.givenHyperbolicNCenterRadius(8, HyperbolicCanvas.Point.CENTER, RADIUS);
//safeCircle is a circle which is stricly inside the octagon
let safeCircle = HyperbolicCanvas.Circle.givenHyperbolicCenterRadius(HyperbolicCanvas.Point.CENTER, SAFE_RADIUS);

//get the sides and the circles defining the boundary of the octagon
let _bdryLines = surface.getLines();
let _bdryCircles = [];
_bdryLines.forEach(line=>{
    let circle = line.getHyperbolicGeodesic();
    _bdryCircles.push(circle);
});
//get lines through the center to reflect
let _apothems = [];
for (let i=0; i<8;i++){
    let apo = HyperbolicCanvas.Line.givenAnglesOfIdealPoints(
        Math.PI/8+i*Math.PI/4, HyperbolicCanvas.Angle.opposite(Math.PI/8+i*Math.PI/4) 
        );
    _apothems.push(apo);
};

//define the gluings, color sides for easy mode
function newIndex(exit){
    switch(exit){
        case 0:return 6;
        case 1:return 7;
        case 2:return 4;
        case 3:return 5;
        case 4:return 2;
        case 5:return 3;
        case 6:return 0;
        case 7:return 1;
    }
}
function reflIndex(exit){
    switch(exit){
        case 0:return 7;
        case 1:return 0;
        case 2:return 3;
        case 3:return 4;
        case 4:return 3;
        case 5:return 4;
        case 6:return 7;
        case 7:return 0;
    }
}
function colorSides(){
    let color1 = '#fcba03';
    let color2 = '#9d03fc';
    let color3 = '#37fa57';
    let color4 = '#e05c6e';
    let color = 'white';
    for (let i =0; i<8; i++){
        switch(i){
            case (0): { color =color1; break;}
            case (1): { color =color2; break;}
            case (2): { color =color3; break;}
            case (3): { color =color4; break;}
            case (4): { color =color3; break;}
            case (5): { color =color4; break;}
            case (6): { color =color1; break;}
            case (7): { color =color2; break;}
        }
        let path = myCanvas.pathForHyperbolic(_bdryLines[i]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        myCanvas.stroke(path);
    }
    for (let i =0; i<8; i++){
        let p = surface.getVertices()[i];
        let path = myCanvas.pathForHyperbolic(
            HyperbolicCanvas.Circle.givenHyperbolicCenterRadius(p, DOT_SIZE*4));
        myCanvas.fill(path);
    }
}
//draw surface
function drawSurface(diffPara){
    ctx.fillStyle = '#edebc2'
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    let path = myCanvas.pathForHyperbolic(surface);
    myCanvas.fillAndStroke(path);
    if (diffPara === 'easy'){
        colorSides();
    }
}

//define geometric functions
//reflection of a point through a line going through 0
function reflect(p, l){
    let relAngle = p.getAngle()-HyperbolicCanvas.Angle.fromSlope(l.getSlope());
    let newP = HyperbolicCanvas.Point.givenEuclideanPolarCoordinates(
        p.getEuclideanRadius(),
        p.getAngle() -2*relAngle
    );
    return newP;
}
//reflection of a point through the line going through p1, p2
function reflect2(point, p1, p2){
    let m = (p1.getY()-p2.getY())/(p1.getX()-p2.getX());
    let slope = m!=0 ? -1/m : HyperbolicCanvas.INFINITY;
    let norm = [1/Math.sqrt((1+Math.pow(slope,2))), slope/Math.sqrt((1+Math.pow(slope,2)))];
    let c = norm[0]*p1.getX() + norm[1]*p1.getY();
    //equation of the line is now norm.x=c
    let scal = point.getX()*norm[0]+point.getY()*norm[1];
    let newX = point.getX()- 2*(scal-c)*norm[0];
    let newY = point.getY()- 2*(scal-c)*norm[1];
    return HyperbolicCanvas.Point.givenCoordinates(newX,newY);
}
function angleGivenPoints(a,b){
    let vect= [a.getX()-b.getX(), a.getY()-b.getY()];
    let slope = (vect[0] !=0) ? vect[1]/vect[0] :HyperbolicCanvas.INFINITY;
    return (vect[0]>=0) ? Math.atan(slope) : Math.atan(slope)+Math.PI;    
}

/*
----SNAKE MOVEMENT----
*/

//apple functions
function resetApple(){
    apple.position =null;
    apple.value = -1;
}
//makes apple randomly, not too close to snake and inside the octagon
function makeApple(snake){
    let exitIndex = 10;
    let onSnake = true;
    let p = HyperbolicCanvas.Point.CENTER;
    while (exitIndex>=0 || onSnake === true){
        exitIndex = -1;
        onSnake = false;
        let ranAngle = Math.random()*Math.TAU;
        let ranRadius = Math.random();
        p = HyperbolicCanvas.Point.givenEuclideanPolarCoordinates(ranRadius,ranAngle);
        for (let i = 0; i< 8;i++){
            if (_bdryCircles[i].containsPoint(p)){
                exitIndex = i;
                break;
            }
        }
        snake.body.forEach(node=>{
            if (checkClose(p,node, 'easy')){
                onSnake = true;
            }
        })
    }
    apple.position = p;
    apple.value ++;
}
function drawApple(){
    let path = myCanvas.pathForHyperbolic(
        HyperbolicCanvas.Circle.givenHyperbolicCenterRadius(apple.position, APPLE_SIZE));
    ctx.fillStyle = '#bf5028';
    myCanvas.fill(path); 
}

//snake functions
function resetSnake(snake){
    START_HEAD.position = START_HEAD_POS;
    START_HEAD.direction = START_DIRECTION;
    START_BODY = [START_HEAD.position];
    for (let i = 0; i<START_LEN-1; i++){
        START_BODY.push(START_BODY[0].hyperbolicDistantPoint(SEG_SIZE*(i+1), HyperbolicCanvas.Angle.opposite(START_HEAD.direction)));
     };    
    snake.body = START_BODY;
    snake.instruction = START_HEAD;
    snake.steps_from_instr = 0;
    snake.growing = 0;
}
function drawSnake(snake){
    myCanvas.setContextProperties({ fillStyle: '#1d7513' });
    snake.body.forEach(node => {
        let path = myCanvas.pathForHyperbolic(
            HyperbolicCanvas.Circle.givenHyperbolicCenterRadius(node, DOT_SIZE));
        myCanvas.fill(path);    
    });
}
function newInstruction(snake, dir, p){
    dir = HyperbolicCanvas.Angle.normalize(dir);
    snake.instruction.position = p;
    snake.instruction.direction = dir;
    snake.steps_from_instr = 0;
}
//turn in straight angles
function turn(snake, str){
    let newHead = snake.instruction.position.hyperbolicDistantPoint(
        SEG_SIZE*(snake.steps_from_instr+1),
        snake.instruction.direction);
    let dir = angleGivenPoints(newHead, snake.body[0]);
    switch(str){
        case 'left': {dir += Math.PI/2;
        break;
        }
        case 'right':{dir-= Math.PI/2;
        break;
        }
        default: break;
    }
    newInstruction(snake, dir, snake.body[0]);
    fullMove(snake);
}
//main move function, takes care of transitions at octagon sides
function moveSnake(snake){
    let newHead = snake.instruction.position.hyperbolicDistantPoint(
        SEG_SIZE*(snake.steps_from_instr+1),
        snake.instruction.direction);
    snake.steps_from_instr++;
    let exitIndex = null;
    if (!safeCircle.containsPoint(newHead)){
        for (let i = 0; i< 8;i++){
            if (_bdryCircles[i].containsPoint(newHead)){
                exitIndex = i;
                break;
            }
        }
        if (exitIndex!=null){
            let transNewHead = reflect(snake.body[0],_apothems[reflIndex(exitIndex)]);
            let ausil = reflect(newHead,_apothems[reflIndex(exitIndex)]);
            let m=-1/HyperbolicCanvas.Angle.toSlope(_bdryCircles[newIndex(exitIndex)].euclideanAngleAt(transNewHead));
            let p2 = HyperbolicCanvas.Point.givenCoordinates(1/10+transNewHead.getX(),m/10+transNewHead.getY());
            let newNewHead = reflect2(ausil, transNewHead,p2);
            let newAngle = HyperbolicCanvas.Angle.normalize(angleGivenPoints(newNewHead,transNewHead));
            newInstruction(snake,newAngle,transNewHead);
            newHead = transNewHead;
        }
    };
    snake.body.unshift(newHead);
    if (snake.growing>0){
        snake.growing--;
    }
    else{
        snake.body.pop();
    }   
}

//collision functions
function checkClose(p1,p2, diff){
    let d = p1.hyperbolicDistanceTo(p2);
    let dist = (diff === 'easy') ? APPLE_SIZE : .99*DOT_SIZE;
    return (d<dist)?true:false;
}
function checkCollision(snake){
    let head = snake.body[0];
    let coll = false;
    snake.body.forEach(node=>{
        if (node!=head && checkClose(node,head, '')){
            coll = true;
        }
    }
    );
    return coll;
}
function checkHasEatenApple(snake){
    return checkClose(snake.body[0],apple.position,'easy');
}
//move that checks for collision and for apple-eating
function fullMove(snake){
    moveSnake(snake);
    if (checkCollision(snake)){
        DELAY = 0;
        inGame = false;
    }
    if (checkHasEatenApple(snake)){
        makeApple(snake);
        snake.growing += Math.floor(Math.sqrt(GROWTH_FACTOR*apple.value));
    }
    drawSnake(snake);
}

//listeners for turning
var pressed = false;
document.addEventListener('keydown', function(key){
    if (!pressed && inGame){
        switch(key.which){
        case LEFT: {
            pressed = true;
            turn(snake,'left');
            break;
            }
        case RIGHT: {
            pressed = true;
            turn(snake,'right');
            break;
        }
    }   
    }     
})
//prevent repeat events if key is held down
document.addEventListener('keyup', function(key){
    if (key.which === LEFT || key.which === RIGHT && inGame){
        pressed = false;
    }
})

/*
----GAME MENU----
*/

//first page, runs once with page =1
function menu(){
    let text = 'Welcome to H2Snake, a game of snake<br>on a hyperbolic surface of genus 2.<br><br>Press spacebar to continue.'
    let theMenu = document.getElementById('menu');
    theMenu.style.fontFamily = 'monospace';
    theMenu.style.fontSize = '48px';
    theMenu.style.color = 'white';
    theMenu.innerHTML = text;
    document.addEventListener('keydown', eventHandler);
}
//second page, runs after page 1 and every time we try again
function chooseDifficulty(){
    page =2;
    document.getElementById('git').style.display = 'none';
    let btn1 = document.getElementById('1');
    btn1.style.display = 'inline';
    btn1.onclick = function(){
        difficulty = 'easy';
        commandMenu();
    }
    let btn2 = document.getElementById('2');
    btn2.style.display = 'inline';
    btn2.onclick = function(){
        difficulty = 'hard';
        commandMenu();
    }
}
//third page, runs every time we choose difficulty
function commandMenu(){
    page=3;
    let btn1 = document.getElementById('1');
    btn1.style.display = 'none';
    let btn2 = document.getElementById('2');
    btn2.style.display = 'none';
    let text = `You chose ${difficulty} mode.<br><br> Use left and right arrow to turn.<br><br>Press spacebar to start.`
    document.getElementById('menu').innerHTML = text;
}
//fourth page, runs every time we lose the game
function finalScreen(){
    page = 4;
    myCanvas.clear();
    let plur = (apple.value===1)?'':'s';
    let text = `You managed to get ${apple.value} point${plur} in ${difficulty} mode.<br>Press spacebar to`;
    let btn3 = document.getElementById('3');
    document.getElementById('menu').innerHTML = text;
    btn3.style.display = 'inline';
    document.getElementById('git').style.display = 'inline';
    document.getElementById('git').style.left='160px';
    document.getElementById('git').style.top='700px';
    btn3.onclick = function(){
        page = 2;
        btn3.style.display = 'none';
        document.getElementById('menu').innerHTML = "Choose your difficulty<br>(and practice using arrow buttons).";
        chooseDifficulty();
    }
    
}
//common handler for keyboard events in menu
function eventHandler(key){
    //if in page 1, go to page 2: choose difficulty
    if (key.which === SPACE && page===1 && !inGame){
        let text = "Choose your difficulty<br>(and practice using arrow buttons)."
        document.getElementById('menu').innerHTML = text;
        chooseDifficulty();
    }
    //if in page 2, select difficulty
    if (key.which=== LEFT && page ===2 && !inGame){
        difficulty = 'easy';
        commandMenu();
    }
    if (key.which=== RIGHT && page ===2 && !inGame){
        difficulty = 'hard';
        commandMenu();
    }
    //if in page 3, start game
    if (key.which ===SPACE && page === 3 && !inGame){
        startGame();
    }
    //if in page 4, choose difficulty
    if (key.which === SPACE && page === 4 && !inGame){
        page = 2;
        document.getElementById('3').style.display  = 'none';
        document.getElementById('menu').innerHTML = "Choose your difficulty<br>(and practice using arrow buttons).";
        chooseDifficulty();
    }
}

//game functions
function startGame(){
    document.getElementById('menu').innerHTML = "";
    switch (difficulty){
        case 'easy': {
            DELAY = 55;
            break;
        }
        case 'hard':{
            DELAY = 25;
            break;
        }
    }
    init();
    render();
}
function init(){
    inGame = true;
    drawSurface(difficulty);
    resetSnake(snake);
    resetApple();
    drawSnake(snake);
    makeApple(snake);
}
//game loop
function render() {
    if (inGame){
        myCanvas.clear();
        drawSurface(difficulty);
        drawApple();
        fullMove(snake);
        setTimeout(function(){requestAnimationFrame(render);},DELAY);
    }
    else {
        setTimeout(function(){finalScreen();}, 2000);
        document.getElementById("end").volume = 0.5;
        document.getElementById("end").play();
    }
  };

/*
----MAIN()----
*/

let page =1;
menu();
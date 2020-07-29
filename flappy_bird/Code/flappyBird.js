let gameCanvas = document.getElementById("gameCanvas");
var cx = gameCanvas.getContext("2d");

let gameOver = false;
///////////////////////////////////////scoreBoard/////////////////////////////////////////////////////////////
let scoreBoard = {
    position: { x: gameCanvas.width * 0.50, y: gameCanvas.height*0.2 },
    score: 0,
    boardImage: new Image(),
    bestScore: 0,
    visible:false
}
scoreBoard.boardImage.src = "../parts/FinishScoreBoard.png"
scoreBoard.showBoard = function ()
{
   
        let animation = setInterval(() =>
        {
            if (scoreBoard.position.y < gameCanvas.height / 4)
                scoreBoard.position.y += 2;
            else {
                this.visible = true;
                clearInterval(animation);
            }
    }, 10)
    
}
scoreBoard.getNumbersImages = function (number)
{
    let result = []
    if (number == 0)
        
    {
        result.push(scoreBoard[0]);
        return result;
        }
    while (Math.floor(number) !== 0) {
        result.push(scoreBoard[Math.floor( number) % 10])
        number /= 10;
    }
    result = result.reverse();
    return result;
    }
scoreBoard.addOneToScore = function () {
    scoreBoard.score++;
    if (scoreBoard.bestScore < scoreBoard.score)
    scoreBoard.bestScore = scoreBoard.score;
}
scoreBoard.setImages = function ()
{
    for (let i = 0; i <= 9; i++)
    {
        scoreBoard[i] = new Image();
        scoreBoard[i].src = `../parts/numbers/${i}.png`;
        }
}
scoreBoard.currentScoreImages = function ()
{
    return this.getNumbersImages(this.score)
}
scoreBoard.update = function (tubes)
{
    if (tubes.some((tubesLine) => {
        if (tubesLine.upperTube.position.x < bird.positionX && tubesLine.passAlredy !== true) {
            tubesLine.passAlredy = true;
            return true;
        }
        else return false;
     })) 
        scoreBoard.addOneToScore();
    
            }
scoreBoard.setImages();
///////////////////////////////////////bird////////////////////////////////////////////////
let bird = {}
let birdSpriteW = 91, birdSpirteH = 91;
bird.init=function(){
    this.size= { height: 18, width: 18 },
    this.positionX= gameCanvas.width / 2,
    this.positionY= gameCanvas.height *0.4,
    this.Incline= 0,
    this.fall= false,
        this.image = new Image(),
        this.image.src=bird.image.src = "../bird (1).png";
    this.jumpPower= 12
}
bird.startfall = function (limitY) {
    this.fall = true;
    new Promise((resolve) => {
        let fall = setInterval(() => {
            if (this.fall == true) {
                if (this.Incline > -4.6)
                    this.Incline -= .1;
                if (this.positionY + bird.size.height <= limitY-2 && this.fall) {
                    this.positionY += speed.fall;
                }
                else {
                    this.fall = false;
                    this.positionY = limitY-bird.size.height-2;
                    gameOver = true;
                    if (this.Incline > 0)
                        this.Incline=0;
                    clearInterval(fall)
                    resolve();
                }
            }
            else {
                clearInterval(fall)
                resolve();
            }
        }
            , speed.bird)
    }).then()
}
let jumpAnimate;
bird.wait = function () {
    this.isWaiting = true;
    let limitButtomY = this.positionY + 10;
    let limitTopY = this.positionY - 10;
    let goUp = true
    waitingAnimate = setInterval(() => {
        if (goUp) {
            this.positionY--;
            if (this.positionY < limitTopY)
                goUp = false;
        }
        if (!goUp) {
            this.positionY++;
            if (this.positionY > limitButtomY)
                goUp = true;
        }
        if (this.isWaiting == false)
            clearInterval(waitingAnimate)
    }
        , 25
    )
    
}
bird.fly = function () {
    clearInterval(jumpAnimate)
    this.fall = false;
    this.Incline = 0.9;
    let positionYBeforeJump = bird.positionY;
    this.positionY -= 8
    new Promise((resolve) => {
        jumpAnimate = setInterval(() => {
            // if (!this.fall) {
            if (this.Incline < 1.1)
                this.Incline += .75
            if (positionYBeforeJump - this.positionY < bird.jumpPower && !this.fall) {

                this.positionY -= 8
            }
            else {//not startfall directly so its not start incline
                this.fall = true;
                this.positionY += speed.fall
            }
            if (this.positionY > positionYBeforeJump) {
                this.startfall(field.position.y);
                clearInterval(jumpAnimate)
                resolve();
            }


        }, speed.bird)

    }).then();
}
bird.touch = function (tubesAlive) {
    let result = false;
    tubesAlive.forEach((tubesLine) => {
        if (tubesLine.buttomTube.position.x <= bird.positionX + bird.size.width && bird.positionX + bird.size.width <= tubesLine.buttomTube.position.x + tubesLine.width) {
            let isTuchingUpperTube = bird.positionY < tubesLine.upperTube.height + tubesLine.upperTube.position.y;
            let isTuchingButtomTube = bird.positionY + bird.size.height > tubesLine.buttomTube.position.y ;
            if (isTuchingUpperTube || isTuchingButtomTube) {
                //console.log("buttom"+isTuchingButtomTube+"upper"+isTuchingUpperTube)
                result = true;
            }
        }
    })
    return result;
}
////////////////////////////tubes/////////////////////////////
class Tubes {
    constructor(positionX, spaceBetween, canvasHeight) {
        let upperTubeY = -50 - Math.random() * canvasHeight / 2;
        this.width = 30;
        this.spaceBetween = 100;
        this.upperTube = {
            height: canvasHeight,
            position: {
                x: positionX,
                y: upperTubeY,
            }
        }
        this.upperTube.image = new Image()
        this.upperTube.image.src = "../parts/tube_upper_line.png";
        this.buttomTube = {
            height: canvasHeight,
            position: {
                x: positionX,
                y: spaceBetween + (upperTubeY + canvasHeight),
            }
        }
        this.buttomTube.image = new Image();
        this.buttomTube.image.src = "../parts/tube_buttom_line.png";
    }
    move = function () {
        this.upperTube.position.x--;
        this.buttomTube.position.x--;
    }
}
function deleteUnSeenTubes (tubes) {
    return new Promise((resolve) => {
        for (let tubesLine of tubes) {
            if (tubesLine.buttomTube.position.x < -100) {
                currentTubes.shift()
            }
        }
        resolve();
    })
}
///////////////////////////field///////////////////////
let field = {
    image: new Image(),
    size: { height: 15, width: 482 },
    position: { x: 0, y: gameCanvas.height - 15 }
}
field.image.src = "../parts/buttom_field.png";
field.image.addEventListener("load", () => field.size.height = field.image.naturalHeight)

let speed = {
    cyclesToUpdateBird: 8,
    cyclesToUpdateButtomField: 9,
    cyclesToAddNewTube: 240,
    fall: 2.2,
    bird: 40

};

/////////////////////////events/////////////////////////
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
window.addEventListener("keypress", (event) => {

    if (!gameOver && event.code === "Space") {
        clickHandler();
    }
    else if (gameOver&&scoreBoard.visible)
        restartButton.restart();
    event.preventDefault();
})
gameCanvas.addEventListener("click", (event) => {
    if (gameOver === true && restartButton.isClick(getMousePos(gameCanvas, event))) {
        restartButton.restart()
    }
    else if (!gameOver)
        clickHandler();
    event.preventDefault();
})
let clickHandler = function () {
    if (bird.isWaiting)
        bird.isWaiting = false;
    bird.fly()
}

/////////////////////////////restartButton//////////////////////////////
let restartButton = new Image()
restartButton.src = "../parts/restartButton.png"
scoreBoard.boardImage.addEventListener("load", () => {
    restartButton.position = {
        x: (gameCanvas.width / 2 - 10), y: (gameCanvas.height * 0.2 + scoreBoard.boardImage.naturalHeight * 0.25 )
    }
    restartButton.clickPosition = { x: 224, y: 369 }
    restartButton.clickSize={height:80,width:105}
})
restartButton.addEventListener("load",()=> restartButton.size = { height:restartButton.naturalHeight * 0.25, width:restartButton.naturalWidth * 0.3 })
restartButton.isClick = function ({ x, y })
{
    if (this.clickPosition.x <= x && (this.clickPosition.x + this.clickSize.width) >= x
        && this.clickPosition.y <= y && (this.clickPosition.y + this.clickSize.height) >= y)
        return true;
    else return false;
}
restartButton.restart = function ()
{
    bird.init();
        bird.wait();
        firstLostTuch = true;
        currentTubes = []
    scoreBoard.score = 0;
    scoreBoard.visible = false;
        gameOver = false;
    }
/////////////////////////////////animation//////////////////////
bird.init();
let cyclesHaveDone = 0
let buttomFieldCutX = 0
let cycleBirdSpirte = 0;
let currentTubes = []
let firstLostTuch = true;
bird.wait();
let gameAnimation = setInterval(() => {  
    cyclesHaveDone++; 
    cx.imageSmoothingEnabled = false;
    cx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
    scoreBoard.update(currentTubes);
    deleteUnSeenTubes(currentTubes).then();
    currentTubes.forEach((tubesLine) => {
        if (!gameOver)
            tubesLine.move();
        cx.drawImage(tubesLine.buttomTube.image, 0, 0, tubesLine.buttomTube.image.naturalWidth, tubesLine.buttomTube.image.naturalHeight, tubesLine.buttomTube.position.x, tubesLine.buttomTube.position.y, tubesLine.width, tubesLine.buttomTube.height)
        cx.drawImage(tubesLine.upperTube.image, 0, 0, tubesLine.upperTube.image.naturalWidth, tubesLine.upperTube.image.naturalHeight, tubesLine.upperTube.position.x, tubesLine.upperTube.position.y, tubesLine.width + 2, tubesLine.upperTube.height)
    })
    cx.save();
    cx.translate(bird.positionX + bird.size.width / 2, bird.positionY + bird.size.height / 2);
    cx.rotate(- bird.Incline * Math.PI / 10);
    cx.drawImage(bird.image, cycleBirdSpirte * birdSpriteW, 0, birdSpriteW, birdSpirteH, 0, 0, bird.size.width, bird.size.height)
    cx.restore();
    cx.save();
    cx.scale(0.5, 0.5)
    cx.drawImage(field.image, buttomFieldCutX, 0, field.image.naturalWidth, field.image.naturalHeight, field.position.x * 2, field.position.y * 2, field.image.naturalWidth * 2, field.image.naturalHeight)//buttomfield
    cx.restore();
    updateMovement();
    if(!gameOver&&! bird.isWaiting)
    scoreBoard.currentScoreImages().forEach((number, index) => {
        cx.drawImage(number, 0, 0, number.naturalWidth, number.naturalHeight, scoreBoard.position.x+number.naturalWidth*index, scoreBoard.position.y, number.naturalWidth, number.naturalHeight)
    })
    if (bird.touch(currentTubes) === true || gameOver) {  
        gameOverHandler(cx)
    }
}, 16)
let gameOverHandler = function (canvasContex) {
    if (!gameOver) {
        bird.startfall(field.position.y)
    }
    if (firstLostTuch) {
        firstLostTuch = false;
        blinkCanvas(cx);
    }
    gameOver = true;
    canvasContex.save()
    canvasContex.scale(.5, .25);
    canvasContex.imageSmoothingEnabled = false;
    canvasContex.drawImage(scoreBoard.boardImage, 0, 0, scoreBoard.boardImage.naturalWidth, scoreBoard.boardImage.naturalHeight, scoreBoard.position.x+105, scoreBoard.position.y+115, scoreBoard.boardImage.naturalWidth , scoreBoard.boardImage.naturalHeight )
    canvasContex.restore();
    scoreBoard.showBoard();
    canvasContex.imageSmoothingEnabled = true;
    scoreBoard.currentScoreImages().forEach((number, index) => {
        canvasContex.drawImage(number, 0, 0, number.naturalWidth, number.naturalHeight, scoreBoard.position.x + 20 + number.naturalWidth * index, scoreBoard.position.y + 18, number.naturalWidth * 0.7, number.naturalHeight * 0.5)
    })
    scoreBoard.getNumbersImages(scoreBoard.bestScore).forEach((number, index) => {
        canvasContex.drawImage(number, 0, 0, number.naturalWidth, number.naturalHeight, scoreBoard.position.x + 20 + number.naturalWidth * index, scoreBoard.position.y + 38, number.naturalWidth * 0.7, number.naturalHeight * 0.5)
    })
    
    canvasContex.drawImage(restartButton, 0, 0, restartButton.naturalWidth, restartButton.naturalHeight, restartButton.position.x, restartButton.position.y, restartButton.size.width, restartButton.size.height)

}
let blinkCanvas = function (cx)
{
    cx.fillStyle = "#000000";
    cx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
        let blinkAnimate=setTimeout(()=> { cx.fillStyle="#ffffff"
            cx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
              }, 70)
    }
let updateMovement = function ()
{
    if (cyclesHaveDone % speed.cyclesToUpdateButtomField === 0 && !gameOver)
        buttomFieldCutX = buttomFieldCutX == 0 ? 5 : 0;
    if (cyclesHaveDone % speed.cyclesToUpdateBird === 0 && !gameOver)
        cycleBirdSpirte = (cycleBirdSpirte + 1) % 3;
    if (cyclesHaveDone % speed.cyclesToAddNewTube == 0&&!bird.isWaiting)
        currentTubes.push(new Tubes(gameCanvas.width, 38, gameCanvas.height))
    }




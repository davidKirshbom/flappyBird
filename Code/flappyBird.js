let gameCanvas = document.getElementById("gameCanvas");
var cx = gameCanvas.getContext("2d");
bird.init();
const BIRD_SPRITE_WIDTH = 91
const BIRD_SPRITE_HEIGHT = 91
bird.wait();
let speed = {
    cyclesToUpdateBird: 8,
    cyclesToUpdateButtomField: 9,
    cyclesToAddNewTube: 240,
    fall: 2.2,
    bird: 40
};
let animationStates = {
    cyclesHaveDone: 0,
    buttomFieldCutX: 0,
    cycleBirdSpirte: 0,
    
}
let gameState = {
    gameOver : false,
    currentTubes: [],
    firstLostTuch :true
}

let startFlappyBirdGame = function () {
    let gameAnimation = setInterval(() => {
        animationStates.cyclesHaveDone++;
        scoreBoard.update(gameState.currentTubes);
        deleteUnSeenTubes(gameState.currentTubes).then();
        drawScene(cx)
        updateMovement();
        if (bird.touch(gameState.currentTubes) === true || gameState.gameOver) {
            gameOverAnimateHandler(cx)
        }
    }, 16)
}
let updateMovement = function () {
    if (animationStates.cyclesHaveDone % speed.cyclesToUpdateButtomField === 0 && !gameState.gameOver)
        animationStates.buttomFieldCutX = animationStates.buttomFieldCutX == 0 ? 5 : 0;
    if (animationStates.cyclesHaveDone % speed.cyclesToUpdateBird === 0 && !gameState.gameOver)
        animationStates.cycleBirdSpirte = (animationStates.cycleBirdSpirte + 1) % 3;
    if (animationStates.cyclesHaveDone % speed.cyclesToAddNewTube == 0 && !bird.isWaiting)
        gameState.currentTubes.push(new Tubes(gameCanvas.width, 38, gameCanvas.height))
}
let drawTubesLine = function (canvasContext,tubesLine)
{
    if (!gameState.gameOver)
    tubesLine.move();
    canvasContext.drawImage(tubesLine.buttomTube.image, 0, 0, tubesLine.buttomTube.image.naturalWidth, tubesLine.buttomTube.image.naturalHeight, tubesLine.buttomTube.position.x, tubesLine.buttomTube.position.y, tubesLine.width, tubesLine.buttomTube.height)
    canvasContext.drawImage(tubesLine.upperTube.image, 0, 0, tubesLine.upperTube.image.naturalWidth, tubesLine.upperTube.image.naturalHeight, tubesLine.upperTube.position.x, tubesLine.upperTube.position.y, tubesLine.width + 2, tubesLine.upperTube.height)
}
    
let drawScene=function(canvasContext)
{
    canvasContext.imageSmoothingEnabled = false;
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
    gameState.currentTubes.forEach((tubesLine) => drawTubesLine(cx, tubesLine))
    drawBird(cx)
    canvasContext.save();
    canvasContext.scale(0.5, 0.5)
    canvasContext.drawImage(field.image, animationStates.buttomFieldCutX, 0, field.image.naturalWidth, field.image.naturalHeight, field.position.x * 2, field.position.y * 2, field.image.naturalWidth * 2, field.image.naturalHeight)//buttomfield
    canvasContext.restore();
    if(!gameState.gameOver&&! bird.isWaiting)
    scoreBoard.currentScoreImages().forEach((number, index) => {
        cx.drawImage(number, 0, 0, number.naturalWidth, number.naturalHeight, scoreBoard.position.x+number.naturalWidth*index, scoreBoard.position.y, number.naturalWidth, number.naturalHeight)
    })
}
let drawBird=function(canvasContext) 
{
    canvasContext.save();
    canvasContext.translate(bird.positionX + bird.size.width / 2, bird.positionY + bird.size.height / 2);
    canvasContext.rotate(- bird.Incline * Math.PI / 10);
    canvasContext.drawImage(bird.image, animationStates.cycleBirdSpirte * BIRD_SPRITE_WIDTH, 0, BIRD_SPRITE_WIDTH, BIRD_SPRITE_HEIGHT, 0, 0, bird.size.width, bird.size.height)
    canvasContext.restore();
}
let gameOverAnimateHandler = function (canvasContext) {
    if (!gameState.gameOver) {
        bird.startfall(field.position.y)
    }
    if (gameState.firstLostTuch) {
        gameState.firstLostTuch = false;
        blinkCanvas(canvasContext);
    }
    gameState.gameOver = true;
    drawScoreBoard(canvasContext)
    restartButton.initImage({ height: restartButton.image.naturalHeight * 0.25, width: (restartButton.image.naturalWidth * 0.3) },
                            { x: (gameCanvas.width / 2 - 10), y: (gameCanvas.height * 0.2 + scoreBoard.boardImage.naturalHeight * 0.25) })
    canvasContext.drawImage(restartButton.image, 0, 0, restartButton.image.naturalWidth, restartButton.image.naturalHeight, restartButton.position.x, restartButton.position.y, restartButton.image.size.width, restartButton.image.size.height)
}
let drawScoreBoard=function(canvasContext)
{
    canvasContext.save()
    canvasContext.scale(.5, .25);
    canvasContext.imageSmoothingEnabled = false;
    canvasContext.drawImage(scoreBoard.boardImage, 0, 0, scoreBoard.boardImage.naturalWidth, scoreBoard.boardImage.naturalHeight, scoreBoard.position.x+105, scoreBoard.position.y+115, scoreBoard.boardImage.naturalWidth , scoreBoard.boardImage.naturalHeight )
    canvasContext.restore();
    scoreBoard.getBordToCenter();
    canvasContext.imageSmoothingEnabled = true;
    scoreBoard.currentScoreImages().forEach((number, index) => {
        canvasContext.drawImage(number, 0, 0, number.naturalWidth, number.naturalHeight, scoreBoard.position.x + 20 + number.naturalWidth * index, scoreBoard.position.y + 18, number.naturalWidth * 0.7, number.naturalHeight * 0.5)
    })
    scoreBoard.getNumbersImages(scoreBoard.bestScore).forEach((number, index) => {
        canvasContext.drawImage(number, 0, 0, number.naturalWidth, number.naturalHeight, scoreBoard.position.x + 20 + number.naturalWidth * index, scoreBoard.position.y + 38, number.naturalWidth * 0.7, number.naturalHeight * 0.5)
    })
}
let blinkCanvas = function (cx)
{
    cx.fillStyle = "#000000";
    cx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
        let blinkAnimate=setTimeout(()=> { cx.fillStyle="#ffffff"
            cx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
              }, 70)
} 





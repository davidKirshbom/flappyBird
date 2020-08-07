function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
window.addEventListener("keypress", (event) => {

    if (!gameState.gameOver && event.code === "Space") {
        clickHandler();
    }
    else if (gameState.gameOver&&scoreBoard.visible)
        restartButton.restart();
    event.preventDefault();
})
gameCanvas.addEventListener("click", (event) => {
    if (gameState.gameOver === true && restartButton.isClick(getMousePos(gameCanvas, event))) {
        restartButton.restart()
    }
    else if (!gameState.gameOver)
        clickHandler();
    event.preventDefault();
})
let clickHandler = function () {
    if (bird.isWaiting)
        bird.isWaiting = false;
    bird.fly()
}


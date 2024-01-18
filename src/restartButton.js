let restartButton = {
  image: new Image(),
  isClick: function ({ x, y }) {
    if (
      this.clickPosition.x <= x &&
      this.clickPosition.x + this.clickSize.width >= x &&
      this.clickPosition.y <= y &&
      this.clickPosition.y + this.clickSize.height >= y
    )
      return true;
    else return false;
  },
  clickPosition: { x: 224, y: 369 },
  clickSize: { height: 80, width: 105 },
  initImage: function (size, position) {
    this.image.size = size;
    this.position = position;
  },
};
restartButton.image.src = "restartButton.png";
restartButton.restart = function () {
  bird.init();
  bird.wait();
  gameState.firstLostTuch = true;
  gameState.currentTubes = [];
  gameState.gameOver = false;
  scoreBoard.score = 0;
  scoreBoard.visible = false;
};

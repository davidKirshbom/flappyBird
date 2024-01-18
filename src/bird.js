let bird = {};

bird.init = function () {
  (this.size = { height: 18, width: 18 }),
    (this.positionX = gameCanvas.width / 2),
    (this.positionY = gameCanvas.height * 0.4),
    (this.Incline = 0),
    (this.fall = false),
    (this.image = new Image()),
    (this.image.src = bird.image.src = "/bird (1).png");
  this.jumpPower = 12;
};
bird.startFall = function (limitY) {
  this.fall = true;
  new Promise((resolve) => {
    let fall = setInterval(() => {
      if (this.fall == true) {
        if (this.Incline > -4.6) this.Incline -= 0.1;
        if (this.positionY + bird.size.height <= limitY - 2 && this.fall) {
          this.positionY += speed.fall;
        } else {
          this.fall = false;
          this.positionY = limitY - bird.size.height - 2;
          gameState.gameOver = true;
          if (this.Incline > 0) this.Incline = 0;
          clearInterval(fall);
          resolve();
        }
      } else {
        clearInterval(fall);
        resolve();
      }
    }, speed.bird);
  }).then();
};

bird.wait = function () {
  this.isWaiting = true;
  let limitButtomY = this.positionY + 10;
  let limitTopY = this.positionY - 10;
  let goUp = true;
  waitingAnimate = setInterval(() => {
    if (goUp) {
      this.positionY--;
      if (this.positionY < limitTopY) goUp = false;
    }
    if (!goUp) {
      this.positionY++;
      if (this.positionY > limitButtomY) goUp = true;
    }
    if (this.isWaiting == false) clearInterval(waitingAnimate);
  }, 25);
};
let jumpAnimate;
bird.fly = function () {
  clearInterval(jumpAnimate);
  this.fall = false;
  this.Incline = 0.9;
  let positionYBeforeJump = bird.positionY;
  this.positionY -= 8;
  new Promise((resolve) => {
    jumpAnimate = setInterval(() => {
      // if (!this.fall) {
      if (this.Incline < 1.1) this.Incline += 0.75;
      if (positionYBeforeJump - this.positionY < bird.jumpPower && !this.fall) {
        this.positionY -= 8;
      } else {
        //not startFall directly so its not start incline
        this.fall = true;
        this.positionY += speed.fall;
      }
      if (this.positionY > positionYBeforeJump) {
        this.startFall(field.position.y);
        clearInterval(jumpAnimate);
        resolve();
      }
    }, speed.bird);
  }).then();
};
bird.touch = function (tubesAlive) {
  let result = false;
  tubesAlive.forEach((tubesLine) => {
    if (
      tubesLine.buttomTube.position.x <= bird.positionX + bird.size.width &&
      bird.positionX + bird.size.width <=
        tubesLine.buttomTube.position.x + tubesLine.width
    ) {
      let isTuchingUpperTube =
        bird.positionY <
        tubesLine.upperTube.height + tubesLine.upperTube.position.y;
      let isTuchingButtomTube =
        bird.positionY + bird.size.height > tubesLine.buttomTube.position.y;
      if (isTuchingUpperTube || isTuchingButtomTube) {
        result = true;
      }
    }
  });
  return result;
};

class Tubes {
  constructor(positionX, spaceBetween, canvasHeight) {
    let upperTubeY = -50 - (Math.random() * canvasHeight) / 2;
    this.width = 30;
    this.spaceBetween = 100;
    this.upperTube = {
      height: canvasHeight,
      position: {
        x: positionX,
        y: upperTubeY,
      },
    };
    this.upperTube.image = new Image();
    this.upperTube.image.src = "../tube_upper_line.png";
    this.buttomTube = {
      height: canvasHeight,
      position: {
        x: positionX,
        y: spaceBetween + (upperTubeY + canvasHeight),
      },
    };
    this.buttomTube.image = new Image();
    this.buttomTube.image.src = "../tube_buttom_line.png";
  }
  move = function () {
    this.upperTube.position.x--;
    this.buttomTube.position.x--;
  };
}
function deleteUnSeenTubes(tubes) {
  return new Promise((resolve) => {
    for (let tubesLine of tubes) {
      if (tubesLine.buttomTube.position.x < -100) {
        gameState.currentTubes.shift();
      }
    }
    resolve();
  });
}

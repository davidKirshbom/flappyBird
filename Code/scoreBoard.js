let scoreBoard = {
    position: { x: gameCanvas.width * 0.50, y: gameCanvas.height*0.2 },
    score: 0,
    boardImage: new Image(),
    bestScore: 0,
    visible:false
}
scoreBoard.getBordToCenter = function ()
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
scoreBoard.setNumberImages = function ()
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
scoreBoard.boardImage.src = "../parts/FinishScoreBoard.png"
scoreBoard.setNumberImages();
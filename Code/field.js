let field = {
    image: new Image(),
    size: { height: 15, width: 482 },
    position: { x: 0, y: gameCanvas.height - 15 }
}
field.image.src = "../parts/buttom_field.png";
field.image.addEventListener("load", () => field.size.height = field.image.naturalHeight)


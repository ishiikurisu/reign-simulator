function GameView() {
    this.setup = () => {
        createCanvas(800, 600);
        background();
    }

    this.draw = () => {
        ellipse(mouseX, mouseY, 80, 80);
    }
}

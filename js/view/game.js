class GameView {
    constructor() { }

    setup() {
        createCanvas(800, 600);
        background(220);
    }

    draw(controller) {
        ellipse(mouseX, mouseY, 80, 80);
    }
}

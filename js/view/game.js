const BLACK = { r: 0, g: 0, b: 0 };
const BROWN = { r: 224, g: 236, b: 137 };
const GREEN = { r: 31, g: 168, b: 36 };
const BLUE = { r: 0, g: 36, b: 156 };

class GameView {
    constructor() {
        this.offset = {
            x: 30,
            y: 30
        };
        this.blockSize = 10;
    }

    setup() {
        document.getElementById('content').outerHTML = '';
        createCanvas(windowWidth, windowHeight);
    }

    drawWorld(map) {
        rectMode(CORNER);
        noStroke();
        for (var j = 0; j < map.length; j++) {
            let xLength = map[j].length;
            for (var i = 0; i < xLength; i++) {
                let block = map[j][i];
                let r = block[0];
                let g = block[1];
                let b = block[2];
                let x = this.offset.x + (i * this.blockSize);
                let y = this.offset.y + (j * this.blockSize);
                let s = this.blockSize;

                fill(r, g, b);
                square(x, y, s);
            }
        }
    }

    drawHud() {

    }

    draw(controller) {
        background(BLACK.r, BLACK.g, BLACK.b);
        this.drawWorld(controller.getWorld());
        this.drawHud();
    }
}

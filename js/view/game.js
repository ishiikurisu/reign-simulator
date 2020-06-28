const BLACK = { r: 0, g: 0, b: 0 };
const BROWN = { r: 224, g: 236, b: 137 };
const GREEN = { r: 31, g: 168, b: 36 };
const BLUE = { r: 0, g: 36, b: 156 };
const RED = { r: 255, g: 0, b: 0 };

class GameView {
    constructor() {
        this.offset = {
            x: 30,
            y: 30
        };
        this.blockSize = 10;
        this.selectedBlock = null;
    }

    setup() {
        document.getElementById('content').outerHTML = '';
        createCanvas(windowWidth, windowHeight);
    }

    toggleBlock(controller) {
        if (!!this.selectedBlock) {
            this.selectedBlock = null;
        } else {
            let x = Math.floor((mouseX - this.offset.x) / this.blockSize);
            let y = Math.floor((mouseY - this.offset.y) / this.blockSize);
            let dim = controller.getWorldDimensions();
            if (x >= 0 && x < dim.x && y >= 0 && y < dim.y) {
                this.selectedBlock = { x: x, y: y };
            }
        }
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

                if (this.selectedBlock && this.selectedBlock.x === i && this.selectedBlock.y === j) {
                    r = RED.r;
                    g = RED.g;
                    b = RED.b;
                }

                fill(r, g, b);
                square(x, y, s);
            }
        }
    }

    drawHud() {
        // TODO Draw HUD
    }

    draw(controller) {
        background(BLACK.r, BLACK.g, BLACK.b);
        this.drawWorld(controller.getWorld());
        this.drawHud();
    }
}

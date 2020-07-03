const BLACK = { r: 0, g: 0, b: 0 };
const BROWN = { r: 224, g: 236, b: 137 };
const GREEN = { r: 31, g: 168, b: 36 };
const BLUE = { r: 0, g: 36, b: 156 };
const RED = { r: 255, g: 0, b: 0 };
const KIND_TO_COLOR = {
    sea: BLUE,
    mountain: BROWN,
    grass: GREEN,
    forest: RED
}

class GameView {
    constructor(map) {
        // TODO set offset to be any green region
        this.offset = { x: 30, y: 30 };
        this.blockSize = 10;
        this.selectedBlock = null;
        this.map = map;
        this.worldDimensions = {
            x: this.map[0].length,
            y: this.map.length
        }
        this.menuOption = null;
    }

    setup() {
        document.getElementById('content').outerHTML = '';
        createCanvas(windowWidth, windowHeight);
    }

    /* #########################
       # INTERACTION FUNCTIONS #
       ######################### */

    toggleBlock() {
        if (!!this.selectedBlock) {
            this.selectedBlock = null;
            removeElements();
            // <patch to remove all buttons correctly>
            let elements = document.querySelectorAll("button");
            let limit = elements.length;
            for (var i = 0; i < limit; i++) {
                elements[i].outerHTML = "";
            }
            // </patch>
        } else {
            let x = Math.floor((mouseX - this.offset.x) / this.blockSize);
            let y = Math.floor((mouseY - this.offset.y) / this.blockSize);
            let dim = this.worldDimensions;
            if (x >= 0 && x < dim.x && y >= 0 && y < dim.y) {
                this.selectedBlock = { x: x, y: y };
            }

            this.drawBlockOptions();
        }
    }

    /* #####################
       # DRAWING FUNCTIONS #
       ##################### */

    /**
     * Draws world
     */
    drawWorld() {
        // Defining boundaries
        let minX = Math.max(0, (0 - this.offset.x) / this.blockSize);
        let minY = Math.max(0, (0 - this.offset.y) / this.blockSize);
        let maxX = Math.min(this.map[0].length, (windowWidth - this.offset.x) / this.blockSize);
        let maxY = Math.min(this.map.length, (windowHeight - this.offset.y) / this.blockSize);

        // Drawing map
        rectMode(CORNER);
        noStroke();
        for (var j = Math.floor(minY); j < maxY; j++) {
            for (var i = Math.floor(minX); i < maxX; i++) {
                let block = this.map[j][i];
                let r = block.color[0];
                let g = block.color[1];
                let b = block.color[2];
                let x = this.offset.x + (i * this.blockSize);
                let y = this.offset.y + (j * this.blockSize);
                let s = this.blockSize;

                if (!!this.selectedBlock && this.selectedBlock.x === i && this.selectedBlock.y === j) {
                    r = RED.r;
                    g = RED.g;
                    b = RED.b;
                }

                fill(r, g, b);
                square(x, y, s);

                // TODO Make selected block shine instead of being just red
            }
        }
    }

    /**
     * Draws options to interact with block
     */
    drawBlockOptions() {
        // Draw options to act on block
        var lineHeight = windowHeight * 0.81; // 81%
        var buttonWidth = windowWidth * 0.05; // 5%
        textSize(16);

        if (this.canBlockBeBuiltUpon()) {
            const optionsAndCallbacks = {
                'build house': () => {
                    removeElements();
                    console.log("building house");
                    // TODO add house on selected block
                },
                'build farm': () => {
                    removeElements();
                    console.log("building farm");
                    // TODO add farmland on selected block
                }
                // TODO expand this with other options
            };

            let widthStep = windowWidth * 0.15;
            Object.keys(optionsAndCallbacks).forEach((k, i) => {
                let button = createButton(k);
                button.position(buttonWidth, lineHeight);
                button.mousePressed(optionsAndCallbacks[k]);
                buttonWidth += widthStep;
            });
        }
        // TODO add button to destroy building
        else {
            removeElements();
        }
    }

    canBlockBeBuiltUpon() {
        if (!!this.selectedBlock) {
            let place = this.map[this.selectedBlock.y][this.selectedBlock.x];
            if (place.kind !== 'sea' && place.kind !== 'mountain' && place.kind !== 'forest') {
                return true;
            }
        }
        return false;
    }

    /**
     * Tells player about their resources, like population and money
     */
    drawResources() {
        // TODO tell player about their resources, like population and money
    }

    /**
     * Main draw function loop
     * @param controller the game controller (MVC sense)
     */
    draw(controller) {
        // IDEA only update drawing if a change happens
        background(BLACK.r, BLACK.g, BLACK.b);
        this.drawWorld();
        this.drawResources();
    }

    // TODO replace colors by images
}

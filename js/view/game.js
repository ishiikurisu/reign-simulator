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

class GameView extends BaseView {
    constructor(map) {
        super();
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
        this.ellapsedTime = 0;

        // loading images
        this.sprites = {
            'house': loadImage("/img/assets/house.png"),
            'farm': loadImage("/img/assets/farm.png")
        };
    }

    setup() {
        document.getElementById('content').outerHTML = '';
        createCanvas(windowWidth, windowHeight);
    }

    /* #########################
       # INTERACTION FUNCTIONS #
       ######################### */

    toggleBlock(controller) {
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

            this.drawBlockOptions(controller);
        }
    }

    /* ###################
       # INPUT FUNCTIONS #
       ################### */

    mouseReleased(controller) {
        this.toggleBlock(controller);
    }

    moveMap() {
        if (keyIsDown(87)) { // w
            this.offset.y += 5;
        }
        if (keyIsDown(65)) { // a
            this.offset.x += 5;
        }
        if (keyIsDown(83)) { // s
            this.offset.y -= 5;
        }
        if (keyIsDown(68)) { // d
            this.offset.x -= 5;
        }
    }

    keyPressed() {
        switch (keyCode) {
            case 81: // q
                this.blockSize++;
                break;
            case 69: // e
                if (this.blockSize > 2) {
                    this.blockSize--;
                }
                break;
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

                fill(r, g, b);
                square(x, y, s);
            }
        }
    }

    /**
     * Draws options to interact with block
     * @param controller the game controller (MVC sense)
     */
    drawBlockOptions(controller) {
        var lineHeight = windowHeight * 0.81; // 81%
        var buttonWidth = windowWidth * 0.05; // 5%
        textSize(16);

        if (this.canBlockBeBuiltUpon()) {
            const optionsAndCallbacks = {
                'build house': () => {
                    removeElements();
                    controller.build(
                        'house',
                        this.selectedBlock,
                        { },
                        (w, s, i) => {
                           // console.log(w, s, i);
                        }
                    );
                },
                'build farm': () => {
                    removeElements();
                    controller.build(
                        'farm',
                        this.selectedBlock,
                        { },
                        (w, s, i) => {
                            // console.log("I am a farm");
                        }
                    );
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
     * Draws human constructions on world
     * @param controller the game controller (MVC sense)
     */
    drawSociety(controller) {
        let limit = controller.society.length;

        for (var i = 0; i < limit; i++) {
            let building = controller.society[i];
            let sprite = this.sprites[building.what];
            let x = this.offset.x + (building.where.x * this.blockSize);
            let y = this.offset.y + (building.where.y * this.blockSize);
            // TODO only draw block if it's visible in canvas
            image(sprite, x, y, this.blockSize, this.blockSize);
        }
    }

    /**
     * Highlights selected block to facilitate its visualization
     */
    highlightSelectedBlock() {
        if (!!this.selectedBlock) {
            let x = this.offset.x + (this.selectedBlock.x * this.blockSize);
            let y = this.offset.y + (this.selectedBlock.y * this.blockSize);
            let s = this.blockSize;
            let r = RED.r;
            let g = RED.g;
            let b = RED.b;
            let a = 250 * (0.5 + 0.5 * Math.sin(2 * Math.PI * this.ellapsedTime / 1000));
            fill(r, g, b, a);
            square(x, y, s);
        }
    }

    /**
     * Highlights selected block to facilitate its visualization
     */
    highlightSelectedBlock() {
        if (!!this.selectedBlock) {
            let x = this.offset.x + (this.selectedBlock.x * this.blockSize);
            let y = this.offset.y + (this.selectedBlock.y * this.blockSize);
            let s = this.blockSize;
            let r = RED.r;
            let g = RED.g;
            let b = RED.b;
            let a = 250 * (0.5 + 0.5 * Math.sin(2 * Math.PI * this.ellapsedTime / 1000));
            fill(r, g, b, a);
            square(x, y, s);
        }
    }

    /**
     * Main draw function loop
     * @param controller the game controller (MVC sense)
     */
    draw(controller) {
        // IDEA only update drawing if a change happens
        background(BLACK.r, BLACK.g, BLACK.b);
        this.drawWorld();
        this.drawSociety(controller);
        this.highlightSelectedBlock();
        this.drawResources();
        this.ellapsedTime += deltaTime;
    }

    // TODO replace colors by images
    // TODO Zoom in and out of the middle of the screen instead of making blocks larger
}

class GameController extends BaseController {
    constructor(startMode, saveData) {
        super();
        gorun();
        this.view = new GameView();
        this.map = null;
        this.actions = [ ];
        if (startMode === "new game") {
            this.rawData = saveData;
        } else {
            this.map = JSON.parse(saveData);
        }
    }

    setup() {
        if (!!this.rawData) {
            // TODO Create controller for loading screen
            const head = "data:image/png;base64,"
            const pngData = (this.rawData.includes(head))
                ? this.rawData.substring(head.length)
                : this.rawData;
            this.map = loadMap(pngData);
            localStorage.setItem('map', JSON.stringify(this.map));
            this.rawData = undefined;
        }
        this.view.setup();
    }

    /* BRIDGE FUNCTIONS */
    getWorld() {
        return this.map;
    }

    getWorldDimensions() {
        return {
            x: this.map[0].length,
            y: this.map.length
        }
    }

    /* PLAYER CONTROLS */
    mouseReleased() {
        this.view.toggleBlock(this);
    }

    update() {
        if (keyIsDown(87)) { // w
            this.view.offset.y += 5;
        }
        if (keyIsDown(65)) { // a
            this.view.offset.x += 5;
        }
        if (keyIsDown(83)) { // s
            this.view.offset.y -= 5;
        }
        if (keyIsDown(68)) { // d
            this.view.offset.x -= 5;
        }
    }

    keyPressed() {
        switch (keyCode) {
            case 81: // q
                this.view.blockSize++;
                break;
            case 69: // e
                this.view.blockSize--;
                break;
        }
    }

    // TODO Add controls to build stuff on map
    // TODO Simulate society
}

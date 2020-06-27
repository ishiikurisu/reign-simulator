class GameController {
    constructor(startMode, saveData) {
        gorun();
        this.view = new GameView();
        this.map = null;
        this.rawData = saveData;
    }

    setup() {
        const head = "data:image/png;base64,"
        const pngData = (this.rawData.includes(head))? this.rawData.substring(head.length) : this.rawData;
        this.map = loadMap(pngData);
        // TODO Store map on local storage
        this.view.setup();
    }

    update() {
        // TODO Move map around
        // TODO Select blocks
    }

    draw() {
        this.view.draw(this);
    }

    /* BRIDGE FUNCTIONS */
    getWorld() {
        return this.map;
    }
}

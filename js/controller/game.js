class GameController {
    constructor(startMode, saveData) {
        gorun();
        this.view = new GameView();
        this.map = null;
        switch (startMode) {
            case 'new game':
                this.rawData = saveData;
                break;
            case 'load game':
                this.map = JSON.parse(saveData);
                break;
        }
    }

    setup() {
        if (!this.map) {
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

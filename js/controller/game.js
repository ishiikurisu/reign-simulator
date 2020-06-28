class GameController extends BaseController {
    constructor(startMode, saveData) {
        super();
        gorun();
        this.view = new GameView();
        this.map = null;
        this.actions = [ ];
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

    mouseReleased() {
        this.view.toggleBlock(this);
    }
}

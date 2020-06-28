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

    // TODO Add controls to move map around
    // TODO Add controls to zoom in/out of map
    // TODO Add controls to build stuff on map
    // TODO Simulate society
}

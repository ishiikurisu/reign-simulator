class LoadGameController extends BaseController {
    constructor(gameMode, saveData) {
        super();
        gorun();
        this.view = new LoadGameView();
        this.gameMode = gameMode;
        this.saveData = saveData;
    }

    setup() {
        this.view.draw(this);
        this.loadMap(this.gameMode, this.saveData).then(map => {
            CONTROLLER = new GameController(map);
            CONTROLLER.setup();
        });
    }

    draw() { }

    // TODO Move this to a web worker
    async loadMap(gameMode, saveData) {
        let map = saveData;

        if (this.gameMode === 'new game') {
            const head = "data:image/png;base64,"
            const pngData = (saveData.includes(head))
                            ? saveData.substring(head.length)
                            : saveData;
            map = loadMap(pngData);
        }

        return map;
    }
}

class LoadGameController extends BaseController {
    constructor(gameMode, saveData) {
        super();
        this.view = new LoadGameView();
        this.gameMode = gameMode;
        this.saveData = saveData;
        this.worker = new Worker("/js/workers/load_game.js");
        this.worker.onmessage = function(result) {
            let map = result.data.map;
            CONTROLLER = new GameController(map);
            CONTROLLER.setup();
        }
    }

    setup() {
        this.view.draw(this);
        this.worker.postMessage({
            gameMode: this.gameMode,
            saveData: this.saveData
        })
    }

    update() { }

    draw() { }
}

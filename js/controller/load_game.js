class LoadGameController extends BaseController {
    constructor(gameMode, mapData, societyData) {
        super();
        this.view = new LoadGameView();
        this.gameMode = gameMode;
        this.mapData = mapData;
        this.societyData = societyData;
        this.worker = new Worker("/js/workers/load_game.js");
        this.worker.onmessage = function(result) {
            let map = result.data.map;
            let society = result.data.society;
            CONTROLLER = new GameController(map, society);
            CONTROLLER.setup();
        }
    }

    setup() {
        this.view.draw(this);
        this.worker.postMessage({
            gameMode: this.gameMode,
            mapData: this.mapData,
            societyData: this.societyData
        })
    }

    update() { }

    draw() { }
}

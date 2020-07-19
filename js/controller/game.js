class GameController extends BaseController {
    constructor(map, society) {
        super();
        gorun();
        this.view = new GameView(map);
        this.map = null;
        this.actions = [ ];
        this.storage = new Storage();
        this.map = map;
        this.society = society;
    }

    setup() {
        this.storage.saveMap(this.map);
        this.storage.saveSociety(this.society);
        this.view.setup();
        this.tickerIntervalId = setInterval(CONTROLLER.tick, 1000);
    }

    tick() {
        CONTROLLER.society = tick(CONTROLLER.map, CONTROLLER.society);
    }

    /* ####################
       # ACTIONS FUNCTIONS #
       #################### */

    build(what, where, memory) {
        this.society.push({
            what: what,
            where: where,
            memory: memory
        });
        this.storage.saveSociety(this.society);
    }

    update() {
        this.view.moveMap();
    }

    // TODO Enable gameplay from touch interface
}

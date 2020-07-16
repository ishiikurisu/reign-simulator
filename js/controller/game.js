class GameController extends BaseController {
    constructor(map) {
        super();
        gorun();
        this.view = new GameView(map);
        this.map = null;
        this.actions = [ ];
        this.map = map;
        // TODO store and load society from memory
        this.society = [ ];
    }

    setup() {
        // TODO compress this map to prevent quota exceptions
        localStorage.setItem('map', JSON.stringify(this.map));
        this.view.setup();
        this.tickerIntervalId = setInterval(CONTROLLER.tick, 1000);
    }

    tick() {
        CONTROLLER.society = tick(CONTROLLER.map, CONTROLLER.society);
    }

    /* ####################
       # ACTIONS FUNCTIONS #
       #################### */

    build(what, where, memory, script) {
        this.society.push({
            what: what,
            where: where,
            memory: memory,
            script: script
        });
    }

    update() {
        this.view.moveMap();
    }

    // TODO Enable gameplay from touch interface
}

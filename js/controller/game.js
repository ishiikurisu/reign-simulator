class GameController extends BaseController {
    constructor(map) {
        super();
        this.view = new GameView(map);
        this.map = null;
        this.actions = [ ];
        this.map = map;
        // TODO store and load society from memory
        this.society = [ ];
    }

    setup() {
        // TODO compress this map to prevent quota exceptions
        // localStorage.setItem('map', this.map);
        this.view.setup();
    }

    /* ####################
       # ACTIONS FUNCTIONS #
       #################### */

    build(what, where) {
        this.society.push({what: what, where: where});
    }

    update() {
        this.view.moveMap();
    }

    // TODO Simulate society
    // TODO Enable gameplay from touch interface
}

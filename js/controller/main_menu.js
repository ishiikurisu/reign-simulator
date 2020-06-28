class MainMenuController extends BaseController {
    constructor() {
        super();
        this.view = new MainMenuView();
    }

    setup() {
        this.view.draw(this);
    }

    draw() { }

    newGame(mapData) {
        CONTROLLER = new GameController('new game', mapData);
        CONTROLLER.setup();
    }
}

class MainMenuController {
    constructor() {
        this.view = new MainMenuView();
    }

    setup() {
        this.view.draw(this);
    }

    update() { }

    draw() { }

    newGame(mapData) {
        CONTROLLER = new GameController('new_game', mapData);
        CONTROLLER.setup();
    }
}

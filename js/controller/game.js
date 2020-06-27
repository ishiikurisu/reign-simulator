function GameController(start_mode, save_data) {
    this.view = new GameView();
    this.map = loadMap(save_data);

    this.setup = () => {
        gorun();
        this.view.setup();
    }

    this.update = () => { }

    this.draw = () => {
        this.view.draw(this);
    }
}

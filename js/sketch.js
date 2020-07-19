function setup() {
    var storage = new Storage();;
    if (storage.isMapStored()) {
        CONTROLLER = new LoadGameController(
            'load game',
            storage.loadMap(),
            storage.loadSociety()
        );
    } else {
        CONTROLLER = new MainMenuController();
    }
    CONTROLLER.setup();
}

function draw() {
    CONTROLLER.update();
    CONTROLLER.draw();
}

function mouseReleased() {
    CONTROLLER.mouseReleased();
}

function keyPressed() {
    CONTROLLER.keyPressed();
}

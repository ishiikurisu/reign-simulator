function setup() {
    var storedMap = localStorage.getItem('map');
    if (!!storedMap) {
        CONTROLLER = new GameController('load game', storedMap);
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

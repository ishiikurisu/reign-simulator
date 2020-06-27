function setup() {
    CONTROLLER = new MainMenuController();
    CONTROLLER.setup();
}

function draw() {
    CONTROLLER.update();
    CONTROLLER.draw();
}

class GameController extends BaseController {
    constructor(map) {
        super();
        this.view = new GameView(map);
        this.map = null;
        this.actions = [ ];
        this.map = map;
    }

    setup() {
        localStorage.setItem('map', JSON.stringify(this.map));
        this.view.setup();
    }

    /* PLAYER CONTROLS */
    mouseReleased() {
        this.view.toggleBlock();
    }

    update() {
        if (keyIsDown(87)) { // w
            this.view.offset.y += this.view.blockSize / 2;
        }
        if (keyIsDown(65)) { // a
            this.view.offset.x += this.view.blockSize / 2;
        }
        if (keyIsDown(83)) { // s
            this.view.offset.y -= this.view.blockSize / 2;
        }
        if (keyIsDown(68)) { // d
            this.view.offset.x -= this.view.blockSize / 2;
        }
    }

    keyPressed() {
        switch (keyCode) {
            case 81: // q
                this.view.blockSize++;
                break;
            case 69: // e
                if (this.view.blockSize > 2) {
                    this.view.blockSize--;
                }
                break;
        }
    }

    // TODO Add controls to build stuff on map
    // TODO Simulate society
    // TODO Enable gameplay from touch interface
}

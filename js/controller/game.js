class GameController extends BaseController {
    constructor(map) {
        super();
        this.view = new GameView();
        this.map = null;
        this.actions = [ ];
        console.log(map);
        this.map = map;
    }

    setup() {
        // localStorage.setItem('map', JSON.stringiy(this.map));
        this.view.setup();
    }

    /* BRIDGE FUNCTIONS */
    getWorld() {
        return this.map;
    }

    getWorldDimensions() {
        return {
            x: this.map[0].length,
            y: this.map.length
        }
    }

    /* PLAYER CONTROLS */
    mouseReleased() {
        this.view.toggleBlock(this);
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

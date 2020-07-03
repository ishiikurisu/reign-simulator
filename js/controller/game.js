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
        localStorage.setItem('map', JSON.stringify(this.map));
        this.view.setup();
    }

    /* ####################
       # ACTIONS FUNCTIONS #
       #################### */

    build(what, where) {
        this.society.push({what: what, where: where});
    }

    /* ############################
       # PLAYER ACTIONS FUNCTIONS #
       ############################ */
    // TODO Move these player action functions to the view

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

    // TODO Simulate society
    // TODO Enable gameplay from touch interface
}

class BaseController {
    constructor() { }

    setup() { }

    update() { }

    mouseReleased() { 
        this.view.mouseReleased(this);
    }

    keyPressed() { 
        this.view.keyPressed(this);
    }

    draw() {
        this.view.draw(this);
    }
}

class GameController {
    constructor(startMode, saveData) {
        gorun();
        this.view = new GameView();
        this.map = null;
        this.rawData = saveData;
    }

    setup() {
        const head = "data:image/png;base64,"
        const pngData = (this.rawData.includes(head))? this.rawData.substring(head.length): this.rawData;
        this.map = loadMap(pngData);
        this.view.setup();
    }

    update() { }

    draw() {
        this.view.draw(this);
        if (mouseIsPressed) {
            console.log(this.map);
        }
    }
}

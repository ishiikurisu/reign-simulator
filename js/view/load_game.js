const LOAD_GAME_HTML = `
    <h1>Now Loading...</h1>
`;

class LoadGameView {
    constructor() { }

    draw(controller, message) {
        document.getElementById('content').innerHTML = LOAD_GAME_HTML;
    }
}

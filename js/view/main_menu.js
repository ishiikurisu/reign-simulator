const MAIN_MENU_HTML = `
    <h1>Welcome to Reign</h1>
    <input id="map-file-name" type="file"></input>
    <button id="button-start">Start</button>
`;

class MainMenuView extends BaseView {
    constructor() { 
        super();
    }

    draw(controller) {
        const clearScreen = this.clearScreen;

        document.getElementById('content').innerHTML = MAIN_MENU_HTML;
        document.getElementById('button-start').addEventListener('click', function(e) {
            var reader = new FileReader();
            reader.onload = () => {
                controller.newGame(reader.result);
            }
            reader.readAsDataURL(document.getElementById("map-file-name").files[0]);
        });
    }
}

class MainMenuView {
    constructor() {
        this.MAIN_MENU_HTML = `
            <h1>Welcome to Reign</h1>
            <input id="map-file-name" type="file"></input>
            <button id="button-start">Start</button>
        `;
    }

    clearScreen() {
        document.getElementById('content').innerHTML = "";
    }

    draw(controller) {
        const clearScreen = this.clearScreen;
        document.getElementById('content').innerHTML = this.MAIN_MENU_HTML;
        document.getElementById('button-start').addEventListener('click', function(e) {
            var reader = new FileReader();
            reader.onload = () => {
                clearScreen();
                controller.newGame(reader.result);
            }
            reader.readAsDataURL(document.getElementById("map-file-name").files[0]);
        });
    }
}

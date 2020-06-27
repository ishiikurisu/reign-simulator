function MainMenuView() {
    this.MAIN_MENU_HTML = `
        <h1>Welcome to Reign</h1>
        <input id="map-file-name" type="file"></input>
        <button id="button-start">Start</button>
    `;

    var clearScreen = () => {
        document.getElementById('content').innerHTML = "";
    }

    this.draw = controller => {
        document.getElementById('content').innerHTML = this.MAIN_MENU_HTML;
        document.getElementById('button-start').addEventListener('click', function(e) {

            var reader = new FileReader();
            reader.onload = () => {
                clearScreen();
                CONTROLLER = new GameController('new_game', reader.result);
                CONTROLLER.setup();
            }
            reader.readAsDataURL(document.getElementById("map-file-name").files[0]);
        });
    }
}

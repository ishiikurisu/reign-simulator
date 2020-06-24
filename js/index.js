const MAIN_MENU_HTML = `
    <h1>Welcome to Reign</h1>
    <input id="map-file-name" type="file"></input>
    <button id="button-start">Start</button>
`;

function main() {
    document.getElementById('content').innerHTML = MAIN_MENU_HTML;
    document.getElementById('button-start').addEventListener('click', function(e) {
        gorun();
        var reader = new FileReader();
        reader.onload = function () {
            // TODO send reader.result to new_game_setup
            console.log(reader.result);
            // var mapFileName = document.getElementById("map-file-name").value;
            // new_game_setup(mapFileName);
        };
        reader.readAsDataURL(document.getElementById("map-file-name").files[0]);
    });
}

function waitForInit(f) {
    if (typeof inst !== 'undefined') {
        f();
    } else {
        setTimeout(() => waitForInit(f), 250);
    }
}

function waitForGoRun(f) {
    if (typeof loadMap !== 'undefined') {
        f();
    } else {
        setTimeout(() => waitForGoRun(f), 250);
    }
}

onmessage = function(message) {
    importScripts('/js/wasm_exec.js');
    importScripts('/js/wasm_setup.js');
    importScripts('/js/model/storage.js');

    waitForInit(() => {
        gorun();
        waitForGoRun(() => {
            let storage = new Storage();
            let mapData = message.data.mapData;
            let societyData = message.data.societyData;
            let gameMode = message.data.gameMode;
            let map = null;
            let society = null;

            if (gameMode === 'new game') {
                const head = "data:image/png;base64,"
                const pngData = (mapData.includes(head))
                                ? mapData.substring(head.length)
                                : mapData;
                map = loadMap(pngData);
                society = [ ];
            } else {
                map = mapData;
                society = societyData;
            }

            postMessage({
                map: map,
                society: society
            });
        });
    });
}

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

    waitForInit(() => {
        gorun();
        waitForGoRun(() => {
            let saveData = message.data.saveData;
            let gameMode = message.data.gameMode;
            let map = null;

            if (gameMode === 'new game') {
                const head = "data:image/png;base64,"
                const pngData = (saveData.includes(head))
                                ? saveData.substring(head.length)
                                : saveData;
                map = loadMap(pngData);
            } else {
                map = JSON.parse(saveData);
            }

            postMessage({
                map: map
            });
        });
    });
}

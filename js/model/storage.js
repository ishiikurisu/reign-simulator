class Storage {
    initialize() { }

    isMapStored() {
        return !!localStorage.getItem("mapFlag");
    }

    saveMap(map) {
        localStorage.setItem("map", lzw_encode(JSON.stringify(map)));
        localStorage.setItem("mapFlag", true);
    }

    loadMap() {
        return JSON.parse(lzw_decode(localStorage.getItem("map")));
    }

    saveSociety(society) {
        localStorage.setItem("society", lzw_encode(JSON.stringify(society)));
    }

    loadSociety() {
        return JSON.parse(lzw_decode(localStorage.getItem("society")));
    }
}

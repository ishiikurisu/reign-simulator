class Storage {
    initialize() { }

    isMapStored() {
        return !!localStorage.getItem("mapFlag");
    }

    saveMap(map) {
        // TODO compress map data
        localStorage.setItem("map", JSON.stringify(map));
        localStorage.setItem("mapFlag", true);
    }

    loadMap() {
        return JSON.parse(localStorage.getItem("map"));
    }

    saveSociety(society) {
        // TODO compress society data
        localStorage.setItem("society", JSON.stringify(society));
    }

    loadSociety() {
        return JSON.parse(localStorage.getItem("society"));
    }
}

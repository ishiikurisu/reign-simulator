package main

import (
    "fmt"
    "syscall/js"
    "encoding/base64"
    "maps"
)

func exportWorld(inlet [][]maps.Block) [][]map[string]interface{} {
    limitX := len(inlet)
    limitY := len(inlet[0])
    outlet := make([][]map[string]interface{}, limitX)
    for i := 0; i < limitX; i++ {
        outlet[i] = make([]map[string]interface{}, limitY)
        for j := 0; j < limitY; j++ {
            outlet[i][j] = inlet[i][j].ToMap()
        }
    }
    return outlet
}

func loadMap(this js.Value, i []js.Value) interface{} {
    encodedPngFromBrowser := i[0].String()
    pngFromBrowser, oops := base64.StdEncoding.DecodeString(encodedPngFromBrowser)
    if oops != nil {
        return oops
    }
    binaryWorld := maps.Png2Map(pngFromBrowser)
    gomapWorld := exportWorld(binaryWorld)
    return ValueOf(gomapWorld)
}

func registerCallbacks() {
    js.Global().Set("loadMap", js.FuncOf(loadMap))
}

func main() {
    c := make(chan struct{}, 0)
    fmt.Println("WASM Go Initialized")
    registerCallbacks()
    <-c
}

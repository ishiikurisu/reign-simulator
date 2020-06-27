package main

import (
    "fmt"
    "syscall/js"
    "encoding/base64"
    "maps"
)

func loadMap(this js.Value, i []js.Value) interface{} {
    encodedPngFromBrowser := i[0].String()
    pngFromBrowser, oops := base64.StdEncoding.DecodeString(encodedPngFromBrowser)
    if oops != nil {
        return oops
    }
    world := maps.Png2Map(pngFromBrowser)
    return ValueOf(world)
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

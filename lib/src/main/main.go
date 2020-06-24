package main

import (
    "fmt"
    "syscall/js"
    "io/ioutil"
    "maps"
)

func loadMap(this js.Value, i []js.Value) interface{} {
    fileName := i[0].String()
    fileBytes, oops := ioutil.ReadFile(fileName)
    if oops != nil {
        return oops
    }
    return js.ValueOf(fileBytes)
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

package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Starting server...")
	go func() {
                fmt.Println("Serving at 8000")
		log.Fatal(http.ListenAndServe(":8000", http.FileServer(http.Dir("."))))
	}()
	fmt.Scanf("\n")
}

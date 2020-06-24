default: build

build:
	cd lib; make

install: build # deps
	mv lib/lib.wasm js

deps:
	cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

start: install
	go run server.go

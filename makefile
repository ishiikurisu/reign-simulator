default: build

build:
	cd lib; make

install:
	# cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
	mv lib/lib.wasm js


start: install
	go run server.go

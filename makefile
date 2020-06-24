default: build

build: build-go

build-go:
	cd lib; make
	mv lib/lib.wasm js

deps:
	cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .

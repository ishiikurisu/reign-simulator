default: build

build:
	cd lib; make

install:
	# cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
	mv lib/lib.wasm js

start: install
	go run server.go

utils: color-correction

color-correction:
	cd lib; make color-correction
	mv lib/*.exe .
	./color-correction.exe img/test.png img/corrected-test.png
	./color-correction.exe img/reign.png img/corrected-reign.png

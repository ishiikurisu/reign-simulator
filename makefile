default: build

build:
	cd .golang; make

install:
	# cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
	mv .golang/lib.wasm js

start: install
	go run server.go

utils: color-correction

color-correction:
	cd .golang; make color-correction
	mv .golang/*.exe .
	./color-correction.exe img/test.png img/corrected-test.png
	./color-correction.exe img/reign.png img/corrected-reign.png

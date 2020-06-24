package maps

import (
	"testing"
	"io/ioutil"
	"encoding/base64"
)

// TODO Generate expected matrix
func generateTestMatrix() [][]int {
	return nil
}

func compareMatrixes(a, b [][]int) bool {
	// TODO Compare matrixes
	return false
}

func generateBrowserPng() string {
	return "iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAIAAAB+RarbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUoSURBVGhDzZpbktw0FIZbnuHyznvDA4vgaXghgY0AWwhVhEoIVUCFFSTZSAIvDCthNkFRzFj8R+dI1s2yLUue+cbjlt1uW5+Obna3On365rSPj3/6hRNaq5NWahjNhjopbXYfzZ9ffC2pHIO8tkApLba0cT+24PM/Xksqx15hF95q9GiXu2ZlVHDeVaU32eo7SeCaGbRGDQkSOVRVgPxK3rJKrwE65j/BSc7bAq4LW/EDflyEx1vjUtKJuX5c6n5Aubn6uCC3F9amg5YND6nSM8KLbmUWzXsKezVWefUzFd4pmcLauJC64B0TvYQRXvxNjMpdW4/6+vE3stGNRefOndag4cnLAbYesyNca+EREc5c7FhbakuuM7/75wNJGeqF8/UZjTYZV462BV6hD+//i7Vrw0eMw1fvXkmqPzJQ20KfZjuW1sLZScV942tXCs9OOaL6TP5HFMHV29e0vLOjsSn37JysfliKnGU4QqflO9OFeRO99Lcm0RI335hiGHUgtrSvv2w9DoswVpAMnPmf9uzvva5+n7oDf1YDMvHkHJn1X1+1ED4/e6kupWwnYQeb+3vU6fpRjbPv6RPM5CDslzVmfJjjGoZLWnNH3TrCJhXgNoN41GKVovAyMqt1GRkDYQDnPsMSX9hP+KzfmaCGAapZWwLncKfRw+n2Qyode3C3qSXO7zKU5gxi2ezyzqL2rOcEdMSITvQeTTki+kSYM8a5jzKZzbTznFEqRTUA7Zj6Lo3wztBHGCB7LouUlmSeggx6npl39YibEotJlq/CY1g3YeDiVqyoZdBoJWUxfsR8MQUfUSoYr3oKDzZDi7WRSyQplzS25LkAPjIdA1vlsmHoKQxypqY90hsuISXCa6skb1kkqnMEx8pGFFums7DD5HUy9Hz8nUToycSqvJn1x6fp+wBU+ORGydBfmPMfWSVM7xbC6OCDZ0+ISZA8SIzqMzgowmVbRo5ZcWSRfHn9/f0TLJ989lHLh3jT7DKCOtRVGlHVdZ8qtd5Z6LM3T5/wBkBuMdlqdnvI5J1rhTdCl8A/ThF5SsrMLpsJo8JIqhHnFz9LynLz9DtJWc7PJQ/qgtr+nCfT4G4pgq+RCfL2CKduzPmF0bBXuPkhLuXzj7/SC6ZnF/GYtFc4W6WZ2HmdcLY+e82YX8zakTwj5VtCGpYSut0tEbHeYuMs2wJK8iFI2CUtRqhmbR39hiWXLwFKi9oL2POlnus5YBzOaAPZ3g7bYl2nfdDEwxBkkJ1ZHvBOiykj+0RqgvoCSVZzmDDn1JhMS7qHF+OWZK3u9w4RR0Z4HQj2xvo+/mcf0q2gi7CJkeDSrja6RsgEtbSuaW/5VPcIu8y4dpomhHFLxgP8Mlugy8QDxHlPXBDYQDg8oNBcef7gs/gDD6bjTAtsEE7fytmmnhGL2l1nWhkNH2q3Wdtc5wwWbddTL6xvS31j0BWBpJXBlL7yoxfZQ7beL1Eg6RbZ1YJ6YXV5K6kV+L5UmaE6eoVinF2Tbi7p061KG8nIyCRnsLOofqpMvfDmO34Wsnep8Zhk6G0LOkaYcUGmgGPGfyHf1k/12eK+pN8EOmdeZHuJ7sLAqFFA+SaBH8dEpD+cW8N6T1d3jhAG8pTYhnW4rDTcTx/hpLpmgTMvzNXbteFi1ofXZ9dDPIxM52e/yUYf5rqxTbb+SXZFuDz3aEIqhj11sWX2PqYtzahRsYtD72E0i/ACD8AWqlGj6Bnh+2Ou5YO9wuBBORdUmQbC4CE4L6oSp9P/X2M3yOTeELMAAAAASUVORK5CYII="
}

func generateTestFileName() string {
	return "/home/cris/Documentos/Maker/reign/simulator/img/test.png"
}

func TestBrowserPngIsEqual(t *testing.T) {
	encodedPngFromBrowser := generateBrowserPng()
	pngFromBrowser, err := base64.StdEncoding.DecodeString(encodedPngFromBrowser)
	if err != nil {
		t.Error("Couldn't decode bytes from browser")
		return
	}

	fileName := generateTestFileName()
	pngFromFile, oops := ioutil.ReadFile(fileName)
	if oops != nil {
		t.Error("Couldn't load test image")
		return
	}

	if len(pngFromBrowser) != len(pngFromFile) {
		t.Error("bytes have different sizes")
		return
	}
	bytesSize := len(pngFromFile)
	for i := 0; i < bytesSize; i++ {
		if pngFromBrowser[i] != pngFromFile[i] {
			t.Error("Bytes from browser and from file are different")
			return
		}
	}
}

func TestLoadPngFromBrowser(t *testing.T) {
	pngFromBrowser := generateBrowserPng()
	decodedPng, err := base64.StdEncoding.DecodeString(pngFromBrowser)
	if err != nil {
		t.Error("Couldn't decode bytes from browser")
		return
	}
	resultMatrix := Png2Map(decodedPng)
	expectedMatrix := generateTestMatrix()
	if !compareMatrixes(expectedMatrix, resultMatrix) {
		t.Error("Couldn't load matrix from browser bytes")
		return
	}
}

func TestLoadPngFromFile(t *testing.T) {
	fileName := generateTestFileName()
	pngBytes, oops := ioutil.ReadFile(fileName)
	if oops != nil {
		t.Error("Couldn't load test image")
		return
	}
	resultMatrix := Png2Map(pngBytes)
	expectedMatrix := generateTestMatrix()
	if !compareMatrixes(expectedMatrix, resultMatrix) {
		t.Error("Couldn't load matrix from files")
		return
	}
}

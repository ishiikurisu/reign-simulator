package maps

import (
    "image/png"
    "bytes"
)

func Png2Map(bts []byte) [][]int {
    reader := bytes.NewReader(byteData)
    simage, oops := png.Decode(reader)
	
}

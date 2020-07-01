package maps

import (
    "image/png"
    "bytes"
)

func Png2Map(bts []byte) [][][]uint32 {
    reader := bytes.NewReader(bts)
    image, oops := png.Decode(reader)
    if oops != nil {
        return nil
    }
    rectangle := image.Bounds()
    fromPoint := rectangle.Min
    toPoint := rectangle.Max
    yLen := toPoint.Y - fromPoint.Y
    xLen := toPoint.X - fromPoint.X
    world := make([][][]uint32, yLen)

    for y := 0; y < yLen; y++ {
        world[y] = make([][]uint32, xLen)
        for x := 0; x < xLen; x++ {
            // TODO interpret colors
            r, g, b, _ := image.At(x, y).RGBA()
            q := []uint32 { r / 257, g / 257, b / 257 }
            world[y][x] = q
        }
    }

    return world
}

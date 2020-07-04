package maps

import (
    "image/png"
    "bytes"
    "image"
    "os"
    "image/color"
)

func Png2Map(bts []byte) [][]Block {
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
    world := make([][]Block, yLen)

    for y := 0; y < yLen; y++ {
        world[y] = make([]Block, xLen)
        for x := 0; x < xLen; x++ {
            r, g, b, _ := image.At(x, y).RGBA()
            q := []uint32 { r / 257, g / 257, b / 257 }
            block, _ := BlockFromColor(q)
            world[y][x] = block
        }
    }

    return world
}

func Map2Png(m [][]Block, outputFile string) {
    height := len(m)
    width := len(m[0])
    upLeft := image.Point{0, 0}
    lowRight := image.Point{width, height}
    img := image.NewRGBA(image.Rectangle{upLeft, lowRight})

    for x := 0; x < width; x++ {
        for y := 0; y < height; y++ {
            block := m[y][x]
            r := uint8(block.Color[0])
            g := uint8(block.Color[1])
            b := uint8(block.Color[2])
            c := color.RGBA{r, g, b, 0xff}
            img.Set(x, y, c)
        }
    }

    // TODO return bytes instead of storing directly to file
    fp, _ := os.Create(outputFile)
    png.Encode(fp, img)
}

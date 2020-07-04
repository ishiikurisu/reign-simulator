package main

import (
    "fmt"
    "os"
    "maps"
    "io/ioutil"
    "math"
)

func main() {
    args := os.Args[1:]
    inputFile := args[0]
    outputFile := args[1]

    png, oops := ioutil.ReadFile(inputFile)
    if oops != nil {
        fmt.Printf("ERROR LOADING FILE (%s)\n", inputFile)
        return
    }

    world := maps.Png2Map(png)
    correctedWorld := correct(world)
    maps.Map2Png(correctedWorld, outputFile)
}

func correct(inlet [][]maps.Block) [][]maps.Block {
    allowedColors := [][]uint32{
        []uint32{224, 236, 137},
        []uint32{31, 168, 36},
        []uint32{0, 36, 156},
        []uint32{0, 87, 63},
    }

    limitI := len(inlet)
    outlet := make([][]maps.Block, limitI)
    for i := 0; i < limitI; i++ {
        inletRow := inlet[i]
        limitJ := len(inletRow)
        outletRow := make([]maps.Block, limitJ)

        for j := 0; j < limitJ; j++ {
            inletBlock := inletRow[j]
            originalColor := inletBlock.Color
            minDiff := 2570.0
            correctedColorIndex := -1

            for c, color := range allowedColors {
                diff := 0.0

                for d := 0; d < len(color); d++ {
                    diff += math.Abs(float64(color[d]) - float64(originalColor[d]))
                }

                if diff < minDiff {
                    correctedColorIndex = c
                    minDiff = diff
                }
            }

            outletBlock := maps.Block{
                Kind: inletBlock.Kind,
                Color: allowedColors[correctedColorIndex],
            }
            outletRow[j] = outletBlock
        }

        outlet[i] = outletRow
    }

    return outlet
}

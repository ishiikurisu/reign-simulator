package maps

import "errors"

type Block struct {
    Color []uint32
    Kind string
}

func BlockFromColor(color []uint32) (Block, error) {
    colorsToKinds := map[uint32]string{
        0xe0ec89: "mountain",
        0x1fa824: "grass",
        0x00249c: "sea",
        0x00573f: "forest",
    }

    var r uint32 = color[0] << 0x10
    var g uint32 = color[1] << 0x8
    var b uint32 = color[2]
    var hex uint32 = r | g | b
    block := Block{
        Color: nil,
        Kind: "invalid",
    }
    oops := errors.New("Unknown color")

    if kind, ok := colorsToKinds[hex]; ok {
        block = Block{
            Color: color,
            Kind: kind,
        }
        oops = nil
    }

    return block, oops
}

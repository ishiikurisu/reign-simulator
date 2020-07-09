package maps

type Institution struct {
    What string
    Where []int
    Memory string
    Script string
}

// Updates the society `s` living on the world `m`
func Tick(m [][]Block, s []Institution) []Institution {
    // TODO shuffle society
    // TODO run scripts for institutions
    return s
}

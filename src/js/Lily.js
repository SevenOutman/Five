/**
 * Created by Doma on 16/7/15.
 */
define(['Tile'], (Tile) => {

    const FORMULA_5 = 1
    const FORMULA_4_L = 2
    const FORMULA_4_D = 3
    const FORMULA_3_L = 4
    const FORMULA_3_D = 5
    const FORMULA_2_L = 6
    const FORMULA_2_D = 7
    const FORMULA_1 = 8

    class Lily {
        constructor(gameData) {
            this.intelligence = 30
            this.gameData = gameData
        }

        get grid() {
            return this.gameData.grid
        }

        giveTile() {
            // let suggestions = this.getMGTSuggestions()
            // if (!suggestions.length) {
            //     return null
            // }
            // return new Tile(Tile.TYPE.LILY, suggestions[Math.floor(Math.random() * suggestions.length)])
            let hotest = this.hotestCell()
            if (!hotest) {
                return null
            }
            return new Tile(Tile.TYPE.LILY, hotest)
        }

        hotestCell() {
            let availables = this.grid.availableCells()
            if (availables.length) {
                let hots = this.hotCells(availables).sort((a, b) => b.heat - a.heat)
                if (hots.length) {
                    let heat = hots[0].heat
                    let hotests = []
                    for (let hot of hots) {
                        if (hot.heat == heat) {
                            hotests.push(hot)
                        }
                    }
                    hotests = hotests.sort((a, b) => b.heatLily - a.heatLily)
                    if (hotests[0].heatLily < hotests[0].heat) {
                        return new Tile(Tile.TYPE.LILY, hotests[Math.floor(Math.random() * hotests.length)].cell)
                    }
                    let heatLily = hotests[0].heat
                    let hotestsEx = []
                    for (let hotest of hotests) {
                        if (hotest.heatLily == heatLily) {
                            hotestsEx.push(hotest)
                        }
                    }
                    return hotestsEx[Math.floor(Math.random() * hotestsEx.length)].cell
                }
                return availables[Math.floor(Math.random() * availables.length)]
            }
            return null
        }

        getMGTSuggestions(depth) {
            let availables = this.grid.availableCells()
            if (!availables.length) {
                return []
            }
            let maxHeat = 0

        }

        hotCells(availables) {
            let hots = []
            for (let cell of availables) {
                let heatPlayer = this.cellHeat(cell)
                let heatLily = this.cellHeat(cell, true)
                let heat = Math.max(heatPlayer, heatLily)
                if (heat > 0) {
                    hots.push({
                        cell,
                        heat,
                        heatPlayer,
                        heatLily
                    })
                }
            }
            return hots
        }

        cellHeat(cell, self) {
            let formulas = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            let dirs = [
                {x: 0, y: 1},
                {x: 1, y: 0},
                {x: 1, y: 1},
                {x: 1, y: -1}
            ]
            for (let dir of dirs) {
                let dead = 0
                let team = 1
                for (let reverse of [1, -1]) {
                    for (let x = cell.x, y = cell.y; x > cell.x - 5 && x < cell.x + 5
                    && y > cell.y - 5 && y < cell.y + 5; x += dir.x * reverse, y += dir.y * reverse) {
                        if (x == cell.x && y == cell.y) {
                            continue
                        }
                        let pos = {x, y}
                        if (this.grid.withinBounds(pos)) {
                            let t = this.grid.cells[x][y]
                            if (!t) {
                                break
                            }
                            if (!self) {
                                if (t.type == Tile.TYPE.LILY) {
                                    dead++
                                    break
                                }
                                if (t.type == Tile.TYPE.PLAYER) {
                                    team++
                                }
                            } else {
                                if (t.type == Tile.TYPE.PLAYER) {
                                    dead++
                                    break
                                }
                                if (t.type == Tile.TYPE.LILY) {
                                    team++
                                }
                            }

                        } else {
                            dead++
                            break
                        }
                    }
                }

                if (team >= 5) {
                    formulas[FORMULA_5]++
                } else if (team == 4) {
                    if (dead == 0) {
                        formulas[FORMULA_4_L]++
                    }
                    else if (dead == 1) {
                        formulas[FORMULA_4_D]++
                    }
                } else if (team == 3) {
                    if (dead == 0) {
                        formulas[FORMULA_3_L]++
                    } else if (dead == 1) {
                        formulas[FORMULA_3_D]++
                    }
                } else if (team == 2) {
                    if (dead == 0) {
                        formulas[FORMULA_2_L]++
                    } else if (dead == 1) {
                        formulas[FORMULA_2_D]++
                    }
                } else if (team == 1) {
                    formulas[FORMULA_1]++
                }
            }

            if (formulas[FORMULA_5] >= 1) {
                return 100
            }
            if (formulas[FORMULA_4_L] >= 1) {
                return 90
            }
            if (formulas[FORMULA_4_D] >= 2) {
                return 90
            }
            if (formulas[FORMULA_4_D] == 1) {
                if (formulas[FORMULA_3_L] >= 1) {
                    return 90
                }
                return 60
            }
            if (formulas[FORMULA_3_L] >= 2) {
                return 80
            }
            if (formulas[FORMULA_3_L] == 1) {
                if (formulas[FORMULA_3_D] >= 1) {
                    return 70
                }
                return 50
            }
            if (formulas[FORMULA_3_D] >= 1) {
                return 30
            }
            if (formulas[FORMULA_2_L] >= 2) {
                return 40
            }
            if (formulas[FORMULA_2_L] == 1) {
                return 20
            }
            if (formulas[FORMULA_2_D] >= 1) {
                return 10
            }
            return 0
        }
    }

    return Lily
})
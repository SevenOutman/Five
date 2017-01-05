/**
 * Created by Doma on 16/7/15.
 */
define(['Tile'], (Tile) => {

    class Grid {
        constructor(size) {

            this.size = size;
            this.cells = [];

            this.xm = this.ym = this.size - 1
            this.xM = this.yM = 0

            this.clear();

        }

        clear() {
            this.cells = [];
            for (let i = 0; i < this.size; i++) {
                let row = this.cells[i] = []
                for (let j = 0; j < this.size; j++) {
                    row.push(null)
                }
            }
        }

        copy() {
            let copy = new Grid(this.size)
            for (let i = 0; i < copy.size; i++) {
                for (let j = 0; j < copy.size; j++) {
                    let t = this.cells[i][j]
                    if (t) {
                        copy.cells[i][j] = t.copy()
                    }
                }
            }
        }

        ifWon(tile) {
            return this.ifWonOnHorizontal(tile) || this.ifWonOnVertical(tile)
                || this.ifWonOnDiagonal1(tile) || this.ifWonOnDiagonal2(tile)
        }

        ifWonOnHorizontal(tile) {
            let y = tile.y
            let team = []

            for (let x = tile.x - 4; x <= tile.x + 4; x++) {
                let pos = {x, y}
                if (this.withinBounds(pos)) {
                    let t = this.cells[x][y]
                    if (t && t.type == tile.type) {
                        team.push(t)
                        if (team.length >= 5) {
                            return true
                        }
                    } else {
                        team = []
                    }
                }
            }
            return false
        }

        ifWonOnVertical(tile) {
            let x = tile.x
            let team = []

            for (let y = tile.y - 4; y <= tile.y + 4; y++) {
                let pos = {x, y}
                if (this.withinBounds(pos)) {
                    let t = this.cells[x][y]
                    if (t && t.type == tile.type) {
                        team.push(t)
                        if (team.length >= 5) {
                            return true
                        }
                    } else {
                        team = []
                    }
                }
            }
            return false
        }

        ifWonOnDiagonal1(tile) {
            let team = []
            for (let x = tile.x - 4, y = tile.y - 4; y <= tile.y + 4; x++, y++) {
                let pos = {x, y}
                if (this.withinBounds(pos)) {
                    let t = this.cells[x][y]
                    if (t && t.type == tile.type) {
                        team.push(t)
                        if (team.length >= 5) {
                            return true
                        }
                    } else {
                        team = []
                    }
                }
            }
            return false
        }

        ifWonOnDiagonal2(tile) {
            let team = []
            for (let x = tile.x + 4, y = tile.y - 4; y <= tile.y + 4; x--, y++) {
                let pos = {x, y}
                if (this.withinBounds(pos)) {
                    let t = this.cells[x][y]
                    if (t && t.type == tile.type) {
                        team.push(t)
                        if (team.length >= 5) {
                            return true
                        }
                    } else {
                        team = []
                    }
                }
            }
            return false
        }
    }

    Grid.prototype.availableCells = function (limited) {
        let availables = []
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (!this.cells[i][j]) {
                    availables.push({x: i, y: j});
                }
            }
        }
        return availables;
    };
    Grid.prototype.cellAvailable = function (cell) {
        return !this.cellOccupied(cell);
    };

    Grid.prototype.cellOccupied = function (cell) {
        return !!this.cellContent(cell);
    };

    Grid.prototype.cellContent = function (cell) {
        if (this.withinBounds(cell)) {
            return this.cells[cell.x][cell.y];
        } else {
            return null;
        }
    };
    Grid.prototype.withinBounds = function (position) {
        return position.x >= 0 && position.x < this.size &&
            position.y >= 0 && position.y < this.size;
    };

    Grid.prototype.putTile = function (tile) {
        this.cells[tile.x][tile.y] = tile;
        if (tile.x < this.xm) {
            this.xm = tile.x
        }
        if (tile.x > this.xM) {
            this.xM = tile.x
        }
        if (tile.y < this.ym) {
            this.ym = tile.y
        }
        if (tile.y > this.yM) {
            this.yM = tile.y
        }
    };

    return Grid
})
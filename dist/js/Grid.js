'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 16/7/15.
 */
define(['Tile'], function (Tile) {
    var Grid = function () {
        function Grid(size) {
            _classCallCheck(this, Grid);

            this.size = size;
            this.cells = [];

            this.xm = this.ym = this.size - 1;
            this.xM = this.yM = 0;

            this.clear();
        }

        _createClass(Grid, [{
            key: 'clear',
            value: function clear() {
                this.cells = [];
                for (var i = 0; i < this.size; i++) {
                    var row = this.cells[i] = [];
                    for (var j = 0; j < this.size; j++) {
                        row.push(null);
                    }
                }
            }
        }, {
            key: 'copy',
            value: function copy() {
                var copy = new Grid(this.size);
                for (var i = 0; i < copy.size; i++) {
                    for (var j = 0; j < copy.size; j++) {
                        var t = this.cells[i][j];
                        if (t) {
                            copy.cells[i][j] = t.copy();
                        }
                    }
                }
            }
        }, {
            key: 'ifWon',
            value: function ifWon(tile) {
                return this.ifWonOnHorizontal(tile) || this.ifWonOnVertical(tile) || this.ifWonOnDiagonal1(tile) || this.ifWonOnDiagonal2(tile);
            }
        }, {
            key: 'ifWonOnHorizontal',
            value: function ifWonOnHorizontal(tile) {
                var y = tile.y;
                var team = [];

                for (var x = tile.x - 4; x <= tile.x + 4; x++) {
                    var pos = { x: x, y: y };
                    if (this.withinBounds(pos)) {
                        var t = this.cells[x][y];
                        if (t && t.type == tile.type) {
                            team.push(t);
                            if (team.length >= 5) {
                                return true;
                            }
                        } else {
                            team = [];
                        }
                    }
                }
                return false;
            }
        }, {
            key: 'ifWonOnVertical',
            value: function ifWonOnVertical(tile) {
                var x = tile.x;
                var team = [];

                for (var y = tile.y - 4; y <= tile.y + 4; y++) {
                    var pos = { x: x, y: y };
                    if (this.withinBounds(pos)) {
                        var t = this.cells[x][y];
                        if (t && t.type == tile.type) {
                            team.push(t);
                            if (team.length >= 5) {
                                return true;
                            }
                        } else {
                            team = [];
                        }
                    }
                }
                return false;
            }
        }, {
            key: 'ifWonOnDiagonal1',
            value: function ifWonOnDiagonal1(tile) {
                var team = [];
                for (var x = tile.x - 4, y = tile.y - 4; y <= tile.y + 4; x++, y++) {
                    var pos = { x: x, y: y };
                    if (this.withinBounds(pos)) {
                        var t = this.cells[x][y];
                        if (t && t.type == tile.type) {
                            team.push(t);
                            if (team.length >= 5) {
                                return true;
                            }
                        } else {
                            team = [];
                        }
                    }
                }
                return false;
            }
        }, {
            key: 'ifWonOnDiagonal2',
            value: function ifWonOnDiagonal2(tile) {
                var team = [];
                for (var x = tile.x + 4, y = tile.y - 4; y <= tile.y + 4; x--, y++) {
                    var pos = { x: x, y: y };
                    if (this.withinBounds(pos)) {
                        var t = this.cells[x][y];
                        if (t && t.type == tile.type) {
                            team.push(t);
                            if (team.length >= 5) {
                                return true;
                            }
                        } else {
                            team = [];
                        }
                    }
                }
                return false;
            }
        }]);

        return Grid;
    }();

    Grid.prototype.availableCells = function (limited) {
        var availables = [];
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (!this.cells[i][j]) {
                    availables.push({ x: i, y: j });
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
        return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;
    };

    Grid.prototype.putTile = function (tile) {
        this.cells[tile.x][tile.y] = tile;
        if (tile.x < this.xm) {
            this.xm = tile.x;
        }
        if (tile.x > this.xM) {
            this.xM = tile.x;
        }
        if (tile.y < this.ym) {
            this.ym = tile.y;
        }
        if (tile.y > this.yM) {
            this.yM = tile.y;
        }
    };

    return Grid;
});
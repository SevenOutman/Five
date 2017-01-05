'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 16/7/15.
 */
define(['Tile'], function (Tile) {

    var FORMULA_5 = 1;
    var FORMULA_4_L = 2;
    var FORMULA_4_D = 3;
    var FORMULA_3_L = 4;
    var FORMULA_3_D = 5;
    var FORMULA_2_L = 6;
    var FORMULA_2_D = 7;
    var FORMULA_1 = 8;

    var Lily = function () {
        function Lily(gameData) {
            _classCallCheck(this, Lily);

            this.intelligence = 30;
            this.gameData = gameData;
        }

        _createClass(Lily, [{
            key: 'giveTile',
            value: function giveTile() {
                // let suggestions = this.getMGTSuggestions()
                // if (!suggestions.length) {
                //     return null
                // }
                // return new Tile(Tile.TYPE.LILY, suggestions[Math.floor(Math.random() * suggestions.length)])
                var hotest = this.hotestCell();
                if (!hotest) {
                    return null;
                }
                return new Tile(Tile.TYPE.LILY, hotest);
            }
        }, {
            key: 'hotestCell',
            value: function hotestCell() {
                var availables = this.grid.availableCells();
                if (availables.length) {
                    var hots = this.hotCells(availables).sort(function (a, b) {
                        return b.heat - a.heat;
                    });
                    if (hots.length) {
                        var heat = hots[0].heat;
                        var hotests = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = hots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var hot = _step.value;

                                if (hot.heat == heat) {
                                    hotests.push(hot);
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        hotests = hotests.sort(function (a, b) {
                            return b.heatLily - a.heatLily;
                        });
                        if (hotests[0].heatLily < hotests[0].heat) {
                            return new Tile(Tile.TYPE.LILY, hotests[Math.floor(Math.random() * hotests.length)].cell);
                        }
                        var heatLily = hotests[0].heat;
                        var hotestsEx = [];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = hotests[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var hotest = _step2.value;

                                if (hotest.heatLily == heatLily) {
                                    hotestsEx.push(hotest);
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        return hotestsEx[Math.floor(Math.random() * hotestsEx.length)].cell;
                    }
                    return availables[Math.floor(Math.random() * availables.length)];
                }
                return null;
            }
        }, {
            key: 'getMGTSuggestions',
            value: function getMGTSuggestions(depth) {
                var availables = this.grid.availableCells();
                if (!availables.length) {
                    return [];
                }
                var maxHeat = 0;
            }
        }, {
            key: 'hotCells',
            value: function hotCells(availables) {
                var hots = [];
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = availables[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var cell = _step3.value;

                        var heatPlayer = this.cellHeat(cell);
                        var heatLily = this.cellHeat(cell, true);
                        var heat = Math.max(heatPlayer, heatLily);
                        if (heat > 0) {
                            hots.push({
                                cell: cell,
                                heat: heat,
                                heatPlayer: heatPlayer,
                                heatLily: heatLily
                            });
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return hots;
            }
        }, {
            key: 'cellHeat',
            value: function cellHeat(cell, self) {
                var formulas = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                var dirs = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: -1 }];
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = dirs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var dir = _step4.value;

                        var dead = 0;
                        var team = 1;
                        var _arr = [1, -1];
                        for (var _i = 0; _i < _arr.length; _i++) {
                            var reverse = _arr[_i];
                            for (var x = cell.x, y = cell.y; x > cell.x - 5 && x < cell.x + 5 && y > cell.y - 5 && y < cell.y + 5; x += dir.x * reverse, y += dir.y * reverse) {
                                if (x == cell.x && y == cell.y) {
                                    continue;
                                }
                                var pos = { x: x, y: y };
                                if (this.grid.withinBounds(pos)) {
                                    var t = this.grid.cells[x][y];
                                    if (!t) {
                                        break;
                                    }
                                    if (!self) {
                                        if (t.type == Tile.TYPE.LILY) {
                                            dead++;
                                            break;
                                        }
                                        if (t.type == Tile.TYPE.PLAYER) {
                                            team++;
                                        }
                                    } else {
                                        if (t.type == Tile.TYPE.PLAYER) {
                                            dead++;
                                            break;
                                        }
                                        if (t.type == Tile.TYPE.LILY) {
                                            team++;
                                        }
                                    }
                                } else {
                                    dead++;
                                    break;
                                }
                            }
                        }

                        if (team >= 5) {
                            formulas[FORMULA_5]++;
                        } else if (team == 4) {
                            if (dead == 0) {
                                formulas[FORMULA_4_L]++;
                            } else if (dead == 1) {
                                formulas[FORMULA_4_D]++;
                            }
                        } else if (team == 3) {
                            if (dead == 0) {
                                formulas[FORMULA_3_L]++;
                            } else if (dead == 1) {
                                formulas[FORMULA_3_D]++;
                            }
                        } else if (team == 2) {
                            if (dead == 0) {
                                formulas[FORMULA_2_L]++;
                            } else if (dead == 1) {
                                formulas[FORMULA_2_D]++;
                            }
                        } else if (team == 1) {
                            formulas[FORMULA_1]++;
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                if (formulas[FORMULA_5] >= 1) {
                    return 100;
                }
                if (formulas[FORMULA_4_L] >= 1) {
                    return 90;
                }
                if (formulas[FORMULA_4_D] >= 2) {
                    return 90;
                }
                if (formulas[FORMULA_4_D] == 1) {
                    if (formulas[FORMULA_3_L] >= 1) {
                        return 90;
                    }
                    return 60;
                }
                if (formulas[FORMULA_3_L] >= 2) {
                    return 80;
                }
                if (formulas[FORMULA_3_L] == 1) {
                    if (formulas[FORMULA_3_D] >= 1) {
                        return 70;
                    }
                    return 50;
                }
                if (formulas[FORMULA_3_D] >= 1) {
                    return 30;
                }
                if (formulas[FORMULA_2_L] >= 2) {
                    return 40;
                }
                if (formulas[FORMULA_2_L] == 1) {
                    return 20;
                }
                if (formulas[FORMULA_2_D] >= 1) {
                    return 10;
                }
                return 0;
            }
        }, {
            key: 'grid',
            get: function get() {
                return this.gameData.grid;
            }
        }]);

        return Lily;
    }();

    return Lily;
});
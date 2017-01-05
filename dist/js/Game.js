'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 15/12/27.
 */
define(['InputManager', 'Renderer', 'GameData', 'Tile', 'Grid', 'Lily'], function (InputManager, Renderer, GameData, Tile, Grid, Lily) {
    var STATE_RUNNING = 1;
    var STATE_OVER = 2;

    var Game = function () {
        function Game() {
            _classCallCheck(this, Game);

            this.inputManager = new InputManager();
            this.renderer = new Renderer();
            this.gameData = new GameData();
            this.state = STATE_OVER;

            this.Lily = new Lily(this.gameData);
            this.turn = true;

            this.initEvents();

            this.run();
        }

        _createClass(Game, [{
            key: 'run',
            value: function run() {
                var _this = this;

                requestAnimationFrame(function () {
                    _this.nextFrame();
                });
                this.state = STATE_RUNNING;
            }
        }, {
            key: 'initEvents',
            value: function initEvents() {
                var _this2 = this;

                this.inputManager.on('movecursor', function (_ref) {
                    var x = _ref.x,
                        y = _ref.y;

                    if (_this2.turn) {
                        if (_this2.isRunning()) {
                            if (x >= _this2.renderer.startPx - _this2.renderer.gapPx / 2 && x <= _this2.renderer.endPx + _this2.renderer.gapPx / 2) {
                                x = Math.floor((x - _this2.renderer.startPx + _this2.renderer.gapPx / 2) / _this2.renderer.gapPx);
                            } else {
                                _this2.resetCursor();
                                return;
                            }
                            if (y >= _this2.renderer.startPx - _this2.renderer.gapPx / 2 && y <= _this2.renderer.endPx + _this2.renderer.gapPx / 2) {
                                y = Math.floor((y - _this2.renderer.startPx + _this2.renderer.gapPx / 2) / _this2.renderer.gapPx);
                            } else {
                                _this2.resetCursor();
                                return;
                            }
                            _this2.placeCursorAt({ x: x, y: y });
                        }
                    }
                });

                this.inputManager.on('placetile', function () {
                    if (_this2.isRunning()) {
                        _this2.placeTile();
                    }
                });
                this.inputManager.on("restart", this.reset.bind(this));
            }
        }, {
            key: 'nextFrame',
            value: function nextFrame() {
                var _this3 = this;

                requestAnimationFrame(function () {
                    _this3.nextFrame();
                });

                this.renderer.render(this.gameData);
                this.updateGameData();
            }
        }, {
            key: 'updateGameData',
            value: function updateGameData() {
                this.gameData.update();
            }
        }, {
            key: 'isRunning',
            value: function isRunning() {
                return this.state == STATE_RUNNING;
            }

            /*
             代理 grid
             */

        }, {
            key: 'placeCursorAt',
            value: function placeCursorAt(pos) {
                this.cursor = pos;
            }
        }, {
            key: 'isCursorValid',
            value: function isCursorValid() {
                return this.cursor.x > -1 && this.cursor.y > -1;
            }
        }, {
            key: 'resetCursor',
            value: function resetCursor() {
                this.cursor = { x: -1, y: -1 };
            }
        }, {
            key: 'placeTile',
            value: function placeTile() {
                var _this4 = this;

                if (this.isCursorValid()) {
                    var tile = new Tile(Tile.TYPE.PLAYER, this.cursor);
                    var put = this.putTile(tile);
                    if (put) {
                        var team = this.grid.ifWon(tile);
                        if (team) {
                            return this.gameover(Tile.TYPE.PLAYER);
                        }
                        setTimeout(function () {
                            _this4.react();
                        }, 300);
                    }
                }
                this.resetCursor();
            }
        }, {
            key: 'putTile',
            value: function putTile(tile) {
                if (this.grid.cellAvailable(tile)) {
                    this.grid.putTile(tile);
                    this.turn = !this.turn;
                    return true;
                }
                return false;
            }
        }, {
            key: 'react',
            value: function react() {
                if (!this.turn) {
                    var tile = this.Lily.giveTile();
                    if (!tile) {
                        return this.gameover(0);
                    }
                    this.putTile(tile);
                    var team = this.grid.ifWon(tile);
                    if (team) {
                        this.gameover(Tile.TYPE.LILY);
                    }
                    this.turn = true;
                }
            }
        }, {
            key: 'gameover',
            value: function gameover(turn) {
                this.state = STATE_OVER;
                this.renderer.showMessage(turn == Tile.TYPE.PLAYER);
            }
        }, {
            key: 'reset',
            value: function reset() {
                this.gameData.reset();
                this.renderer.clearMessage();
                this.turn = true;
                this.state = STATE_RUNNING;
            }
        }, {
            key: 'grid',
            get: function get() {
                return this.gameData.grid;
            }

            /*
             代理 cursor
             */

        }, {
            key: 'cursor',
            get: function get() {
                return this.gameData.cursorPos;
            },
            set: function set(val) {
                this.gameData.cursorPos = val;
            }
        }]);

        return Game;
    }();

    return Game;
});
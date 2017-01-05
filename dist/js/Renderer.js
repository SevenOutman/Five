'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 15/12/27.
 */
define(['Tile', 'UnitManager'], function (Tile, Unit) {

    var RADIUS_PLACEHOLDER = 4;
    var RADIUS_TILE = 8;

    var Renderer = function () {
        function Renderer() {
            _classCallCheck(this, Renderer);

            var canvas = this.canvas = document.getElementById('canvas');

            this.width = canvas.width = Unit.rem(7.5);
            this.height = canvas.height = Unit.rem(7.5);

            var padding = 0.5;

            this.startPx = Unit.rem(padding);
            this.endPx = Unit.rem(7.5 - padding);

            this.radiusPlaceholder = RADIUS_PLACEHOLDER;
            this.radiusTile = RADIUS_TILE;

            this.ctx = canvas.getContext('2d');

            this.messageContainer = document.querySelector(".game-message");
            this.tileContainer = document.querySelector(".tile-container");
        }

        _createClass(Renderer, [{
            key: 'render',
            value: function render(_ref) {
                var grid = _ref.grid;
                var cursorPos = _ref.cursorPos;

                var ctx = this.ctx;
                ctx.clearRect(0, 0, this.width, this.height);

                if (!this.gapPx) {
                    this.gapPx = (this.endPx - this.startPx) / (grid.size - 1);
                    this.radiusTile = (this.gapPx - 4) / 2;
                    this.radiusPlaceholder = this.radiusTile / 2;

                    Unit.gapWidth = this.gapPx;
                }

                for (var i = 0; i < grid.size; i++) {
                    for (var j = 0; j < grid.size; j++) {
                        var x = this.startPx + j * this.gapPx;
                        var y = this.startPx + i * this.gapPx;
                        if (!grid.cells[j][i]) {

                            ctx.beginPath();
                            ctx.arc(x, y, this.radiusPlaceholder, 0, Math.PI * 2, true);
                            ctx.closePath();
                            ctx.fillStyle = '#11445a';
                        } else {

                            ctx.beginPath();
                            ctx.arc(x, y, this.radiusTile, 0, Math.PI * 2, true);
                            ctx.closePath();

                            var tile = grid.cells[j][i];
                            if (tile.type > 0) {
                                ctx.fillStyle = 'rgb(255, 175, 205)';
                            } else {
                                ctx.fillStyle = 'rgb(95, 211, 255)';
                            }
                        }
                        ctx.fill();
                    }
                }

                if (cursorPos.x > -1 && cursorPos.y > -1) {

                    var _x = this.startPx + cursorPos.x * this.gapPx;
                    var _y = this.startPx + cursorPos.y * this.gapPx;

                    ctx.strokeStyle = 'rgb(255, 175, 205)';
                    ctx.beginPath();
                    ctx.arc(_x, _y, this.radiusTile, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }, {
            key: 'clearTiles',
            value: function clearTiles() {
                while (this.tileContainer.firstChild) {
                    this.tileContainer.removeChild(this.tileContainer.firstChild);
                }
            }
        }, {
            key: 'renderTile',
            value: function renderTile(tile) {
                var self = this;
                var tileDom = tile.dom = document.createElement("div"),
                    classes = ["tile", tile.type == Tile.TYPE.PLAYER ? "tile-blue" : "tile-red", "tile-row-" + tile.x, "tile-col-" + tile.y];
                tileDom.setAttribute("class", classes.join(" "));
                self.tileContainer.appendChild(tileDom);
            }
        }, {
            key: 'showMessage',
            value: function showMessage(won) {
                var type = won ? "game-won" : "game-over";
                var message = won ? "You win!" : "Game over!";

                this.messageContainer.classList.add(type);
                this.messageContainer.getElementsByTagName("p")[0].textContent = message;
            }
        }, {
            key: 'clearMessage',
            value: function clearMessage() {
                this.messageContainer.classList.remove("game-won");
                this.messageContainer.classList.remove("game-over");
            }
        }]);

        return Renderer;
    }();

    return Renderer;
});
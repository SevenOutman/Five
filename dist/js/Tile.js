"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 16/7/15.
 */
define(function () {
    var Tile = function () {
        function Tile(type, position) {
            _classCallCheck(this, Tile);

            this.type = type < 0 ? Tile.TYPE.LILY : Tile.TYPE.PLAYER;
            this.x = position.x;
            this.y = position.y;
        }

        _createClass(Tile, [{
            key: "copy",
            value: function copy() {
                return new Tile(this.type, { x: this.x, y: this.y });
            }
        }]);

        return Tile;
    }();

    Tile.TYPE = {
        LILY: -1,
        PLAYER: 1
    };

    return Tile;
});
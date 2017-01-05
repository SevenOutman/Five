'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 16/4/9.
 */
define(['Grid', 'UnitManager', 'Tile'], function (Grid, Unit, Tile) {
    var GameData = function () {
        function GameData() {
            _classCallCheck(this, GameData);

            this.grid = new Grid(15);
            this.cursorPos = { x: -1, y: -1 };
        }

        _createClass(GameData, [{
            key: 'update',
            value: function update() {}
        }, {
            key: 'reset',
            value: function reset() {
                this.grid.clear();
            }
        }]);

        return GameData;
    }();

    return GameData;
});
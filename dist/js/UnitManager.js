"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 16/7/15.
 */
define(function () {

    (function viewportSize() {
        var w, h;
        if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
            w = window.innerWidth;
            h = window.innerHeight;
        } else {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        }
        var dims = { width: w, height: h };
        console.log(JSON.stringify(dims));
        window.__viewportSize = dims;
    })();

    var UnitManager = function () {
        function UnitManager() {
            _classCallCheck(this, UnitManager);
        }

        _createClass(UnitManager, null, [{
            key: "rem",
            value: function rem(n) {
                return n * window.__viewportSize.width / 375 * 50;
            }
        }]);

        return UnitManager;
    }();

    UnitManager.TEAM_PLAYER = 1;
    UnitManager.TEAM_LILY = -1;

    return UnitManager;
});
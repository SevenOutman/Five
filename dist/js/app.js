'use strict';

requirejs.config({
    base: 'js'
});

require(['polyfill'], function () {
    require(['UnitManager', 'Game'], function (Unit, Game) {
        document.documentElement.style.fontSize = Unit.rem(1) + 'px';

        requestAnimationFrame(function () {
            var game = window.game = new Game();
        });
    });
});
requirejs.config({
    base: 'js'
})

require(['polyfill'], () => {
    require([
        'UnitManager',
        'Game'
    ], (Unit, Game) => {
        document.documentElement.style.fontSize = Unit.rem(1) + 'px';

        requestAnimationFrame(() => {
            var game = window.game = new Game()
        });
    });
})
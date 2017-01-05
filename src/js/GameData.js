/**
 * Created by Doma on 16/4/9.
 */
define(['Grid', 'UnitManager', 'Tile'], (Grid, Unit, Tile) => {

    class GameData {
        constructor() {
            this.grid = new Grid(15)
            this.cursorPos = {x: -1, y: -1}

        }


        update() {

        }

        reset() {
            this.grid.clear()
        }
    }

    return GameData
});
/**
 * Created by Doma on 16/7/15.
 */
define(() => {
    class Tile {
        constructor(type, position) {

            this.type = type < 0 ? Tile.TYPE.LILY : Tile.TYPE.PLAYER;
            this.x = position.x;
            this.y = position.y;

        }

        copy() {
            return new Tile(this.type, {x: this.x, y: this.y})
        }
    }

    Tile.TYPE = {
        LILY: -1,
        PLAYER: 1
    };

    return Tile
})
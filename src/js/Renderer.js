/**
 * Created by Doma on 15/12/27.
 */
define(['Tile', 'UnitManager'], (Tile, Unit) => {

    const RADIUS_PLACEHOLDER = 4
    const RADIUS_TILE = 8

    class Renderer {
        constructor() {
            let canvas = this.canvas = document.getElementById('canvas')

            this.width = canvas.width = Unit.rem(7.5)
            this.height = canvas.height = Unit.rem(7.5)

            let padding = 0.5

            this.startPx = Unit.rem(padding)
            this.endPx = Unit.rem(7.5 - padding)

            this.radiusPlaceholder = RADIUS_PLACEHOLDER
            this.radiusTile = RADIUS_TILE

            this.ctx = canvas.getContext('2d')


            this.messageContainer = document.querySelector(".game-message");
            this.tileContainer = document.querySelector(".tile-container");
        }

        render({grid, cursorPos}) {
            let ctx = this.ctx
            ctx.clearRect(0, 0, this.width, this.height)

            if (!this.gapPx) {
                this.gapPx = (this.endPx - this.startPx) / (grid.size - 1)
                this.radiusTile = (this.gapPx - 4) / 2
                this.radiusPlaceholder = this.radiusTile / 2

                Unit.gapWidth = this.gapPx
            }

            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    let x = this.startPx + j * this.gapPx
                    let y = this.startPx + i * this.gapPx
                    if (!grid.cells[j][i]) {

                        ctx.beginPath();
                        ctx.arc(x, y, this.radiusPlaceholder, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = '#11445a'

                    } else {

                        ctx.beginPath();
                        ctx.arc(x, y, this.radiusTile, 0, Math.PI * 2, true);
                        ctx.closePath();

                        let tile = grid.cells[j][i]
                        if (tile.type > 0) {
                            ctx.fillStyle = 'rgb(255, 175, 205)'
                        } else {
                            ctx.fillStyle = 'rgb(95, 211, 255)'
                        }
                    }
                    ctx.fill()
                }
            }


            if (cursorPos.x > -1 && cursorPos.y > -1) {

                let x = this.startPx + cursorPos.x * this.gapPx
                let y = this.startPx + cursorPos.y * this.gapPx

                ctx.strokeStyle = 'rgb(255, 175, 205)'
                ctx.beginPath();
                ctx.arc(x, y, this.radiusTile, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke()

            }
        }

        clearTiles() {
            while (this.tileContainer.firstChild) {
                this.tileContainer.removeChild(this.tileContainer.firstChild);
            }
        };

        renderTile(tile) {
            var self = this;
            var tileDom = tile.dom = document.createElement("div"),
                classes = ["tile",
                    tile.type == Tile.TYPE.PLAYER ? "tile-blue" : "tile-red",
                    "tile-row-" + tile.x,
                    "tile-col-" + tile.y
                ];
            tileDom.setAttribute("class", classes.join(" "));
            self.tileContainer.appendChild(tileDom);
        };

        showMessage(won) {
            var type = won ? "game-won" : "game-over";
            var message = won ? "You win!" : "Game over!";

            this.messageContainer.classList.add(type);
            this.messageContainer.getElementsByTagName("p")[0].textContent = message;
        };

        clearMessage() {
            this.messageContainer.classList.remove("game-won");
            this.messageContainer.classList.remove("game-over");
        };


    }

    return Renderer
})
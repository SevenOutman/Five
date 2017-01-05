/**
 * Created by Doma on 15/12/27.
 */
define([
    'InputManager',
    'Renderer',
    'GameData',
    'Tile',
    'Grid',
    'Lily'
], (InputManager, Renderer, GameData, Tile, Grid, Lily) => {
    const STATE_RUNNING = 1
    const STATE_OVER = 2
    class Game {
        constructor() {
            this.inputManager = new InputManager();
            this.renderer = new Renderer();
            this.gameData = new GameData();
            this.state = STATE_OVER

            this.Lily = new Lily(this.gameData)
            this.turn = true

            this.initEvents();

            this.run();
        }

        run() {
            requestAnimationFrame(() => {
                this.nextFrame();
            });
            this.state = STATE_RUNNING
        }

        initEvents() {
            this.inputManager.on('movecursor', ({x, y}) => {
                if (this.turn) {
                    if (this.isRunning()) {
                        if (x >= this.renderer.startPx - this.renderer.gapPx / 2 && x <= this.renderer.endPx + this.renderer.gapPx / 2) {
                            x = Math.floor((x - this.renderer.startPx + this.renderer.gapPx / 2) / this.renderer.gapPx)
                        } else {
                            this.resetCursor()
                            return
                        }
                        if (y >= this.renderer.startPx - this.renderer.gapPx / 2 && y <= this.renderer.endPx + this.renderer.gapPx / 2) {
                            y = Math.floor((y - this.renderer.startPx + this.renderer.gapPx / 2) / this.renderer.gapPx)
                        } else {
                            this.resetCursor()
                            return
                        }
                        this.placeCursorAt({x, y})
                    }
                }
            })

            this.inputManager.on('placetile', () => {
                if (this.isRunning()) {
                    this.placeTile()
                }
            })
            this.inputManager.on("restart", this.reset.bind(this));
        }

        nextFrame() {
            requestAnimationFrame(() => {
                this.nextFrame();
            });

            this.renderer.render(this.gameData);
            this.updateGameData();
        }

        updateGameData() {
            this.gameData.update();
        }

        isRunning() {
            return this.state == STATE_RUNNING
        }

        /*
         代理 grid
         */
        get grid() {
            return this.gameData.grid
        }

        /*
         代理 cursor
         */
        get cursor() {
            return this.gameData.cursorPos
        }

        set cursor(val) {
            this.gameData.cursorPos = val
        }

        placeCursorAt(pos) {
            this.cursor = pos
        }

        isCursorValid() {
            return this.cursor.x > -1 && this.cursor.y > -1
        }

        resetCursor() {
            this.cursor = {x: -1, y: -1}
        }

        placeTile() {
            if (this.isCursorValid()) {
                let tile = new Tile(Tile.TYPE.PLAYER, this.cursor)
                let put = this.putTile(tile)
                if (put) {
                    var team = this.grid.ifWon(tile);
                    if (team) {
                        return this.gameover(Tile.TYPE.PLAYER);
                    }
                    setTimeout(() => {
                        this.react()
                    }, 300);
                }
            }
            this.resetCursor()
        }

        putTile(tile) {
            if (this.grid.cellAvailable(tile)) {
                this.grid.putTile(tile)
                this.turn = !this.turn
                return true
            }
            return false
        }

        react() {
            if (!this.turn) {
                let tile = this.Lily.giveTile();
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


        gameover(turn) {
            this.state = STATE_OVER
            this.renderer.showMessage(turn == Tile.TYPE.PLAYER);
        }

        reset() {
            this.gameData.reset()
            this.renderer.clearMessage();
            this.turn = true;
            this.state = STATE_RUNNING
        }
    }
    return Game
})
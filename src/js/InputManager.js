/**
 * Created by Doma on 15/12/27.
 */
define(() => {

    class InputManager {
        constructor() {
            this.events = {};
            if (window.navigator.msPointerEnabled) {
                //Internet Explorer 10 style
                this.eventTouchstart = "MSPointerDown";
                this.eventTouchmove = "MSPointerMove";
                this.eventTouchend = "MSPointerUp";
            } else {
                this.eventTouchstart = "touchstart";
                this.eventTouchmove = "touchmove";
                this.eventTouchend = "touchend";
            }
            this.listen();
        }

        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        }

        emit(event, data) {
            var callbacks = this.events[event];
            if (callbacks) {
                callbacks.forEach(callback => {
                    setTimeout(() => {
                        callback(...(data || []));
                    }, 0);
                });
            }
        }

        listen() {
            // implement this
            document.body.addEventListener(this.eventTouchmove, (e) => {
                e.preventDefault()
                let touch = e.touches[0]
                let x = touch.clientX
                let y = touch.clientY - 200
                this.emit('movecursor', [{x, y}])
            }, false)

            document.body.addEventListener(this.eventTouchend, () => {
                this.emit('placetile')
            }, false)

            document.querySelector('.btn-new').addEventListener('click', () => {
                this.emit('restart')
            }, false)

            document.querySelector('.btn-restart').addEventListener('click', () => {
                this.emit('restart')
            }, false)
        }
    }

    return InputManager

})
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Doma on 15/12/27.
 */
define(function () {
    var InputManager = function () {
        function InputManager() {
            _classCallCheck(this, InputManager);

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

        _createClass(InputManager, [{
            key: "on",
            value: function on(event, callback) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
            }
        }, {
            key: "emit",
            value: function emit(event, data) {
                var callbacks = this.events[event];
                if (callbacks) {
                    callbacks.forEach(function (callback) {
                        setTimeout(function () {
                            callback.apply(undefined, _toConsumableArray(data || []));
                        }, 0);
                    });
                }
            }
        }, {
            key: "listen",
            value: function listen() {
                var _this = this;

                // implement this
                document.body.addEventListener(this.eventTouchmove, function (e) {
                    e.preventDefault();
                    var touch = e.touches[0];
                    var x = touch.clientX;
                    var y = touch.clientY - 200;
                    _this.emit('movecursor', [{ x: x, y: y }]);
                }, false);

                document.body.addEventListener(this.eventTouchend, function () {
                    _this.emit('placetile');
                }, false);

                document.querySelector('.btn-new').addEventListener('click', function () {
                    _this.emit('restart');
                }, false);

                document.querySelector('.btn-restart').addEventListener('click', function () {
                    _this.emit('restart');
                }, false);
            }
        }]);

        return InputManager;
    }();

    return InputManager;
});
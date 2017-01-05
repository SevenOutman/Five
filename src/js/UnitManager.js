/**
 * Created by Doma on 16/7/15.
 */
define(() => {

    (function viewportSize() {
        var w, h;
        if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
            w = window.innerWidth;
            h = window.innerHeight;
        } else {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        }
        var dims = {width: w, height: h};
        console.log(JSON.stringify(dims));
        window.__viewportSize = dims;
    })();


    class UnitManager {
        static rem(n) {
            return n * window.__viewportSize.width / 375 * 50
        }
    }

    UnitManager.TEAM_PLAYER = 1
    UnitManager.TEAM_LILY = -1

    return UnitManager
})
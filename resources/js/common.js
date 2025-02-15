gsap.registerPlugin(ScrollTrigger);

let door = {},
    mediaQuery = window.matchMedia("(min-width: 1025px)"),
    lenis;

let $window = $(window),
    $body = $("body");

door.utils = {
    smoothScroll: function () {
        function breakPoint(mediaQuery) {
            if (mediaQuery.matches) {
                if (!lenis) {
                    lenis = new Lenis({
                        duration: 1
                    });

                    lenis.on("scroll", ScrollTrigger.update);
                    gsap.ticker.add(function (time) {
                        lenis.raf(time * 1000);
                    });

                    gsap.ticker.lagSmoothing(0);
                }
            }
        }

        breakPoint(mediaQuery);
        mediaQuery.addEventListener("change", breakPoint);
    },
    isSmoothStop: function (boolean) {
        if (boolean === true) {
            if (lenis) {
                lenis.stop();
            }
        } else {
            if (lenis) {
                lenis.start();
            }
        }
    },
    init: function () {
        door.utils.smoothScroll();
    }
}

door.utils.init();
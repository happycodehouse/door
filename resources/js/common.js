gsap.registerPlugin(ScrollTrigger);

let mediaQuery = window.matchMedia("(min-width: 1025px)"),
    lenis;

let $window = $(window),
    $body = $("body");

door.utils = {
    gnbSpot: function (spot) {
        const $gnb = $("#gnb");
        const $spot = $gnb.find("li");

        if ($spot.length === 0) {
            console.error("GNB 요소가 존재하지 않습니다.");
            return;
        }

        $spot.each(function (idx, el) {
            let dataSpot = $(el).attr("data-spot");
            if (spot == dataSpot) {
                $(this).addClass("active");
            }
        });
    },
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
        if (lenis) {
            if (boolean) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }
    },
    gridGuide: function () {
        const $gridGuide = $("#gridGuide");

        document.addEventListener("keyup", function (e) {
            // F9
            if (e.key === "F9") {
                console.log("F9");

                if (!$gridGuide.hasClass("on")) {
                    $gridGuide.addClass("on");
                } else {
                    $gridGuide.removeClass("on");
                }
            }
        });
    },

    init: function () {
        door.utils.smoothScroll();
        door.utils.gridGuide();
    }
};

door.utils.init();






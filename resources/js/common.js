const door = {};
const mediaQuery = window.matchMedia("(min-width: 1025px)");
const body = document.body;
const header = document.getElementById("header");
const footer = document.getElementById("footer");
let lenis;

gsap.registerPlugin(ScrollTrigger);

door.utils = {
    /*    gnbSpot: (spot) => {
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
        },*/
    smoothScroll: () => {
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
    isSmoothStop: (boolean) => {
        if (lenis) {
            if (boolean) {
                lenis.stop();
                console.log("lenis stop");
            } else {
                lenis.start();
                console.log("lenis start");
            }
        }
    },
    init: () => {
        door.utils.smoothScroll();
    }
};

door.utils.init();






const door = {};
const mediaQuery = window.matchMedia("(min-width: 1025px)");
const body = document.body;
const header = document.getElementById("header");
const footer = document.getElementById("footer");
let lenis;
let scrollT, currentT;

gsap.registerPlugin(ScrollTrigger);

door.utils = {
    header: () => {
        scrollT = 0;
        currentT = 0;

        $(window).on("scroll", function (e) {
            e.preventDefault();
            scrollT = $(this).scrollTop();

            // console.log(scrollT);
            if (scrollT > currentT) {
                body.setAttribute("data-scroll", "down");
            } else if (scrollT < currentT) {
                body.setAttribute("data-scroll", "up");
            }

            currentT = scrollT;
        });
    },
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
    dataMotion: () => {
        if ($("[data-motion]").length > 0) {
            $("[data-motion]").each((idx, item) => {
                ScrollTrigger.create({
                    id: "dataMotion" + idx,
                    trigger: $(item),
                    scrub: 0.5,
                    start: "top 70%",
                    markers: false,
                    invalidateOnRefresh: true,
                    onEnter: () => $(item).addClass("active"),
                    // onLeaveBack: () => $(item).removeClass("active")
                });
            });
        }
    },
    init: () => {
        door.utils.header();
        door.utils.smoothScroll();
        door.utils.dataMotion();
    }
};

door.utils.init();






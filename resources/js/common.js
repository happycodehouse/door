let door = {},
    mediaQuery = window.matchMedia("(min-width: 1025px)"),
    lenis;

let $window = $(window),
    $body = $("body");

door.utils = {
    gnbSpot: async function (spot) {
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
    init: function () {
        door.utils.smoothScroll();
    }
};

door.utils.init();

function loadHeader() {
    return new Promise((resolve, reject) => {
        let allHtmlElements = document.querySelectorAll('[data-include-path]');

        // 모든 요소를 비동기로 로드
        let loadPromises = Array.from(allHtmlElements).map(el => {
            let includePath = el.dataset.includePath;

            if (includePath) {
                return new Promise((resolve, reject) => {
                    let xhttp = new XMLHttpRequest();

                    xhttp.onreadystatechange = function() {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                el.innerHTML = this.responseText;
                                resolve();  // 성공 시 resolve 호출
                            } else {
                                console.error('Error loading:', includePath, 'Status:', this.status);
                                reject(this.status);
                            }
                        }
                    };

                    xhttp.onerror = function() {
                        console.error('Request failed with status:', this.status);
                        reject(this.status);
                    };

                    xhttp.open('GET', includePath, true);
                    xhttp.send();
                });
            }
        });

        // 모든 Promise가 완료될 때까지 대기
        Promise.all(loadPromises).then(resolve).catch(reject);
    });
}

window.addEventListener('load', function() {
    loadHeader().then(() => {
        // 헤더가 성공적으로 로드된 후 common.js 초기화 호출
        console.log('헤더가 성공적으로 로드되었습니다.');
        door.utils.init();
    }).catch((error) => {
        console.error('헤더 로드 중 오류 발생:', error);
    });
});

gsap.registerPlugin(ScrollTrigger);
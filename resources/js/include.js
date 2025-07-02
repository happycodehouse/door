(async () => {
    // 1. 비동기 작업 (header/footer 로드)
    const headerContent = await fetch("/views/layout/header.html");
    const footerContent = await fetch("/views/layout/footer.html");

    const headerElement = document.querySelector(".include_header");
    if (headerElement) {
        headerElement.innerHTML = await headerContent.text();
    }

    const footerElement = document.querySelector(".include_footer");
    if (footerElement) {
        footerElement.innerHTML = await footerContent.text();
    }

    // 2. header/footer 로드 완료 후 DOM 조작 및 이벤트 리스너 등록
    initializeAfterLoad();
})();

function initializeAfterLoad() {
    // DOM 요소 선택
    const hamburger = document.getElementById("hamburger");
    const gnb = document.getElementById("gnb");
    const gnbClone = gnb.cloneNode(true);
    gnbClone.removeAttribute("id");
    const sitemap = document.getElementById("sitemap");
    const dim = document.getElementById("dim");
    const gridGuide = document.getElementById("gridGuide");
    const wrap = document.getElementById("wrap");
    const secVisual = document.querySelector(".sec_intro");
    const header = document.querySelector("header"); // header 요소 추가
    const body = document.body; // body 요소 추가

    // GNB 복제본을 sitemap에 추가
    sitemap.querySelector(".gnb_wrap").appendChild(gnbClone);

    // 햄버거 메뉴 토글 함수
    const toggleElements = (state) => {
        hamburger.classList.toggle("on", state);
        sitemap.classList.toggle("on", state);
        dim.classList.toggle("on", state);
        door.utils.isSmoothStop(state);
    };

    // 햄버거 메뉴 클릭 이벤트
    hamburger.addEventListener("click", () => {
        toggleElements(!hamburger.classList.contains("on"));
    });

    // 딤 클릭 이벤트
    dim.addEventListener("click", () => {
        toggleElements(false);
    });

    // F9 키 이벤트 (그리드 가이드 토글)
    document.addEventListener("keyup", function (e) {
        if (e.key === "F9") {
            console.log("F9");
            gridGuide.classList.toggle("on");
        }
    });

    // 스크롤 관련 변수 초기화
    let secVisualHeight;
    let scrollT = 0;
    let currentT = 0;

    // sec_intro 높이 설정 및 리사이즈 이벤트
    if (secVisual) {
        secVisualHeight = secVisual.clientHeight;

        window.addEventListener("resize", function () {
            secVisualHeight = secVisual.clientHeight;
            console.log(secVisualHeight);
        });
    }

    // 스크롤 이벤트
    window.addEventListener("scroll", function (e) {
        scrollT = window.scrollY;

        // 스크롤 방향 확인
        if (scrollT > currentT) {
            body.setAttribute("data-scroll", "down");
        } else if (scrollT < currentT) {
            body.setAttribute("data-scroll", "up");
        }

        if (scrollT > 0) {
            if (body.getAttribute("data-scroll") === "down") {
                // scroll down
                header.classList.add("hide");
                header.classList.remove("show");
            } else if (body.getAttribute("data-scroll") === "up") {
                // scroll up
                header.classList.remove("hide");
                header.classList.add("show");

                if (wrap.classList.contains("sticky_exist")) {
                    header.classList.remove("show");
                    header.classList.add("hide");

                    if (secVisualHeight - 1 > scrollT) {
                        header.classList.remove("hide");
                        header.classList.add("show");
                    }
                }
            }
        } else if (scrollT === 0) {
            if (header.classList.contains("show")) {
                header.classList.remove("show");
            }
        }

        currentT = scrollT;
    });
}
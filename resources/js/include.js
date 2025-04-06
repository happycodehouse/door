(async () => {
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

    const hamburger = document.getElementById("hamburger");
    const gnb = document.getElementById("gnb");
    const gnbClone = gnb.cloneNode(true);
    gnbClone.removeAttribute("id");
    const sitemap = document.getElementById("sitemap");
    const dim = document.getElementById("dim");
    const gridGuide = document.getElementById("gridGuide");


    sitemap.querySelector(".gnb_wrap").appendChild(gnbClone);

    const toggleElements = (state) => {
        hamburger.classList.toggle("on", state);
        sitemap.classList.toggle("on", state);
        dim.classList.toggle("on", state);
        door.utils.isSmoothStop(state);
    };

    hamburger.addEventListener("click", () => {
        toggleElements(!hamburger.classList.contains("on"));
    });

    dim.addEventListener("click", () => {
        toggleElements(false);
    });

    document.addEventListener("keyup", function (e) {
        // F9
        if (e.key === "F9") {
            console.log("F9");

            if (!gridGuide.classList.contains("on")) {
                gridGuide.classList.add("on");
            } else {
                gridGuide.classList.remove("on");
            }
        }
    });

    const wrap = document.getElementById("wrap");
    const secVisual = document.querySelector(".sec_intro");
    let secVisualHeight;
    if (secVisual) {
        secVisualHeight = secVisual.clientHeight;
        // console.log(secVisualHeight);

        window.addEventListener("resize", function () {
            secVisualHeight = secVisual.clientHeight;
            console.log(secVisualHeight);
        });
    } else {
        // console.log("no sticky_exist");
    }

    window.addEventListener("scroll", function (e) {
        e.preventDefault();
        scrollT = window.scrollY; // 현재 스크롤 위치 가져오기

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
})();
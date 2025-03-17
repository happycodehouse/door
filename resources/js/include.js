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

    $(window).on("scroll", function () {

    });
})();
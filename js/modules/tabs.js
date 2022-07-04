function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

    const hideContent = () => {
    tabsContent.forEach((item) => {
        item.classList.add("hide");
        item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active");
    });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
        tabs[i].classList.add("tabheader__item_active");
    };

    hideContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
            if (target === item) {
                hideContent();
                showTabContent(i);
            }
            });
        }
    });
}

export default tabs;
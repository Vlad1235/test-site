"user strict";

document.addEventListener("DOMContentLoaded", () => {


    //logic for tabs implementation

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(num = 0) {
        tabsContent[num].classList.add("show", "fade");
        tabsContent[num].classList.remove("hide");
        tabs[num].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        console.log("triggered");

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //logic for timer implementation

    const deadline = "2020-07-01";

    function getTimeRemaining(endtime) {
        const i = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(i / (1000 * 60 * 60 * 24));
        const hours = Math.floor((i / (1000 * 60 * 60) % 24));
        const min = Math.floor((i / 1000 / 60) % 60);
        const sec = Math.floor((i / 1000) % 60);
        return {
            "total": i,
            "days": days,
            "hours": hours,
            "min": min,
            "sec": sec
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else if (num < 0) {
            return `00`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.min);
            seconds.innerHTML = getZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadline);


    //logic to implement listeners on a modal window

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector("[data-close]");


    modalTrigger.forEach(btn => {
        btn.addEventListener("click", openModalLogic);
    });


    modalCloseBtn.addEventListener("click", () => {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    });


    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hide");
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            modal.classList.add("hide");
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });



    // logic to implement popup modal window with timer and while reach the end of the page

    function openModalLogic() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    const modalTimerId = setTimeout(openModalLogic, 5000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalLogic();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);

});
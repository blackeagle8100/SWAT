document.addEventListener("DOMContentLoaded", () => {
    const letters = document.querySelectorAll(".letters > div");
    const hiddenContents = document.querySelectorAll(".hidden-content .panel");
    const lines = document.querySelectorAll(".hr");
    const introOverlay = document.querySelector(".intro-overlay");
    const introLanding = document.querySelector(".intro-landing");

    if (!letters.length || !hiddenContents.length || !introOverlay || !introLanding) {
        return;
    }

    let interval = null;
    let currentIndex = 0;
    let introFinished = false;

    function showPanel(index = currentIndex) {
        hiddenContents.forEach((content) => {
            content.style.display = "none";
            content.style.maxHeight = "0";
        });

        letters.forEach((letter) => {
            letter.style.color = "rgb(57, 255, 20)";
        });

        lines.forEach((line) => {
            line.style.display = "block";
        });

        hiddenContents[index].style.display = "block";

        requestAnimationFrame(() => {
            hiddenContents[index].style.maxHeight =
            hiddenContents[index].scrollHeight + "px";
        });

        letters[index].style.color = "rgb(255, 183, 0)";
        currentIndex = (index + 1) % hiddenContents.length;
    }

    function startCycle() {
        stopCycle();
        interval = setInterval(() => {
            showPanel(currentIndex);
        }, 10000);
    }

    function stopCycle() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function runIntro() {
        showPanel(0);

        requestAnimationFrame(() => {
            introOverlay.classList.add("intro-fall");
        });

        introOverlay.addEventListener("transitionend", () => {
            introOverlay.classList.add("intro-hidden");
            introLanding.classList.add("show");

            setTimeout(() => {
                introOverlay.style.display = "none";
                introFinished = true;
                startCycle();
            }, 700);
        }, { once: true });
    }

    letters.forEach((letter, index) => {
        letter.addEventListener("mouseenter", () => {
            if (!introFinished) return;
            stopCycle();
            showPanel(index);
        });

        letter.addEventListener("mouseleave", () => {
            if (!introFinished) return;
            startCycle();
        });
    });

    runIntro();
});

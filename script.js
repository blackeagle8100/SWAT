document.addEventListener("DOMContentLoaded", function () {
    const letters = document.querySelectorAll(".letters div");
    const hiddenContents = document.querySelectorAll(".hidden-content div");
    const lines = document.querySelectorAll(".hr");

    let interval = null;
    let currentIndex = 0;

    function showCurrentHiddenContent() {
        hiddenContents.forEach((content) => {
            content.style.display = "none";
            content.style.maxHeight = "0";
        });

        lines.forEach((line) => {
            line.style.display = "block";
        });

        letters.forEach((letter) => {
            letter.style.color = "rgb(57, 255, 20)";
        });

        hiddenContents[currentIndex].style.display = "block";
        hiddenContents[currentIndex].style.maxHeight =
        hiddenContents[currentIndex].scrollHeight + "px";

        letters[currentIndex].style.color = "rgb(255, 183, 0)";

        currentIndex = (currentIndex + 1) % letters.length;
    }

    function startCycle() {
        clearInterval(interval);
        interval = setInterval(showCurrentHiddenContent, 10000);
    }

    function stopCycle() {
        clearInterval(interval);
        interval = null;
    }

    showCurrentHiddenContent();
    startCycle();

    letters.forEach((letter, index) => {
        letter.addEventListener("mouseover", function () {
            stopCycle();
            currentIndex = index;
            showCurrentHiddenContent();
        });

        letter.addEventListener("mouseout", function () {
            currentIndex = (index + 1) % letters.length;
            startCycle();
        });
    });


});

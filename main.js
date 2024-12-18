const eyeball = () => {
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientWidth / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotation = (radian * (180 / Math.PI) * -1) + 270;
        eye.style.transform = "rotate(" + rotation + "deg)";
    });
};

const toggleHeart = () => {
    document.getElementById("sneaky-button").classList.toggle("hide");
    document.querySelector(".container").classList.toggle("hide");
    document.querySelectorAll(".after-click").forEach((tag) => {
        tag.classList.remove("hide");
    });
    document.body.style.display = "flex";
    document.body.style.minHeight = "100vh";
    document.body.style.flexDirection = "column";
};

document.querySelector("body").addEventListener("mousemove", eyeball);
document.querySelector("body").addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent scrolling while touching
    eyeball(e);
});

const button = document.querySelector("#sneaky-button");

const getRandomNum = (num) => Math.round(Math.random() * num);

const moveElement = (element, animeType, pixels) => {
    anime({
        targets: element,
        [animeType]: `${pixels}px`,
        easing: "easeOutElastic(1, .5",
    }).play();
};

const quotes = [
    "Oh no",
    "Sorry",
    "I don't love you",
    "Never",
    "Not today",
    "Go away",
    "Leave me alone",
    "I'm busy",
    "Not interested",
    "Maybe later",
];

const getRandomQuote = () => {
    const index = getRandomNum(quotes.length);
    return quotes[index];
};

["mouseover", "click"].forEach(
    (type) => {
        button.addEventListener(type, (e) => {
            let quote = getRandomQuote();
            const initialQuote = button.innerHTML;
            while (quote === initialQuote || !quote) quote = getRandomQuote();

            button.innerHTML = quote;

            let top = getRandomNum(window.innerHeight - button.offsetHeight);
            let left = getRandomNum(window.innerWidth - button.offsetWidth);

            while (
                top + button.offsetHeight > window.innerHeight ||
                left + button.offsetWidth > window.innerWidth
            ) {
                top = getRandomNum(window.innerHeight - button.offsetHeight);
                left = getRandomNum(window.innerWidth - button.offsetWidth);

                // console.log("Go to top: ", top);
                // console.log("Go to left: ", left);
            }
            moveElement(button, "left", left);
            moveElement(button, "top", top);
        });
    },
);

const dangerZone = document.querySelectorAll(".danger-zone"); // Replace with your actual selector

const isOverlapping = (rect, elements) => {
    for (let el of elements) {
        const elRect = el.getBoundingClientRect();
        if (
            rect.left < elRect.right &&
            rect.right > elRect.left &&
            rect.top < elRect.bottom &&
            rect.bottom > elRect.top
        ) {
            return true;
        }
    }
    return false;
};

const setRandomPosition = () => {
    let top, left, rect;
    const quoteWidth = button.offsetWidth;
    const quoteHeight = button.offsetHeight;
    do {
        top = getRandomNum(window.innerHeight - quoteHeight);
        left = getRandomNum(window.innerWidth - quoteWidth);
        rect = {
            top,
            left,
            right: left + quoteWidth,
            bottom: top + quoteHeight,
        };
    } while (
        isOverlapping(rect, dangerZone) ||
        rect.bottom > window.innerHeight ||
        rect.right > window.innerWidth ||
        rect.top < 0 ||
        rect.left < 0
    );

    button.style.position = "absolute";
    button.style.top = `${top}px`;
    button.style.left = `${left}px`;
};

let quote = getRandomQuote();
while (!quote) quote = getRandomQuote();
button.innerHTML = quote;
setRandomPosition();

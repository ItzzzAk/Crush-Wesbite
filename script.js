const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionText = document.getElementById("question");
const subtext = document.getElementById("subtext");
const catImage = document.getElementById("catImage");
const container = document.querySelector(".container");
const celebrationScreen = document.querySelector(".celebration");

let noCount = 0;
let isNoButtonDisabled = false;
let heartInterval;

// Function to create falling hearts
function startFallingHearts(color) {
    clearInterval(heartInterval);
    heartInterval = setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.color = color;
        heart.innerHTML = "❤";
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 200);
}

// Stop falling hearts
function stopFallingHearts() {
    clearInterval(heartInterval);
}

// Handle "No" button clicks (Persistent black hearts)
noBtn.addEventListener("click", () => {
    if (isNoButtonDisabled) return;

    noCount++;
    startFallingHearts("black");

    if (noCount === 1) {
        questionText.innerText = "Are you sure? 😏";
        subtext.innerText = "Matlab... itna attitude? 😜";
        catImage.src = "cat2.gif";
    } else if (noCount === 2) {
        questionText.innerText = "Oye hoye! Phir se soch le 😠";
        subtext.innerText = "Mujhe rulayegi kya? 😢";
        catImage.src = "cat3.gif";
    } else if (noCount >= 3 && noCount < 6) {
        isNoButtonDisabled = true;
        gsap.to(noBtn, { opacity: 0.5, duration: 0.3 });

        setTimeout(() => {
            isNoButtonDisabled = false;
            gsap.to(noBtn, { opacity: 1, duration: 0.3 });
        }, 1500);

        if (noCount === 3) {
            questionText.innerText = "Kya koi mujhse zyada pyar karega? 😭";
            subtext.innerText = "Dil tod diya tune 💔💔";
            catImage.src = "cat4.gif";
        } else if (noCount === 4) {
            questionText.innerText = "Main jaa raha hoon... 💔";
            subtext.innerText = "But tu toh yaad aayegi 🥺";
            catImage.src = "cat5.gif";
        } else if (noCount === 5) {
            questionText.innerText = "Last chance baby! 😳";
            subtext.innerText = "Phir mat kehna regret nahi hua 😏";
            catImage.src = "cat6.gif";
        }
    } else {
        questionText.innerText = "Ab toh haan bolna padega! 🥺❤️";
        subtext.innerText = "NO button bhi chhod ke bhaag gaya! 😂";
        catImage.src = "cat7.gif";

        gsap.to(noBtn, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                noBtn.style.display = "none";
                stopFallingHearts();
            }
        });
    }
});

// Handle "Yes" button click (Infinite Red Hearts)
yesBtn.addEventListener("click", () => {
    gsap.to(container, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        onComplete: () => {
            container.style.display = "none";
            celebrationScreen.classList.remove("hidden");
            celebrationScreen.style.display = "block";
            gsap.fromTo(celebrationScreen, { opacity: 0 }, { opacity: 1, duration: 0.8 });

            startFallingHearts("red");

            // Adding flirty message when 'Yes' is clicked
            celebrationScreen.innerHTML = `
                <img src="cat8.gif" alt="Love Cats">
                <h1>Hehehe, knew you'd say YES! 😘💖</h1>
                <p>Ab toh mujhe lifetime jhelna padega! 😍💑</p>
                <p>Love you more than pizza! 🍕❤️</p>
            `;
        }
    });
});

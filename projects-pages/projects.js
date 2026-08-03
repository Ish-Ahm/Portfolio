// display each image/video's caption text that appears on hover
// (images use their alt text, videos use a data-caption attribute since <video> has no alt)
document.querySelectorAll(".img-wrapper").forEach(wrapper => {
    const media = wrapper.querySelector("img, video");
    const caption = wrapper.querySelector(".img-caption");
    if (media && caption) {
        caption.textContent = media.tagName === "VIDEO" ? media.dataset.caption : media.alt;
    }
});

// toggle the mobile nav menu open/closed when the hamburger icon is clicked
const burger = document.getElementById("burger");
const navList = document.getElementById("nav-list");
if (burger && navList) {
    burger.addEventListener("click", () => {
        navList.classList.toggle("active");
    });

    // close the menu once a link inside it is clicked
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
        });
    });

    // close the menu when clicking anywhere outside it (and outside the burger itself)
    document.addEventListener("click", (event) => {
        if (navList.classList.contains("active") &&
            !navList.contains(event.target) &&
            !burger.contains(event.target)) {
            navList.classList.remove("active");
        }
    });
}

// get modal elements
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("zoomedImage");
const modalVideo = document.getElementById("zoomedVideo"); // only present on pages that have a video
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".close");

// select all images/videos you want to zoom
const mediaEls = document.querySelectorAll(".img-box");

function openModal(src, caption, type) {
    modalCaption.textContent = caption;

    if (type === "video" && modalVideo) {
        modalImg.style.display = "none";
        modalVideo.style.display = "block";
        modalVideo.src = src;
        modalVideo.currentTime = 0;
        modalVideo.play();
    } else {
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.removeAttribute("src");
            modalVideo.style.display = "none";
        }
        modalImg.style.display = "block";
        modalImg.src = src;
    }

    modal.style.display = "flex";
    // force a reflow so the display change takes effect before the "active" class
    // is added, otherwise the opacity/transform transition won't animate
    void modal.offsetWidth;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
    // wait for the fade/scale transition to finish before hiding it
    setTimeout(() => {
        modal.style.display = "none";
        if (modalVideo) {
            modalVideo.pause();
        }
    }, 300);
}

// add click event to each image/video
mediaEls.forEach(media => {
    media.addEventListener("click", () => {
        const wrapper = media.closest(".img-wrapper");
        const caption = wrapper ? wrapper.querySelector(".img-caption").textContent : "";
        const isVideo = media.tagName === "VIDEO";
        openModal(isVideo ? (media.currentSrc || media.src) : media.src, caption, isVideo ? "video" : "image");
    });
});

// close modal when clicking the (X)
closeBtn.addEventListener("click", closeModal);

// close modal when clicking outside image
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

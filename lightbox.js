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
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".close");

// select all gallery images you want to zoom
const images = document.querySelectorAll(".project-gallery img");

function openModal(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption;
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
    }, 300);
}

// add click event to each gallery image
images.forEach(img => {
    img.addEventListener("click", () => {
        openModal(img.src, img.alt);
    });
});

// close modal when clicking the (X)
closeBtn.addEventListener("click", closeModal);

// close modal when clicking outside the image
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

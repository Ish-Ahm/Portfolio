// get modal elements
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("zoomedImage");
const closeBtn = document.querySelector(".close");

// select all images you want to zoom
const images = document.querySelectorAll(".img-box img");

// add click event to each image
images.forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src; // set the clicked image as modal image
    });
});

// close modal when clicking the (X)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// close modal when clicking outside image
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

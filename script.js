  const introText = document.getElementById("intro-text");
  const heroTitle = document.getElementById("hero-title");
  const heroImage = document.getElementById("hero-image");

  let isFirst = true;

  setInterval(() => {
    // Fade out
    introText.classList.add("fade");
    heroTitle.classList.add("fade");
    heroImage.style.opacity = "0";

    setTimeout(() => {
      if (isFirst) {
        // Image 2 content
        introText.textContent = "I BUILD";
        heroTitle.innerHTML = `
          Web <span>Applications</span><br />
          Frontend & Backend
        `;
        heroImage.src = "assets/.jpg";
      } else {
        // Image 1 content
        introText.textContent = "HELLO! THIS IS WANIE";
        heroTitle.innerHTML = `
          Software <span>Developer</span><br />
          Frontend & Backend
        `;
        heroImage.src = "assets/.png";
      }

      isFirst = !isFirst;

      // Fade in
      introText.classList.remove("fade");
      heroTitle.classList.remove("fade");
      heroImage.style.opacity = "1";
    }, 600);

  }, 4000); // change every 4 seconds


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.getElementById("modalGallery");
const modalVideoContainer = document.getElementById("modalVideoContainer");
const modalTech = document.getElementById("modalTech");
const modalRemark = document.getElementById("modalRemark");
const closeBtn = document.querySelector(".close-btn");

const viewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerClose = document.querySelector(".viewer-close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.getElementById("viewerDots");

let currentImages = [];
let currentIndex = 0;

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalTech.textContent = card.dataset.tech;
    modalRemark.textContent = card.dataset.remark || "—";

    

    modalGallery.innerHTML = "";
    modalVideoContainer.innerHTML = "";

    // Video first
    if (card.dataset.video) {
      const video = document.createElement("video");
      video.src = card.dataset.video;
      video.controls = true;
      video.muted = true;
      video.style.width = "100%";
      video.style.marginBottom = "20px";
      modalVideoContainer.appendChild(video);
    }

    // Images
    currentImages = card.dataset.images
      ? card.dataset.images.split(",").map(src => src.trim())
      : [];

    currentImages.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.style.cursor = "pointer";
      img.onclick = () => openViewer(index);
      modalGallery.appendChild(img);
    });
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  modalVideoContainer.innerHTML = "";
};

function openViewer(index) {
  viewer.style.display = "flex";
  currentIndex = index;
  updateViewer();
}

function updateViewer() {
  viewerImage.src = currentImages[currentIndex];
  dotsContainer.innerHTML = "";

  currentImages.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === currentIndex) dot.classList.add("active");
    dot.onclick = () => {
      currentIndex = i;
      updateViewer();
    };
    dotsContainer.appendChild(dot);
  });
}

prevBtn.onclick = () => {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateViewer();
};

nextBtn.onclick = () => {
  currentIndex =
    (currentIndex + 1) % currentImages.length;
  updateViewer();
};

viewerClose.onclick = () => {
  viewer.style.display = "none";
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideoContainer.innerHTML = "";
  }
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.style.display = "none";
  }
});

  const introText = document.getElementById("intro-text");
  const heroTitle = document.getElementById("hero-title");

  let isFirst = true;

  setInterval(() => {
    // Fade out
    introText.classList.add("fade");
    heroTitle.classList.add("fade");

    setTimeout(() => {
      if (isFirst) {
        // Image 2 content
        introText.textContent = "I BUILD";
        heroTitle.innerHTML = `
          Web <span>Applications</span><br />
          Frontend & Backend
        `;
      } else {
        // Image 1 content
        introText.textContent = "HELLO! THIS IS WANIE";
        heroTitle.innerHTML = `
          Software <span>Developer</span><br />
          Frontend & Backend
        `;
      }

      isFirst = !isFirst;

      // Fade in
      introText.classList.remove("fade");
      heroTitle.classList.remove("fade");
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

// Script for skills section animation

const skillSection = document.querySelector("#skills");
const circles = document.querySelectorAll(".circle");

let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;

  circles.forEach(circle => {
    const percent = parseInt(circle.style.getPropertyValue("--percent"));
    const progressCircle = circle.querySelector("circle:last-child");
    const number = circle.querySelector("span");

    const radius = 54;
    const circumference = 2 * Math.PI * radius;

    let start = null;
    const duration = 1800; // 1.8 seconds

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const easeOut = 1 - Math.pow(1 - progress / duration, 3);

      const currentPercent = Math.min(percent * easeOut, percent);
      const offset =
        circumference - (circumference * currentPercent) / 100;

      progressCircle.style.strokeDashoffset = offset;
      number.textContent = Math.floor(currentPercent) + "%";

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        number.textContent = percent + "%";
      }
    }

    requestAnimationFrame(animate);
  });

  skillsAnimated = true;
}

// Trigger when section enters view
window.addEventListener("scroll", () => {
  const sectionTop = skillSection.offsetTop;
  const sectionHeight = skillSection.offsetHeight;

  if (
    window.scrollY + window.innerHeight >
    sectionTop + sectionHeight / 3
  ) {
    animateSkills();
  }
});

// Script for about section animation
const aboutSection = document.querySelector("#about");
const aboutContent = document.querySelector(".about-content");

let aboutAnimated = false;

window.addEventListener("scroll", () => {
  if (aboutAnimated) return;

  const sectionTop = aboutSection.offsetTop;
  const triggerPoint = window.scrollY + window.innerHeight;

  if (triggerPoint > sectionTop + 100) {
    aboutContent.classList.add("show");
    aboutAnimated = true;
  }
});

const skillsHeader = document.querySelectorAll(
  ".skills-section .section-label, .skills-section h2, .skills-section .skills-desc"
);

const projectsHeader = document.querySelectorAll(
  ".projects-section .section-label, .projects-section h2, .projects-section .projects-desc"
);

// Animation for skills and projects headers
let skillsHeaderAnimated = false;
let projectsHeaderAnimated = false;

window.addEventListener("scroll", () => {
  const triggerPoint = window.scrollY + window.innerHeight;

  const skillsTop = document.querySelector("#skills").offsetTop;
  const projectsTop = document.querySelector("#projects").offsetTop;

  if (!skillsHeaderAnimated && triggerPoint > skillsTop + 100) {
    skillsHeader.forEach((el, i) => {
      setTimeout(() => el.classList.add("animate-in"), i * 150);
    });
    skillsHeaderAnimated = true;
  }

  if (!projectsHeaderAnimated && triggerPoint > projectsTop + 100) {
    projectsHeader.forEach((el, i) => {
      setTimeout(() => el.classList.add("animate-in"), i * 150);
    });
    projectsHeaderAnimated = true;
  }
});
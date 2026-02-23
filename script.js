const introText = document.getElementById("intro-text");
const heroTitle = document.getElementById("hero-title");
let isFirst = true;

function switchHeroText() {
  introText.classList.add("fade");
  heroTitle.classList.add("fade");

  setTimeout(() => {
    if (isFirst) {
      introText.textContent = "I BUILD";
      heroTitle.innerHTML = `
        <div class="line line-left">Web <span>Applications</span></div>
        <div class="line line-right">Frontend & Backend</div>
      `;
    } else {
      introText.textContent = "HELLO! THIS IS WANIE";
      heroTitle.innerHTML = `
        <div class="line line-left">Software <span>Developer</span></div>
        <div class="line line-right">Frontend & Backend</div>
      `;
    }
    isFirst = !isFirst;
    introText.classList.remove("fade");
    heroTitle.classList.remove("fade");
  }, 600);
}

setInterval(switchHeroText, 4000);


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

    if (card.dataset.video) {
      const video = document.createElement("video");
      video.src = card.dataset.video;
      video.controls = true;
      video.muted = true;
      video.style.width = "100%";
      video.style.marginBottom = "20px";
      modalVideoContainer.appendChild(video);
    }

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
    const duration = 1800; 

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

const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  //Hero Section Animation
  const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numberOfParticles = 70;

const accentColor = "rgba(178, 187, 141, 0.15)"; 

let mouse = {
  x: null,
  y: null,
  radius: 120
};

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

window.addEventListener("touchmove", function (event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.touches[0].clientX - rect.left;
  mouse.y = event.touches[0].clientY - rect.top;
});

window.addEventListener("touchend", function () {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {

      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 130;

      if (distance < maxDistance) {

        let mouseDistanceA = Math.hypot(
          particlesArray[a].x - mouse.x,
          particlesArray[a].y - mouse.y
        );

        let mouseDistanceB = Math.hypot(
          particlesArray[b].x - mouse.x,
          particlesArray[b].y - mouse.y
        );

        let opacity = 0.08; 

        if (mouseDistanceA < 150 || mouseDistanceB < 150) {
          opacity = 0.25; 
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(178, 187, 141, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

  const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));

  // Contact section animation

  const contactTitle = document.querySelector('.contact-title');

let contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactTitle.classList.add('active');  
      contactObserver.unobserve(contactTitle); 
    }
  });
}, { threshold: 0.5 });

contactObserver.observe(contactTitle);
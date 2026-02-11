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
        heroImage.src = "assets/bg2.jpg";
      } else {
        // Image 1 content
        introText.textContent = "HELLO! THIS IS WANIE";
        heroTitle.innerHTML = `
          Software <span>Developer</span><br />
          Frontend & Backend
        `;
        heroImage.src = "assets/bg.png";
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
  const modalVideo = document.getElementById("modalVideo");
  const modalImages = document.getElementById("modalImages");
  const modalTech = document.getElementById("modalTech");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      modal.style.display = "flex";

      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalTech.textContent = card.dataset.tech;

      // Video
      if (card.dataset.video) {
        modalVideo.src = card.dataset.video;
        modalVideo.style.display = "block";
        modalVideo.play();
      } else {
        modalVideo.style.display = "none";
      }

      // Images
      modalImages.innerHTML = "";
      const images = card.dataset.images.split(",");
      images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        modalImages.appendChild(img);
      });
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  };

  window.onclick = e => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  };

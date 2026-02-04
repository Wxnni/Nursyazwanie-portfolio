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
        introText.textContent = "I DEVELOP";
        heroTitle.innerHTML = `
          Many <span>Things</span><br />
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

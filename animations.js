// Animation effects for Davis Portfolio Template

document.addEventListener("DOMContentLoaded", function () {
  // Cursor glow effect
  const cursorGlow = document.createElement("div");
  cursorGlow.classList.add("cursor-glow");
  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", function (e) {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });

  // Create parallax background
  const parallaxBg = document.createElement("div");
  parallaxBg.classList.add("parallax-bg");
  document.body.appendChild(parallaxBg);

  // Create stars
  for (let i = 0; i < 100; i++) {
    createStar(parallaxBg);
  }

  // Create dust particles
  for (let i = 0; i < 15; i++) {
    createDust(parallaxBg);
  }

  // Create glow effects
  for (let i = 0; i < 5; i++) {
    createGlow(parallaxBg);
  }

  // Add section corners to all sections
  document.querySelectorAll(".section").forEach((section) => {
    addCorners(section);
  });

  // Add scroll animations
  const animatedElements = document.querySelectorAll(
    ".section, .skill-item, .resume-item, .portfolio-item"
  );

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    element.classList.add("animate-ready");
    observer.observe(element);
  });

  // Add typing animation to header
  const typedLogo = document.getElementById("typed-logo");
  if (typedLogo) {
    const text = "Muhammad Ahmad";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typedLogo.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
      } else {
        // Add blinking cursor after typing
        const cursor = document.createElement("span");
        cursor.classList.add("typing-cursor");
        cursor.textContent = "|";
        typedLogo.appendChild(cursor);
      }
    }

    typeWriter();
  }
});

function createStar(parent) {
  const star = document.createElement("div");
  const size = Math.random();

  if (size < 0.3) {
    star.classList.add("parallax-star", "far");
  } else if (size < 0.7) {
    star.classList.add("parallax-star", "mid");
  } else {
    star.classList.add("parallax-star", "front");
  }

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 4 + "s";

  parent.appendChild(star);
}

function createDust(parent) {
  const dust = document.createElement("div");
  dust.classList.add("parallax-dust");

  const size = Math.random() * 100 + 50;
  dust.style.width = size + "px";
  dust.style.height = size + "px";

  dust.style.left = Math.random() * 100 + "%";
  dust.style.top = Math.random() * 100 + "%";
  dust.style.animationDelay = Math.random() * 5 + "s";

  parent.appendChild(dust);
}

function createGlow(parent) {
  const glow = document.createElement("div");
  glow.classList.add("parallax-glow");

  const size = Math.random() * 200 + 100;
  glow.style.width = size + "px";
  glow.style.height = size + "px";

  glow.style.left = Math.random() * 100 + "%";
  glow.style.top = Math.random() * 100 + "%";
  glow.style.animationDelay = Math.random() * 3 + "s";

  parent.appendChild(glow);
}

function addCorners(section) {
  const corners = [
    "corner-top-left",
    "corner-top-right",
    "corner-bottom-left",
    "corner-bottom-right",
  ];

  corners.forEach((corner) => {
    const div = document.createElement("div");
    div.classList.add("section-corner", corner);
    section.appendChild(div);
  });
}

// Add parallax effect to elements
document.addEventListener("mousemove", function (e) {
  const parallaxElements = document.querySelectorAll(
    ".skill-item, .portfolio-item, .resume-item"
  );

  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  parallaxElements.forEach((element) => {
    const offsetX = 15 * (mouseX - 0.5);
    const offsetY = 15 * (mouseY - 0.5);

    element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});

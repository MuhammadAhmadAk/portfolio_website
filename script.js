// Add initialization code at the beginning of the file to ensure the page layout is displayed correctly

// Initialize layout as soon as possible
document.addEventListener("DOMContentLoaded", function () {
  // Initialize profile images
  initProfileImages();

  // Make sure the body is visible
  document.body.style.visibility = "visible";

  // Force layout recalculation to fix any display issues
  void document.body.offsetHeight;

  // Set proper classes for sections to ensure they're visible
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("visible");
  });

  // Ensure images are loaded properly
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete) {
      imgLoaded(img);
    } else {
      img.addEventListener("load", function () {
        imgLoaded(this);
      });
    }
  });

  // Helper function to handle image loading
  function imgLoaded(img) {
    // Add a class to indicate the image is loaded
    img.classList.add("loaded");

    // Trigger layout recalculation
    void img.offsetHeight;
  }

  // Initialize the navigation
  initNavigation();

  // Initialize GitHub section
  initGitHub();
});

// Remove index.html from URL - improved version
(function () {
  // Execute immediately when the script loads
  let currentPath = window.location.pathname;
  if (currentPath.endsWith("index.html")) {
    let newPath = currentPath.replace(/\/index\.html$/i, "/");
    let newUrl =
      window.location.origin +
      newPath +
      window.location.search +
      window.location.hash;
    window.history.replaceState(null, document.title, newUrl);
  }
})();

// Also run this when the DOM is fully loaded to catch any delayed redirects
document.addEventListener("DOMContentLoaded", function () {
  // Check again for index.html in URL
  let currentPath = window.location.pathname;
  if (currentPath.endsWith("index.html")) {
    let newPath = currentPath.replace(/\/index\.html$/i, "/");
    let newUrl =
      window.location.origin +
      newPath +
      window.location.search +
      window.location.hash;
    window.history.replaceState(null, document.title, newUrl);
  }

  // Update all links to remove index.html
  document.querySelectorAll("a").forEach(function (link) {
    let href = link.getAttribute("href");
    if (href && href.indexOf("index.html") >= 0 && !href.startsWith("http")) {
      link.setAttribute("href", href.replace(/\/index\.html($|#|\?)/i, "$1"));
    }

    // Handle hash links to ensure clean URLs
    if (href && href.startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const hash = this.getAttribute("href");
        // Scroll to the element
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
          // Update URL with the hash without page reload
          history.pushState(null, null, hash);
        }
      });
    }
  });
});

// Create .htaccess file for Apache servers to remove index.html
// This won't actually create a file in the browser, but is a reference for server deployment
/*
# .htaccess configuration (add to your server)
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Remove index.html from URLs
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\ /(.*)index\.html\ HTTP/
  RewriteRule ^(.*)index\.html$ /$1 [R=301,L]
  
  # Redirect trailing slash if not a directory
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} (.+)/$
  RewriteRule ^ %1 [R=301,L]
  
  # Append trailing slash to directories
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^(.*[^/])$ $1/ [R=301,L]
  
  # Serve index.html for directories
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^(.*)$ $1/index.html [L]
  
  # Handle URLs without file extensions
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>
*/

// Also ensure URLs are clean when navigating with hash links
document.addEventListener("DOMContentLoaded", function () {
  // Clean up hash links to avoid appending to index.html
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    // Store any existing click listeners
    const originalClickHandler = link.onclick;

    link.onclick = function (e) {
      // If we're on index.html, make sure we're cleaning the URL on navigation
      if (window.location.pathname.includes("index.html")) {
        e.preventDefault();

        // Get the hash from the link
        const hash = this.getAttribute("href");

        // Create a clean URL without index.html
        let cleanPath = window.location.pathname.replace(
          /\/index\.html(\/|$)/i,
          "/"
        );
        if (!cleanPath.endsWith("/") && cleanPath !== "") {
          cleanPath += "/";
        }

        // Create the new URL
        const newUrl = window.location.origin + cleanPath + hash;

        // Update URL and scroll to the element
        window.history.pushState(null, document.title, newUrl);

        // Scroll to the element (with a slight delay to ensure URL is updated first)
        setTimeout(() => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            const headerOffset =
              document.querySelector("#header")?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            // If mobile menu is open, close it after navigation
            const hamburger = document.querySelector(".hamburger");
            const navLinks = document.querySelector(".nav-links");
            if (hamburger && hamburger.classList.contains("active")) {
              hamburger.classList.remove("active");
              navLinks.classList.remove("active");
              document.body.classList.remove("menu-open");
            }
          }
        }, 10);

        return false;
      }

      // Call original handler if it exists
      if (typeof originalClickHandler === "function") {
        return originalClickHandler.call(this, e);
      }
    };
  });
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

// Navbar scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = header.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      history.pushState(null, null, targetId);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    }
  });
});

// Handle browser back/forward navigation
window.addEventListener("popstate", function () {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      const headerOffset = header.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

// Form submission handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log("Form submitted:", data);
    alert("Message Sent! (Placeholder)");
    contactForm.reset();
  });
}

// Add active class to current section in navigation on scroll
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll("#header .nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  const headerHeight = header.offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 50;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });

  if (window.pageYOffset < sections[0].offsetTop - headerHeight - 50) {
    navItems.forEach((item) => item.classList.remove("active"));
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) homeLink.classList.add("active");
    current = "home";
  }

  if (current && current !== window.location.hash.slice(1)) {
    window.history.replaceState(null, null, `#${current}`);
  }
});

// Initial check for active link on page load
function setActiveLinkOnLoad() {
  let current = "";
  const headerHeight = header.offsetHeight;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 50;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });
  if (
    !current &&
    window.pageYOffset < sections[0].offsetTop - headerHeight - 50
  ) {
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) homeLink.classList.add("active");
  }
}

window.addEventListener("load", setActiveLinkOnLoad);

// Profile Image Animation - Creates moving image effect
document.addEventListener("DOMContentLoaded", function () {
  const mainProfile = document.getElementById("main-profile");
  const profileTarget = document.getElementById("profile-target");

  if (!mainProfile || !profileTarget) return;

  let isCloned = false;
  let observer;

  function setupObserver() {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isCloned) {
            createClone();
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(profileTarget);
  }

  function createClone() {
    // Get position data for animation
    const startRect = mainProfile.getBoundingClientRect();
    const targetRect = profileTarget.getBoundingClientRect();

    // Calculate viewport-relative positions
    const startX = startRect.left + window.scrollX;
    const startY = startRect.top + window.scrollY;
    const targetX = targetRect.left + window.scrollX;
    const targetY = targetRect.top + window.scrollY;

    // Create clone element
    const clone = document.createElement("img");
    clone.src = mainProfile.src;
    clone.alt = mainProfile.alt;
    clone.className = "cloned-profile";
    clone.style.opacity = "0";

    // Add to target
    profileTarget.appendChild(clone);

    // Force reflow to ensure styles are applied
    void profileTarget.offsetWidth;

    // Set initial position - fixed positioning for more reliable animation
    clone.style.position = "fixed";
    clone.style.top = startRect.top + "px";
    clone.style.left = startRect.left + "px";
    clone.style.width = startRect.width + "px";
    clone.style.height = startRect.height + "px";
    clone.style.transition = "none";
    clone.style.opacity = "0.1";
    clone.style.zIndex = "1000";

    // Force reflow
    void clone.offsetWidth;

    // Animate to final position
    setTimeout(() => {
      clone.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      clone.style.position = "absolute";
      clone.style.top = "0";
      clone.style.left = "0";
      clone.style.width = "100%";
      clone.style.height = "100%";
      clone.style.opacity = "1";
      clone.style.zIndex = "10";
    }, 50);

    isCloned = true;
    observer.disconnect();
  }

  // Set up observer after a short delay to ensure DOM is ready
  setTimeout(setupObserver, 100);

  // Handle scroll manually for additional checks
  window.addEventListener("scroll", function () {
    if (isCloned) return;

    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();

    // Check if About section is in view
    if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
      createClone();
    }
  });

  // Also ensure animation when page is already scrolled on load
  window.addEventListener("load", function () {
    setTimeout(() => {
      if (!isCloned) {
        const aboutSection = document.getElementById("about");
        if (!aboutSection) return;

        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
          createClone();
        }
      }
    }, 500);
  });
});

// Skills Tab Navigation
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const skillsCategories = document.querySelectorAll(".skills-category");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      skillsCategories.forEach((category) =>
        category.classList.remove("active")
      );

      button.classList.add("active");
      document.getElementById(target).classList.add("active");

      // Immediately animate progress bars when switching tabs
      animateProgressBars(document.getElementById(target));
    });
  });

  if (!document.querySelector(".tab-btn.active")) {
    tabButtons[0]?.classList.add("active");
    const firstTarget = tabButtons[0]?.dataset.target;
    if (firstTarget) {
      document.getElementById(firstTarget)?.classList.add("active");
    }
  }

  // Initialize and animate the default active category
  const activeCategory = document.querySelector(".skills-category.active");
  if (activeCategory) {
    // We need to store the original widths first
    const progressBars = activeCategory.querySelectorAll(".progress-bar span");
    progressBars.forEach((bar) => {
      const targetWidth = bar.style.width;
      bar.dataset.width = targetWidth;
    });
  }

  // Initialize overall progress bars
  initProgressBars();

  // Force animation on page load after a short delay
  setTimeout(() => {
    const activeCategory = document.querySelector(".skills-category.active");
    if (activeCategory) {
      animateProgressBars(activeCategory);
    }
  }, 500);
});

// Progress Bar Animations
function initProgressBars() {
  document.querySelectorAll(".progress-bar span").forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.dataset.width = targetWidth;
    bar.style.width = "0%";
  });

  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    // Use IntersectionObserver if supported
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeCategory = skillsSection.querySelector(
                ".skills-category.active"
              );
              if (activeCategory) {
                animateProgressBars(activeCategory);
              }

              // Ensure we also animate when switching tabs while section is visible
              const tabButtons = document.querySelectorAll(".tab-btn");
              tabButtons.forEach((button) => {
                const originalClickHandler = button.onclick;
                button.onclick = function (e) {
                  if (originalClickHandler) originalClickHandler.call(this, e);

                  // Get the target category
                  const target = this.dataset.target;
                  const targetCategory = document.getElementById(target);

                  // Animate after a small delay to ensure DOM updates
                  setTimeout(() => {
                    animateProgressBars(targetCategory);
                  }, 50);
                };
              });

              // Only unobserve after triggering animations
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 } // Lower threshold for earlier triggering
      );

      observer.observe(skillsSection);
    } else {
      // Fallback for browsers without IntersectionObserver
      window.addEventListener("scroll", function scrollHandler() {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          const activeCategory = skillsSection.querySelector(
            ".skills-category.active"
          );
          if (activeCategory) {
            animateProgressBars(activeCategory);
          }
          // Remove scroll listener after animating
          window.removeEventListener("scroll", scrollHandler);
        }
      });
    }
  }

  // Add resize handler to ensure bars animate properly on window resize
  window.addEventListener("resize", function () {
    const activeCategory = document.querySelector(".skills-category.active");
    if (activeCategory) {
      // Short delay to ensure layout is complete
      setTimeout(() => {
        animateProgressBars(activeCategory);
      }, 100);
    }
  });
}

function animateProgressBars(container) {
  if (!container) return;

  const progressBars = container.querySelectorAll(".progress-bar span");
  if (!progressBars.length) return; // Skip if no progress bars found

  // Reset all progress bars first
  progressBars.forEach((bar) => {
    // Save the target width if it's not already saved
    if (!bar.dataset.width && bar.style.width) {
      bar.dataset.width = bar.style.width;
    }

    // Force no transition for immediate reset
    bar.style.transition = "none";
    bar.style.width = "0%";

    // Remove any existing animation classes
    bar.classList.remove("animating");
  });

  // Force reflow to ensure the reset is applied before animation starts
  void container.offsetHeight;

  // Animate each progress bar with a staggered delay
  progressBars.forEach((bar, index) => {
    const targetWidth = bar.dataset.width;

    if (!targetWidth || targetWidth === "0%") {
      console.warn("No target width found for progress bar", bar);
      return; // Skip if no target width is defined or it's zero
    }

    // Add animating class to better track animation state
    bar.classList.add("animating");

    // Use setTimeout to ensure animations are staggered
    setTimeout(() => {
      // First make sure the width is actually 0 before animating
      bar.style.width = "0%";

      // Force reflow again
      void container.offsetHeight;

      // Now apply the transition and animate to target width
      bar.style.transition = "width 1.5s cubic-bezier(0.1, 0.45, 0.1, 1)";
      bar.style.width = targetWidth;

      // After animation completes, ensure the width is set correctly
      setTimeout(() => {
        bar.classList.remove("animating");

        // Make sure the width is still correct (in case the animation didn't complete)
        if (bar.style.width !== targetWidth) {
          bar.style.width = targetWidth;
        }
      }, 1600); // slightly longer than the transition
    }, 50 * index);
  });

  // Debug log
  console.log(
    "Animating progress bars for",
    container.id,
    "with",
    progressBars.length,
    "bars"
  );
}

// Theme Switcher
document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = themeToggleBtn.querySelector("i");

  const savedTheme = localStorage.getItem("theme");
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else if (prefersDarkScheme) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggleBtn.addEventListener("click", function () {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    const activeCategory = document.querySelector(".skills-category.active");
    if (activeCategory) {
      animateProgressBars(activeCategory);
    }
  });

  // Add global function for manually triggering progress bar animation
  window.animateAllSkillBars = function () {
    console.log("Manually triggering progress bar animation");
    const activeCategory = document.querySelector(".skills-category.active");
    if (activeCategory) {
      animateProgressBars(activeCategory);
      return true;
    } else {
      console.warn("No active skill category found");
      const firstCategory = document.querySelector(".skills-category");
      if (firstCategory) {
        console.log("Animating first category:", firstCategory.id);
        animateProgressBars(firstCategory);
        return true;
      }
      return false;
    }
  };

  // Add global function to animate a specific category by ID
  window.animateSkillCategory = function (categoryId) {
    const category = document.getElementById(categoryId);
    if (category && category.classList.contains("skills-category")) {
      console.log("Animating category:", categoryId);
      animateProgressBars(category);
      return true;
    } else {
      console.warn("Category not found or not a skills category:", categoryId);
      return false;
    }
  };

  // Add click listener to skills section to trigger animation on click
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    skillsSection.addEventListener("click", function (e) {
      // Only trigger if clicking directly on the section, not on children
      if (e.target === skillsSection) {
        console.log("Skills section clicked, triggering animation");
        window.animateAllSkillBars();
      }
    });
  }
});

// GitHub Contribution Grid Generation and Animation
document.addEventListener("DOMContentLoaded", function () {
  const contributionGrid = document.getElementById("contribution-grid");

  if (!contributionGrid) return;

  // We'll initialize the grid but the real data will come from the API
  initContributionGrid(contributionGrid);
  animateGitHubStats();

  // Set up event listeners for the contribution cells
  setupContributionCellEvents(contributionGrid);
});

function initContributionGrid(grid) {
  grid.innerHTML = "";
  const weeks = 52;
  const days = 7;
  const totalCells = weeks * days;

  // Create empty cells (will be populated with real data later)
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "contribution-cell";
    cell.classList.add("level-0");
    cell.dataset.count = "0";
    cell.dataset.date = new Date().toDateString();

    cell.style.opacity = "0";
    setTimeout(() => {
      cell.style.transition =
        "opacity 0.5s ease, transform 0.3s ease, background-color 0.5s ease";
      cell.style.opacity = "1";
    }, i * 5);

    grid.appendChild(cell);
  }
}

// Function to process GitHub events and create a contribution heatmap
function displayRealContributions(events) {
  const contributionGrid = document.getElementById("contribution-grid");
  if (!contributionGrid) return;

  // Create a map to store contributions by date
  const contributionMap = {};

  // Get date range - focus on past year for full grid
  const today = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(today.getFullYear() - 1);

  // Also track last 30 days specifically
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  // Track total recent contributions (last 30 days)
  let recentContributions = 0;

  // Initialize all dates in the past year with 0 contributions
  for (let d = new Date(pastYear); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    contributionMap[dateStr] = 0;
  }

  // Process events to count contributions by date
  events.forEach((event) => {
    if (isContributionEvent(event)) {
      const date = event.created_at.split("T")[0];
      if (contributionMap[date] !== undefined) {
        contributionMap[date]++;

        // Check if this is a recent contribution (last 30 days)
        const eventDate = new Date(date);
        if (eventDate >= last30Days) {
          recentContributions++;
        }
      }
    }
  });

  // Display recent contributions count
  const recentContributionsEl = document.getElementById("recent-contributions");
  if (recentContributionsEl) {
    recentContributionsEl.textContent = recentContributions;
  }

  // Map the contribution count to intensity levels (0-4)
  const contributions = Object.values(contributionMap);
  const maxCount = Math.max(...contributions, 1);
  const dates = Object.keys(contributionMap);

  // Update grid cells with real data
  const cells = contributionGrid.querySelectorAll(".contribution-cell");
  cells.forEach((cell, index) => {
    if (index < dates.length) {
      const date = dates[index];
      const count = contributionMap[date];
      let level = 0;

      if (count > 0) {
        // Map count to level 1-4 based on intensity
        level = Math.ceil((count / maxCount) * 4);
        if (level > 4) level = 4;
      }

      cell.className = `contribution-cell level-${level}`;
      cell.dataset.count = count;
      cell.dataset.date = new Date(date).toDateString();

      // Highlight recent contributions (last 30 days)
      const cellDate = new Date(date);
      if (cellDate >= last30Days) {
        cell.classList.add("recent-contribution");
      }
    }
  });

  // Setup the tooltip events after updating the cells
  setupContributionCellEvents(contributionGrid);
}

// Helper function to determine if an event is a contribution
function isContributionEvent(event) {
  const contributionTypes = [
    "PushEvent",
    "PullRequestEvent",
    "IssuesEvent",
    "CommitCommentEvent",
    "CreateEvent",
    "PullRequestReviewEvent",
  ];

  return contributionTypes.includes(event.type);
}

function setupContributionCellEvents(grid) {
  const cells = grid.querySelectorAll(".contribution-cell");
  const tooltip = document.getElementById("contribution-tooltip");

  if (!tooltip) return;

  const tooltipDate = tooltip.querySelector(".tooltip-date");
  const tooltipCount = tooltip.querySelector(".tooltip-count");

  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", function (e) {
      const count = parseInt(this.dataset.count) || 0;
      const date = this.dataset.date;

      // Update tooltip content
      tooltipDate.textContent = date;
      tooltipCount.textContent =
        count === 1 ? "1 contribution" : `${count} contributions`;

      // Position the tooltip
      tooltip.style.display = "block";
      tooltip.style.left = `${e.pageX + 15}px`;
      tooltip.style.top = `${e.pageY + 15}px`;
    });

    cell.addEventListener("mousemove", function (e) {
      tooltip.style.left = `${e.pageX + 15}px`;
      tooltip.style.top = `${e.pageY + 15}px`;
    });

    cell.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });
}

function animateGitHubStats() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = document.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            const targetValue = parseInt(stat.textContent);
            animateCounter(stat, 0, targetValue, 1500);
            stat.classList.add("animate-count");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const githubStats = document.querySelector(".github-stats");
  if (githubStats) observer.observe(githubStats);
}

function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const hasPlus = element.textContent.includes("+");
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = hasPlus ? `${currentValue}+` : currentValue;
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

// Display GitHub repositories
async function displayRepositories(repositories) {
  const reposContainer = document.getElementById("repos-container");
  if (!reposContainer) return;

  reposContainer.innerHTML = "";

  let totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );
  document.getElementById("github-stars").textContent = totalStars;

  repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);

  repositories.slice(0, 3).forEach((repo) => {
    const repoElement = document.createElement("div");
    repoElement.className = "repo-card";
    const languageColor = getLanguageColor(repo.language);

    repoElement.innerHTML = `
      <div class="repo-header">
        <h4>${repo.name}</h4>
        <span class="repo-visibility">${
          repo.private ? "Private" : "Public"
        }</span>
      </div>
      <p>${repo.description || "No description available"}</p>
      <div class="repo-footer">
        ${
          repo.language
            ? `<span class="repo-lang"><span class="lang-color" style="background-color: ${languageColor}"></span>${repo.language}</span>`
            : ""
        }
        <span class="repo-stars"><i class="fas fa-star"></i> ${
          repo.stargazers_count
        }</span>
        <span class="repo-forks"><i class="fas fa-code-branch"></i> ${
          repo.forks_count
        }</span>
      </div>
    `;

    repoElement.addEventListener("click", () =>
      window.open(repo.html_url, "_blank")
    );
    reposContainer.appendChild(repoElement);
  });
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Rust: "#dea584",
    Dart: "#00B4AB",
  };
  return colors[language] || "#6e7781";
}

// Update GitHub data fetching to use public API only (no token)
async function fetchGitHubData(username) {
  console.log("Fetching GitHub data for:", username);

  try {
    // Check if GitHub elements exist
    const githubLoader = document.querySelector(".github-loader");
    const githubContent = document.querySelector(".github-content");

    if (!githubLoader || !githubContent) {
      console.error("GitHub UI elements not found");
      return null;
    }

    // Show loading state and hide content
    githubLoader.style.display = "flex";
    githubContent.style.opacity = "0.5";

    // Debug - log API call
    console.log(`Calling GitHub API for user: ${username}`);

    // Use public API without authentication
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!userResponse.ok) {
      console.error("GitHub API error:", userResponse.status);
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    console.log("Successfully fetched user data");
    const userData = await userResponse.json();

    // Update basic user info immediately to show progress
    updateGitHubUI({
      name: userData.name || username,
      login: userData.login,
      avatar_url: userData.avatar_url,
      bio: userData.bio || "No bio available",
      followers: userData.followers,
      following: userData.following,
      public_repos: userData.public_repos,
      html_url: userData.html_url,
    });

    // Fetch repositories without authentication
    console.log("Fetching repositories...");
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=30`
    );

    if (!reposResponse.ok) {
      console.error("Failed to fetch repositories:", reposResponse.status);
      // Continue with partial data
    }

    const repos = reposResponse.ok ? await reposResponse.json() : [];

    // Count stars from repos
    let totalStars = 0;
    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
    });

    // Update repos count and stars
    document.getElementById("github-stars").textContent = totalStars;

    // Fetch events for contribution data
    console.log("Fetching activity events...");
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=30`
    );

    if (!eventsResponse.ok) {
      console.error("Failed to fetch events:", eventsResponse.status);
      // Continue with partial data
    }

    const events = eventsResponse.ok ? await eventsResponse.json() : [];

    // Count commits
    let totalCommits = 0;
    if (events.length > 0) {
      const commitEvents = events.filter(
        (event) =>
          event.type === "PushEvent" || event.type === "CommitCommentEvent"
      );

      commitEvents.forEach((event) => {
        if (
          event.type === "PushEvent" &&
          event.payload &&
          event.payload.commits
        ) {
          totalCommits += event.payload.commits.length;
        } else {
          totalCommits += 1;
        }
      });

      document.getElementById(
        "github-commits"
      ).textContent = `${totalCommits}+`;
    } else {
      // Use an approximation based on public repos
      document.getElementById("github-commits").textContent = `${
        userData.public_repos * 5
      }+`;
    }

    // Process events for contribution graph
    if (events.length > 0) {
      displayRealContributions(events);
    } else {
      // Generate placeholder contribution data
      generatePlaceholderContributions(contributionGrid);
    }

    // Display repositories
    if (typeof displayRepositories === "function" && repos.length > 0) {
      displayRepositories(repos);
    }

    // Update profile link
    const profileLink = document.getElementById("github-profile-link");
    if (profileLink && userData.html_url) {
      profileLink.href = userData.html_url;
    }

    // Hide loader and show content with animation
    githubLoader.style.display = "none";
    githubContent.style.opacity = "1";
    console.log("GitHub data loaded successfully");

    return { userData, repos, events };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);

    // Update UI with error state
    const githubLoader = document.querySelector(".github-loader");
    const githubContent = document.querySelector(".github-content");

    if (githubLoader) githubLoader.style.display = "none";
    if (githubContent) githubContent.style.opacity = "1";

    document.getElementById("github-name").textContent = "Error loading data";
    document.getElementById("github-bio").textContent =
      "Could not access GitHub API. Rate limit might be exceeded.";

    return null;
  }
}

// Generate placeholder contributions when real data isn't available
function generatePlaceholderContributions(grid) {
  if (!grid) {
    grid = document.getElementById("contribution-grid");
    if (!grid) return;
  }

  // Clear existing content
  grid.innerHTML = "";

  const weeks = 52;
  const days = 7;
  const totalCells = weeks * days;

  // Generate random contribution data
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "contribution-cell";

    // Random level between 0-4
    const level = Math.floor(Math.random() * 5);
    cell.classList.add(`level-${level}`);

    // Random count based on level
    const count = level === 0 ? 0 : Math.floor(Math.random() * 5) + level * 3;
    cell.dataset.count = count.toString();

    // Generate date for cell
    const date = new Date();
    date.setDate(date.getDate() - (totalCells - i));
    cell.dataset.date = date.toDateString();

    // Add animation
    cell.style.opacity = "0";
    setTimeout(() => {
      cell.style.transition =
        "opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease";
      cell.style.opacity = "1";
    }, i * 3);

    grid.appendChild(cell);
  }

  // Setup event listeners for tooltip
  setupContributionCellEvents(grid);
}

// Helper function to update the GitHub UI elements
function updateGitHubUI(userData) {
  if (!userData) return;

  // Update basic profile information
  if (userData.name)
    document.getElementById("github-name").textContent = userData.name;
  if (userData.login)
    document.getElementById(
      "github-username"
    ).textContent = `@${userData.login}`;
  if (userData.bio)
    document.getElementById("github-bio").textContent = userData.bio;
  if (userData.followers)
    document.getElementById("github-followers").textContent =
      userData.followers;
  if (userData.following)
    document.getElementById("github-following").textContent =
      userData.following;
  if (userData.public_repos)
    document.getElementById("github-repos").textContent = userData.public_repos;

  // Update profile image if available
  if (userData.avatar_url) {
    const avatar = document.getElementById("github-avatar");
    if (avatar) {
      avatar.src = userData.avatar_url;
      // Preload image
      const img = new Image();
      img.onload = function () {
        avatar.src = userData.avatar_url;
      };
      img.src = userData.avatar_url;
    }
  }
}

// Initialize GitHub section data with dummy data
function initGitHub() {
  const username = "MuhammadAhmadAk";
  console.log("Initializing GitHub section with dummy data for:", username);

  // Check for required elements
  const githubSection = document.getElementById("github");
  if (!githubSection) {
    console.error("GitHub section not found in the DOM");
    return;
  }

  const contributionGrid = document.getElementById("contribution-grid");
  const githubLoader = document.querySelector(".github-loader");
  const githubContent = document.querySelector(".github-content");

  if (!githubLoader || !githubContent) {
    console.error(
      "GitHub section is missing required elements (loader or content container)"
    );
    return;
  }

  // Show loader temporarily
  githubLoader.style.display = "flex";
  githubContent.style.opacity = "0";

  // Use dummy data instead of API calls
  setTimeout(() => {
    // Hide loader and show content
    githubLoader.style.display = "none";
    githubContent.style.opacity = "1";

    // Apply dummy data to UI
    applyDummyGitHubData();

    // Initialize contribution grid with dummy data
    if (contributionGrid) {
      generatePlaceholderContributions(contributionGrid);
    }

    // Animate stats
    animateGitHubStats();
  }, 1000); // Simulate loading for 1 second
}

// Apply dummy GitHub data to the UI
function applyDummyGitHubData() {
  const dummyData = {
    name: "Muhammad Ahmad",
    login: "MuhammadAhmadAk",
    avatar_url: "profile.png", // Use existing profile image
    bio: "Mobile & Web Developer | Flutter | React Native | JavaScript",
    followers: 58,
    following: 42,
    public_repos: 25,
    stars: 76,
    commits: 437,
    recent_contributions: 37,
  };

  // Update UI with dummy data
  document.getElementById("github-name").textContent = dummyData.name;
  document.getElementById(
    "github-username"
  ).textContent = `@${dummyData.login}`;
  document.getElementById("github-bio").textContent = dummyData.bio;
  document.getElementById("github-followers").textContent = dummyData.followers;
  document.getElementById("github-following").textContent = dummyData.following;
  document.getElementById("github-repos").textContent = dummyData.public_repos;
  document.getElementById("github-stars").textContent = dummyData.stars;
  document.getElementById(
    "github-commits"
  ).textContent = `${dummyData.commits}+`;
  document.getElementById("recent-contributions").textContent =
    dummyData.recent_contributions;

  // Update profile image
  const avatar = document.getElementById("github-avatar");
  if (avatar) {
    avatar.src = dummyData.avatar_url;
  }

  // Update profile link
  const profileLink = document.getElementById("github-profile-link");
  if (profileLink) {
    profileLink.href = `https://github.com/${dummyData.login}`;
  }

  // Create dummy repository cards
  const dummyRepos = [
    {
      name: "flutter-shopping-app",
      description: "A beautiful shopping app UI built with Flutter",
      language: "Dart",
      stargazers_count: 28,
      forks_count: 12,
      html_url: `https://github.com/${dummyData.login}/flutter-shopping-app`,
    },
    {
      name: "react-native-social",
      description: "Social media app template using React Native",
      language: "JavaScript",
      stargazers_count: 32,
      forks_count: 18,
      html_url: `https://github.com/${dummyData.login}/react-native-social`,
    },
    {
      name: "task-tracker-app",
      description: "Advanced task management application with Flutter",
      language: "Dart",
      stargazers_count: 16,
      forks_count: 7,
      html_url: `https://github.com/${dummyData.login}/task-tracker-app`,
    },
  ];

  // Display repositories if function exists
  if (typeof displayRepositories === "function") {
    displayRepositories(dummyRepos);
  }
}

// Setup tooltip styling
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `
    #contribution-tooltip {
      position: absolute;
      background-color: var(--card-bg);
      color: var(--text-color);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--border-color);
      pointer-events: none;
    }
    
    #contribution-tooltip .tooltip-date {
      display: block;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    #contribution-tooltip .tooltip-count {
      display: block;
      color: var(--primary-color);
      font-weight: 500;
    }
    
    #contribution-tooltip .tooltip-badge {
      display: inline-block;
      background-color: var(--primary-color);
      color: #111;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 10px;
      margin-top: 6px;
    }
  `;
  document.head.appendChild(style);
});

// RESPONSIVE FUNCTIONALITY
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
  // Handle Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close mobile menu when nav link is clicked (on mobile only)
    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove("active");
          navLinks.classList.remove("active");
          document.body.classList.remove("menu-open");
        }
      });
    });
  }

  // Handle viewport changes for responsive elements
  function handleViewportChanges() {
    // Adjust GitHub contribution grid columns based on viewport width
    const grid = document.querySelector(".contribution-grid");
    if (grid) {
      if (window.innerWidth <= 375) {
        grid.style.gridTemplateColumns = "repeat(20, 1fr)";
      } else if (window.innerWidth <= 576) {
        grid.style.gridTemplateColumns = "repeat(26, 1fr)";
      } else if (window.innerWidth <= 768) {
        grid.style.gridTemplateColumns = "repeat(35, 1fr)";
      } else if (window.innerWidth <= 992) {
        grid.style.gridTemplateColumns = "repeat(45, 1fr)";
      } else {
        grid.style.gridTemplateColumns = "repeat(52, 1fr)"; // Default
      }
    }

    // Add touch-device class to portfolio items on touch devices
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    portfolioItems.forEach((item) => {
      if (isTouchDevice) {
        item.classList.add("touch-device");
      } else {
        item.classList.remove("touch-device");
      }
    });
  }

  // Call responsive handler on load and resize
  handleViewportChanges();
  window.addEventListener("resize", handleViewportChanges);

  // Smooth scroll for anchor links (adjusting for header height)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerHeight =
          document.querySelector("#header")?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Fix viewport height issue on mobile browsers
  function setVHVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // Initialize and update on resize/orientation change
  setVHVariable();
  window.addEventListener("resize", setVHVariable);
  window.addEventListener("orientationchange", setVHVariable);

  // Use ResizeObserver for more responsive adjustments if needed
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === document.documentElement) {
          setVHVariable();
          handleViewportChanges();
        }
      }
    });

    resizeObserver.observe(document.documentElement);
  }
});

// Advanced Parallax Effect Implementation
document.addEventListener("DOMContentLoaded", function () {
  // Check if we should use lightweight parallax
  if (shouldUseLightParallax()) {
    initLightParallax();
  } else {
    // Initialize normal parallax with reduced elements
    initOptimizedParallax();
  }

  // Only initialize corners if not on a low-end device
  if (!shouldUseLightParallax()) {
    initSectionCorners();
  }
});

// Detect if we should use light parallax
function shouldUseLightParallax() {
  // Check for mobile devices
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Return true if either condition is met
  return isMobile || prefersReducedMotion;
}

// Super lightweight version for mobile/low-end devices
function initLightParallax() {
  // Create a simple background with minimal stars - no animations
  const container = document.body;
  const starCount = 20;

  // Create static stars with CSS animations only
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "parallax-star static";

    // Random position
    star.style.width = "2px";
    star.style.height = "2px";
    star.style.position = "fixed";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = `${Math.random() * 0.5 + 0.2}`;
    star.style.backgroundColor = "var(--primary-color)";
    star.style.borderRadius = "50%";
    star.style.zIndex = "-1";

    // Add to body
    container.appendChild(star);
  }
}

// Variables for parallax with reduced scope
let lastScrollTop = 0;
let scrollDirection = 0;
let scrollSpeed = 0;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let animationFrame = null;

function initOptimizedParallax() {
  // Create fewer elements for better performance
  createOptimizedStars(10); // Far fewer stars

  // Add cursor effect
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  cursorGlow.style.opacity = "0.3"; // Lower opacity
  document.body.appendChild(cursorGlow);

  // Set up throttled event listeners
  setupThrottledEvents(cursorGlow);

  // Start animation loop
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(updateOptimizedParallax);
  }
}

function createOptimizedStars(count) {
  // Create a single container for all stars
  const container = document.createElement("div");
  container.className = "parallax-bg";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.zIndex = "-1";
  container.style.pointerEvents = "none";

  // Add to body
  document.body.appendChild(container);

  // Create stars with varied depths
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2 + 1;
    const depth = Math.random() * 0.8 + 0.2; // 0.2 to 1

    star.className = "parallax-star";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.position = "absolute";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.backgroundColor = "var(--primary-color)";
    star.style.borderRadius = "50%";
    star.style.opacity = `${Math.random() * 0.5 + 0.3}`;
    star.style.transition = "transform 0.1s ease-out";

    // Store depth for parallax effect
    star.dataset.depth = depth;

    // Add to container
    container.appendChild(star);
  }
}

// Throttle function to limit event frequency
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function setupThrottledEvents(cursorGlow) {
  // Throttled mouse move handler - 60fps (16ms)
  document.addEventListener(
    "mousemove",
    throttle(function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update cursor glow directly
      cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, 16)
  );

  // Throttled scroll handler
  window.addEventListener(
    "scroll",
    throttle(function () {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      scrollDirection = st > lastScrollTop ? 1 : -1;
      scrollSpeed = Math.min(Math.abs(st - lastScrollTop) * 0.02, 4);
      lastScrollTop = st <= 0 ? 0 : st;
    }, 32)
  ); // Less frequent updates for scroll

  // Window resize
  window.addEventListener(
    "resize",
    throttle(function () {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    }, 100)
  ); // Very infrequent resize updates
}

function updateOptimizedParallax() {
  // Skip frames for better performance - update every other frame
  if (Math.random() > 0.5) {
    animationFrame = requestAnimationFrame(updateOptimizedParallax);
    return;
  }

  // Calculate relative mouse position (-1 to 1)
  const mouseXPercent = (mouseX / windowWidth - 0.5) * 2;
  const mouseYPercent = (mouseY / windowHeight - 0.5) * 2;

  // Update stars with reduced calculations
  const stars = document.querySelectorAll(".parallax-star");
  stars.forEach((star) => {
    const depth = parseFloat(star.dataset.depth) || 0.5;

    // Calculate offsets with reduced movement
    const offsetX = mouseXPercent * depth * 10;
    const offsetY = mouseYPercent * depth * 10;

    // Apply transform with hardware acceleration
    star.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  });

  // Decay scroll speed quickly
  scrollSpeed *= 0.9;

  // Continue loop
  animationFrame = requestAnimationFrame(updateOptimizedParallax);
}

function initSectionCorners() {
  // Simplified corner initialization - only two corners per section
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    // Only add if not already present
    if (section.querySelector(".section-corner")) return;

    // Add only top-left and bottom-right corners
    ["corner-top-left", "corner-bottom-right"].forEach((cornerClass) => {
      const corner = document.createElement("div");
      corner.className = `section-corner ${cornerClass}`;
      section.appendChild(corner);
    });
  });

  // Add scroll-based reveal for corners instead of mouse tracking
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".section-corner").forEach((corner) => {
            corner.classList.add("active");
          });
        } else {
          entry.target.querySelectorAll(".section-corner").forEach((corner) => {
            corner.classList.remove("active");
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe sections
  sections.forEach((section) => observer.observe(section));
}

function updateSectionCorners(mouseXPercent, mouseYPercent) {
  // This function is no longer needed as we use IntersectionObserver
  // It's kept here as a placeholder for backward compatibility
}

// Typing Effect for headings
function runTypingEffect() {
  const headings = document.querySelectorAll("h1, h2, h3");

  headings.forEach((heading) => {
    // Only apply if not already processed
    if (heading.getAttribute("data-typed") === "true") return;

    const text = heading.innerText;
    heading.innerText = "";
    heading.setAttribute("data-typed", "true");

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        heading.innerText += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
  });
}

// Smooth scroll to section when clicking on navigation links
document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  }
});

// Intersection Observer for revealing elements on scroll
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Run typing effect when heading comes into view
          if (entry.target.tagName.match(/^H[1-3]$/i)) {
            runTypingEffect();
          }
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all sections and headings
  document.querySelectorAll(".section, h1, h2, h3").forEach((el) => {
    observer.observe(el);
  });
});

// Initialize on load
window.addEventListener("load", function () {
  // Run typing effect on initial visible elements
  runTypingEffect();

  // Force animation of progress bars on window load
  setTimeout(() => {
    console.log("Window loaded - triggering progress bar animation");
    const activeCategory = document.querySelector(".skills-category.active");
    if (activeCategory) {
      console.log("Animating active category:", activeCategory.id);
      animateProgressBars(activeCategory);
    } else {
      console.warn("No active skill category found on window load");
      const firstCategory = document.querySelector(".skills-category");
      if (firstCategory) {
        console.log("Animating first category:", firstCategory.id);
        animateProgressBars(firstCategory);
      }
    }
  }, 100);
});

// Preloader
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.classList.add("preloader-finish");
  }
});

// Animation and section transitions
document.addEventListener("DOMContentLoaded", function () {
  // Add background elements to body
  const body = document.body;
  const bgElements = `
    <div class="bg-element bg-element-1"></div>
    <div class="bg-element bg-element-2"></div>
    <div class="bg-element bg-element-3"></div>
  `;
  body.insertAdjacentHTML("afterbegin", bgElements);

  // Add scroll indicator to hero section
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.insertAdjacentHTML(
      "beforeend",
      '<div class="scroll-indicator"></div>'
    );
  }

  // Add highlight class to headings
  const headings = document.querySelectorAll("h1, h2");
  headings.forEach((heading) => {
    if (!heading.classList.contains("animated-heading")) {
      heading.classList.add("animated-heading");
      const text = heading.innerHTML;
      const words = text.split(" ");
      if (words.length > 1) {
        const lastWord = words.pop();
        heading.innerHTML =
          words.join(" ") + ' <span class="highlight">' + lastWord + "</span>";
      }
    }
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll(".section");

  function checkSections() {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.classList.add("visible");

        // Animate skill bars if they exist in this section
        const skillBars = section.querySelectorAll(".skill-progress");
        if (skillBars.length > 0) {
          setTimeout(() => {
            skillBars.forEach((bar) => {
              bar.classList.add("animate");
            });
          }, 300);
        }
      }
    });
  }

  // Check sections on initial load
  setTimeout(checkSections, 100);

  // Check sections on scroll
  window.addEventListener("scroll", checkSections);

  // Add parallax effect
  let lastScrollY = window.scrollY;

  function parallaxScroll() {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 1 : -1;
    const bgElements = document.querySelectorAll(".bg-element");

    bgElements.forEach((el, index) => {
      const speed = 0.05 * (index + 1);
      const yPos = direction * speed * Math.abs(currentScrollY - lastScrollY);
      const currentTransform = window.getComputedStyle(el).transform;

      if (currentTransform !== "none") {
        const matrix = new DOMMatrix(currentTransform);
        el.style.transform = `translate(${matrix.m41}px, ${
          matrix.m42 + yPos
        }px) scale(${matrix.m11})`;
      }
    });

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", parallaxScroll);
});

// Initialize navigation function that was accidentally removed
function initNavigation() {
  // Ensure hamburger menu is properly initialized
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");

  if (hamburger && mainNav) {
    console.log("Initializing navigation menu");

    // Make sure hamburger is visible on small screens
    if (window.innerWidth <= 991) {
      hamburger.style.display = "block";
      hamburger.style.opacity = "1";
      hamburger.style.visibility = "visible";
      hamburger.style.zIndex = "1010";

      // Ensure main nav is properly configured
      mainNav.style.position = "fixed";
      mainNav.style.zIndex = "1000";
    }
  }
}

// Function to initialize profile images with effects (accidentally removed)
function initProfileImages() {
  console.log("Initializing profile images");

  // Add glow effect to profile images
  const profileImages = document.querySelectorAll(
    ".home-image img, .about-image img"
  );

  profileImages.forEach((img) => {
    // Ensure image is visible
    img.style.opacity = "1";
    img.style.visibility = "visible";

    // Make sure circular styling is applied
    img.style.borderRadius = "50%";
    img.style.border = "5px solid var(--primary-color)";
    img.style.boxShadow = "0 0 30px rgba(var(--primary-color-rgb), 0.4)";
    img.style.width = "280px";
    img.style.height = "280px";
    img.style.objectFit = "cover";
    img.style.zIndex = "5";

    // Add hover effect
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.boxShadow = "0 0 35px rgba(var(--primary-color-rgb), 0.6)";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 0 30px rgba(var(--primary-color-rgb), 0.4)";
    });
  });

  // Add decorative elements to image containers
  const imageContainers = document.querySelectorAll(
    ".home-image, .about-image"
  );
  imageContainers.forEach((container) => {
    // Ensure container is properly styled
    container.style.position = "relative";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.overflow = "visible";

    // Add decorative circles
    addDecorativeCircles(container);
  });
}

// Helper function to add decorative circles around profile images
function addDecorativeCircles(container) {
  // Create glowing background circle
  if (!container.querySelector(".bg-circle")) {
    const bgCircle = document.createElement("div");
    bgCircle.className = "bg-circle";
    bgCircle.style.position = "absolute";
    bgCircle.style.width = "90%";
    bgCircle.style.height = "90%";
    bgCircle.style.backgroundColor = "rgba(var(--primary-color-rgb), 0.1)";
    bgCircle.style.borderRadius = "50%";
    bgCircle.style.zIndex = "1";
    bgCircle.style.left = "50%";
    bgCircle.style.top = "50%";
    bgCircle.style.transform = "translate(-50%, -50%)";
    bgCircle.style.animation = "pulse 3s infinite alternate";

    // Insert the background circle
    container.insertBefore(bgCircle, container.firstChild);
  }

  // Create rotating dashed circle
  if (!container.querySelector(".dashed-circle")) {
    const dashedCircle = document.createElement("div");
    dashedCircle.className = "dashed-circle";
    dashedCircle.style.position = "absolute";
    dashedCircle.style.width = "70%";
    dashedCircle.style.height = "70%";
    dashedCircle.style.border =
      "2px dashed rgba(var(--primary-color-rgb), 0.3)";
    dashedCircle.style.borderRadius = "50%";
    dashedCircle.style.zIndex = "2";
    dashedCircle.style.left = "50%";
    dashedCircle.style.top = "50%";
    dashedCircle.style.transform = "translate(-50%, -50%)";
    dashedCircle.style.animation = "spin 20s linear infinite";

    // Insert the dashed circle
    container.insertBefore(dashedCircle, container.firstChild);
  }
}

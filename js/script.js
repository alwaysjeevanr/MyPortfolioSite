document.addEventListener("DOMContentLoaded", function () {
  let menuIcon = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("section");

  // Toggle menu open/close
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    menuIcon.classList.toggle("bx-menu");
    navbar.classList.toggle("active");
    if (navbar.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Close menu when clicking a nav link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function () {
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
      navbar.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu on scroll
  window.addEventListener('scroll', () => {
    if (navbar.classList.contains('active')) {
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
      navbar.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Smooth scroll and close menu on link click
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMenu(); // Close menu after clicking link
      }
    });
  });

  // Highlight nav link on scroll
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      let offsetTop = section.offsetTop - 150;
      let sectionHeight = section.offsetHeight;
      let id = section.getAttribute("id");

      if (scrollY >= offsetTop && scrollY < offsetTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        const activeLink = document.querySelector(`.navbar a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });

    // Sticky navbar
    const header = document.querySelector("header");
    header.classList.toggle("sticky", scrollY > 100);

    // Close menu on scroll (for mobile)
    if (navbar.classList.contains("active")) {
      closeMenu();
    }
  });

  function closeMenu() {
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");
    navbar.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Typed.js animation
  new Typed(".multiple-text", {
    strings: [
      "Full-Stack Developer",
      "AI/ML Engineer",
      "Cybersecurity Specialist",
      "Software Engineer",
      "Problem Solver",
      "Tech Enthusiast",
      "Continuous Learner",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
    cursorChar: "|",
  });

  // ScrollReveal animations
  ScrollReveal({
    reset: false,
    distance: "80px",
    duration: 2000,
    delay: 200,
    easing: "ease-in-out",
    interval: 200,
  });

  ScrollReveal().reveal(".home-content, .heading", {
    origin: "top",
    scale: 0.9,
    opacity: 0,
  });
  ScrollReveal().reveal(
    ".home-img, .skills-container, .portfolio-box, .contact form",
    {
      origin: "bottom",
      scale: 0.9,
      opacity: 0,
    }
  );
  ScrollReveal().reveal(".home-content h1, .about-img, .logo", {
    origin: "left",
    scale: 0.9,
    opacity: 0,
  });
  ScrollReveal().reveal(".home-content p, .about-content, .navbar", {
    origin: "right",
    scale: 0.9,
    opacity: 0,
  });

  // Portfolio filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-box");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      portfolioItems.forEach((item) => {
        item.style.display =
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
            ? "block"
            : "none";
      });
    });
  });

  // Contact form submission
  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const inputs = this.querySelectorAll("input, textarea");
      let isValid = true;
      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#ff4444";
        } else {
          input.style.borderColor = "";
        }
      });

      const notif = document.createElement("div");
      notif.className = "form-notification";
      notif.style.cssText = `
        background: #222c36;
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
        font-size: 1.5rem;
        box-shadow: 0 2px 12px rgba(14,255,255,0.08);
        border: 2px solid #0ef;
        animation: slideIn 0.5s ease;
      `;

      const oldNotif = this.querySelector(".form-notification");
      if (oldNotif) oldNotif.remove();

      if (!isValid) {
        notif.textContent = "Please fill in all required fields.";
        notif.style.background = "#ff4444";
        notif.style.borderColor = "#ff4444";
        this.appendChild(notif);
        return;
      }

      const formData = new FormData(this);
      try {
        const response = await fetch(this.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
        notif.textContent = response.ok
          ? "Message sent successfully!"
          : "Failed to send message. Please try again.";
        notif.style.background = response.ok ? "#4CAF50" : "#ff4444";
        notif.style.borderColor = notif.style.background;
        this.appendChild(notif);
        if (response.ok) this.reset();
      } catch (error) {
        console.error(error);
        notif.textContent = "Failed to send message. Please try again.";
        notif.style.background = "#ff4444";
        notif.style.borderColor = "#ff4444";
        this.appendChild(notif);
      }
      setTimeout(() => notif.remove(), 4000);
    });
  }

  // Loader
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => (loader.style.display = "none"), 500);
    }
  });

  // Parallax scroll effect
  window.addEventListener("scroll", () => {
    const home = document.querySelector(".home");
    if (home) {
      const rate = window.pageYOffset * -0.5;
      home.style.transform = `translateY(${rate}px)`;
    }
  });

  // Skills animation on intersection
  const skillsSection = document.querySelector(".skills");
  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillsSection && skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const progress = bar.getAttribute("data-progress");
            bar.style.width = progress + "%";
          });
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(skillsSection);
  }

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".footer-iconTop a");
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

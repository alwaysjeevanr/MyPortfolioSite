// toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections active link

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky navbar
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Only close mobile menu on scroll if it is open
  if (navbar.classList.contains('active')) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
};

// Only close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

//scroll reveal with enhanced configuration

ScrollReveal({
  reset: false,
  distance: "80px",
  duration: 2000,
  delay: 200,
  easing: "ease-in-out",
  interval: 200
});

ScrollReveal().reveal(".home-content, .heading", { 
  origin: "top",
  scale: 0.9,
  opacity: 0
});
ScrollReveal().reveal(
  ".home-img, .skills-container, .portfolio-box, .contact form", 
  { 
    origin: "bottom",
    scale: 0.9,
    opacity: 0
  }
);
ScrollReveal().reveal(".home-content h1, .about-img, .logo", {
  origin: "left",
  scale: 0.9,
  opacity: 0
});
ScrollReveal().reveal(".home-content p, .about-content, .navbar", {
  origin: "right",
  scale: 0.9,
  opacity: 0
});

// Enhanced typed js with more professional titles

const typed = new Typed(".multiple-text", {
  strings: [
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Cybersecurity Specialist",
    "Software Engineer",
    "Problem Solver",
    "Tech Enthusiast",
    "Continuous Learner"
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
  cursorChar: '|'
});

// Add loading animation
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease-in-out';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Add form validation and submission with notification
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    // Remove any existing notification
    const oldNotif = this.querySelector('.form-notification');
    if (oldNotif) oldNotif.remove();

    // Basic form validation
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#ff4444';
      } else {
        input.style.borderColor = '';
      }
    });

    const notif = document.createElement('div');
    notif.className = 'form-notification';
    notif.style.cssText = `
      background: #222c36;
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
      font-size: 1.5rem;
      box-shadow: 0 2px 12px 0 rgba(14,255,255,0.08);
      border: 2px solid #0ef;
      animation: slideIn 0.5s ease;
    `;

    if (!isValid) {
      notif.textContent = 'Please fill in all required fields.';
      notif.style.background = '#ff4444';
      notif.style.borderColor = '#ff4444';
      this.appendChild(notif);
      return;
    }

    // Prepare form data
    const formData = new FormData(this);
    try {
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        notif.textContent = 'Message sent successfully!';
        notif.style.background = '#4CAF50';
        notif.style.borderColor = '#4CAF50';
        this.appendChild(notif);
        this.reset();
      } else {
        notif.textContent = 'Failed to send message. Please try again.';
        notif.style.background = '#ff4444';
        notif.style.borderColor = '#ff4444';
        this.appendChild(notif);
      }
    } catch (error) {
      notif.textContent = 'Failed to send message. Please try again.';
      notif.style.background = '#ff4444';
      notif.style.borderColor = '#ff4444';
      this.appendChild(notif);
    }
    setTimeout(() => {
      notif.remove();
    }, 4000);
  });
}

// Add scroll to top functionality with smooth animation
const scrollToTopBtn = document.querySelector('.footer-iconTop a');
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add parallax effect to home section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const homeSection = document.querySelector('.home');
  if (homeSection) {
    const rate = scrolled * -0.5;
    homeSection.style.transform = `translateY(${rate}px)`;
  }
});

// Add skill progress animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = progress + '%';
  });
};

// Trigger skill animation when skills section is in view
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(skillsSection);
}

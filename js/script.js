// 1. Typing effect
const roles = ["Full Stack Java Developer", "Java | JDBC | SQL", "HTML | CSS | JavaScript"];
const typingEl = document.getElementById("typing");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const current = roles[roleIndex];
  typingEl.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = deleting ? 50 : 100;

  if (!deleting && charIndex > current.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// 2. Back to top button
const topBtn = document.getElementById("topBtn");
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 3. Highlight nav link of the section in view + show/hide back-to-top
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });

  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

// 4. Reveal sections while scrolling
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// 5. Contact form validation
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let valid = true;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";

  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Please enter your name.";
    valid = false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email.";
    valid = false;
  }
  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Message must be at least 10 characters.";
    valid = false;
  }

  if (valid) {
    const subject = encodeURIComponent("Portfolio message from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
    window.location.href = "mailto:sriram628124@gmail.com?subject=" + subject + "&body=" + body;
    document.getElementById("formStatus").textContent = "Opening your email app...";
    form.reset();
  }
});

// 6. Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

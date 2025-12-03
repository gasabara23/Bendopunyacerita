/* ------------------------------
   YEAR AUTO UPDATE
------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ------------------------------
   THEME TOGGLE (Dark <-> Light)
------------------------------ */
const toggleTheme = document.getElementById("toggle-theme");

toggleTheme.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
        toggleTheme.textContent = "🌙";
    } else {
        toggleTheme.textContent = "☀️";
    }
});

/* ------------------------------
   MOBILE NAV
------------------------------ */
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

/* ------------------------------
   GSAP ANIMATION
------------------------------ */
window.addEventListener("load", () => {
    gsap.from(".hero-left h1", { y: 40, opacity: 0, duration: 1 });
    gsap.from(".hero-left p", { y: 40, opacity: 0, duration: 1, delay: 0.3 });
    gsap.from(".hero-cta", { opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(".hero-right", { x: 60, opacity: 0, duration: 1.2, delay: 0.7 });
});

/* ------------------------------
   COMMENT SYSTEM
------------------------------ */
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const usernameInput = document.getElementById("username");
const badgeInput = document.getElementById("user-badge");
const commentsDiv = document.getElementById("comments");
const clearBtn = document.getElementById("clear-comments");

/* Render komentar ke HTML */
function addComment(username, text, badge) {
    const comment = document.createElement("div");
    comment.classList.add("comment");

    comment.innerHTML = `
    <div class="meta">
      ${username}
      ${badge ? `<span class="badge">${badge}</span>` : ""}
    </div>
    <div class="text">${text}</div>
  `;

  commentsDiv.prepend(comment);
}

/* Submit komentar */
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const commentText = commentInput.value.trim();
  const badge = badgeInput.value.trim();

  if (username === "" || commentText === "") return;

  addComment(username, commentText, badge);

  commentInput.value = "";
  badgeInput.value = "";
});

/* Hapus semua komentar */
clearBtn.addEventListener("click", () => {
  commentsDiv.innerHTML = "";
});

/* ------------------------------
   ANIMASI SCROLL BAGIAN FITUR
------------------------------ */
const features = document.querySelectorAll(".feature");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });
  },
  { threshold: 0.2 }
);

features.forEach((feature) => {
  gsap.set(feature, { y: 40, opacity: 0 });
  observer.observe(feature);
});
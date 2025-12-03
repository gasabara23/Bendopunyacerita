const API = "https://your-render-backend-url.onrender.com/api";

const token = localStorage.getItem("token");
if (!token) {
    alert("Anda harus login sebagai admin!");
    window.location.href = "login.html";
}

const content = document.getElementById("adminContent");

// ------------------ LOGOUT ------------------
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
});

// ------------------ MENU USER ------------------
document.getElementById("menu-users").addEventListener("click", async() => {
            document.getElementById("pageTitle").innerText = "Manajemen User";

            const req = await fetch(`${API}/auth/users`);
            const users = await req.json();

            content.innerHTML = `
    <h3>Total User: ${users.length}</h3>
    <ul>
      ${users.map(u => `<li>${u.username} — role: ${u.role}</li>`).join("")}
    </ul>
  `;
});

// ------------------ MENU KOMENTAR ------------------
document.getElementById("menu-comments").addEventListener("click", async () => {
  document.getElementById("pageTitle").innerText = "Komentar User";

  const req = await fetch(`${API}/comments`);
  const data = await req.json();

  content.innerHTML = data.comments.map(c => `
    <div class="comment-box">
      <strong>${c.username}</strong>: ${c.text}
    </div>
  `).join("");
});
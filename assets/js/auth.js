const API = "https://your-render-backend-url.onrender.com/api";

const msg = (text) => document.getElementById("msg").innerText = text;

// ------------------ REGISTER ------------------
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", async(e) => {
        e.preventDefault();

        let avatarUrl = null;
        const avatarFile = document.getElementById("avatar").files[0];

        if (avatarFile) {
            const formData = new FormData();
            formData.append("avatar", avatarFile);

            const upload = await fetch(`${API}/upload`, {
                method: "POST",
                body: formData,
            });

            const uploadRes = await upload.json();
            avatarUrl = uploadRes.url;
        }

        const registerReq = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                avatar: avatarUrl
            })
        });

        const res = await registerReq.json();

        if (res.error) return msg(res.error);

        msg("Registrasi berhasil! Silakan login.");
    });
}

// ------------------ LOGIN ------------------
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", async(e) => {
        e.preventDefault();

        const req = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
            })
        });

        const res = await req.json();

        if (res.error) return msg(res.error);

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        window.location.href = "index.html";
    });
}
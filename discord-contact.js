document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("discordContactForm");
    const status = document.getElementById("formStatus");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        status.textContent = "Bezig met verzenden...";

        const data = {
            subject: document.getElementById("subject").value,
                          name: document.getElementById("name").value,
                          phone: document.getElementById("phone").value,
                          email: document.getElementById("email").value,
                          message: document.getElementById("message").value
        };

        try {
            const response = await fetch("https://swat-backend-3mm0.onrender.com/api/contact-discord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                status.textContent = "✅ Bericht succesvol verzonden.";
                form.reset();
            } else {
                status.textContent = "❌ Er ging iets mis bij het verzenden.";
            }
        } catch (error) {
            console.error(error);
            status.textContent = "❌ Server niet bereikbaar.";
        }
    });
});w

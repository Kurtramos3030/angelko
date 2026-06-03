document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const envelope = document.getElementById("envelope");
    const letterPage = document.getElementById("letterPage");
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const buttonArea = document.getElementById("buttonArea");
    const audio = document.getElementById("bgMusic");
    const surpriseBtn = document.getElementById("surpriseBtn");

    let opened = false;

    // SURPRISE BUTTON - direct link sa video.html
    if (surpriseBtn) {
        surpriseBtn.addEventListener("click", () => {
            window.location.href = "video.html";
        });
    }

    // FOLLOW CURSOR FOR YES BUTTON
    function followCursor(e) {
        if (opened) return;
        const rect = buttonArea.getBoundingClientRect();
        const btnRect = yesBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - btnRect.width / 2;
        const y = e.clientY - rect.top - btnRect.height / 2;
        const maxX = rect.width - btnRect.width;
        const maxY = rect.height - btnRect.height;
        yesBtn.style.position = "absolute";
        yesBtn.style.left = Math.max(0, Math.min(maxX, x)) + "px";
        yesBtn.style.top = Math.max(0, Math.min(maxY, y)) + "px";
    }

    // NO BUTTON ESCAPES
    function escapeNo(e) {
        if (opened) return;
        const rect = noBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (distance < 120) {
            const area = buttonArea.getBoundingClientRect();
            const maxX = area.width - rect.width;
            const maxY = area.height - rect.height;
            noBtn.style.position = "absolute";
            noBtn.style.left = Math.random() * maxX + "px";
            noBtn.style.top = Math.random() * maxY + "px";
        }
    }

    document.addEventListener("mousemove", followCursor);
    document.addEventListener("mousemove", escapeNo);

    // OPEN ENVELOPE
    yesBtn.addEventListener("click", () => {
        opened = true;
        envelope.classList.add("open");
        audio.volume = 0.6;
        audio.play().catch(() => {});
        setTimeout(() => {
            envelopeWrapper.style.display = "none";
            letterPage.style.display = "block";
        }, 1200);
    });
});
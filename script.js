// ==========================================
// 🎤 SPEAK
// ==========================================

const speakBtn =
    document.getElementById("speakBtn");

speakBtn.addEventListener("click", () => {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        status.textContent =
            "❌ Speech recognition isn't supported.";
        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang =
        sourceLanguage.value === "en"
            ? "en-US"
            : sourceLanguage.value;

    recognition.interimResults = false;
    recognition.continuous = false;

    status.textContent =
        "🎤 Listening...";

    recognition.start();

    recognition.onresult = (event) => {

        inputText.value =
            event.results[0][0].transcript;

        status.textContent =
            "✅ Speech captured!";
    };

    recognition.onerror = (event) => {

        console.error(event.error);

        status.textContent =
            "❌ Microphone error: " +
            event.error;
    };
});


// ==========================================
// 🔊 LISTEN
// ==========================================

const listenBtn =
    document.getElementById("listenBtn");

listenBtn.addEventListener("click", () => {

    const text =
        outputText.value.trim();

    if (!text) {
        status.textContent =
            "⚠️ Nothing to listen to!";
        return;
    }

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.9;

    speech.onstart = () => {
        status.textContent =
            "🔊 Speaking Hindi...";
    };

    speech.onend = () => {
        status.textContent =
            "✨ Finished!";
    };

    speech.onerror = () => {
        status.textContent =
            "❌ Couldn't speak.";
    };

    speechSynthesis.speak(speech);
});


// ==========================================
// 📋 COPY
// ==========================================

const copyBtn =
    document.getElementById("copyBtn");

copyBtn.addEventListener("click", async () => {

    const text =
        outputText.value.trim();

    if (!text) {
        status.textContent =
            "⚠️ Nothing to copy!";
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        status.textContent =
            "📋 Copied successfully!";

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Couldn't copy.";
    }
});

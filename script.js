// ==========================================
// 🌍 HINDI TRANSLATOR — SCRIPT
// ==========================================

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const speakBtn = document.getElementById("speakBtn");
const translateBtn = document.getElementById("translateBtn");
const listenBtn = document.getElementById("listenBtn");
const copyBtn = document.getElementById("copyBtn");

const status = document.getElementById("status");


// ==========================================
// STATUS
// ==========================================

function showStatus(message) {
    status.textContent = message;
}


// ==========================================
// 🌐 TRANSLATE
// ==========================================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    const from = sourceLanguage.value;
    const to = targetLanguage.value;

    if (!text) {
        showStatus("⚠️ Type or speak something first!");
        return;
    }

    if (from === to) {
        outputText.value = text;
        showStatus("✅ Translation complete!");
        return;
    }

    showStatus("🌐 Translating...");

    try {

        const url =
            "https://translate.googleapis.com/translate_a/single" +
            "?client=gtx" +
            "&sl=" + encodeURIComponent(from) +
            "&tl=" + encodeURIComponent(to) +
            "&dt=t" +
            "&q=" + encodeURIComponent(text);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Translation request failed");
        }

        const data = await response.json();

        if (!data || !data[0]) {
            throw new Error("No translation received");
        }

        const translation = data[0]
            .map(item => item[0])
            .filter(Boolean)
            .join("");

        if (!translation) {
            throw new Error("Empty translation");
        }

        outputText.value = translation;

        showStatus("✅ Translation complete!");

    } catch (error) {

        console.error(error);

        outputText.value = "";

        showStatus(
            "❌ Translation failed. Try again."
        );
    }
});


// ==========================================
// 🎤 SPEAK / VOICE INPUT
// ==========================================

speakBtn.addEventListener("click", () => {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        showStatus(
            "❌ Speech recognition isn't supported."
        );
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
        sourceLanguage.value === "en"
            ? "en-US"
            : sourceLanguage.value;

    recognition.interimResults = false;
    recognition.continuous = false;

    showStatus("🎤 Listening...");

    recognition.start();

    recognition.onresult = (event) => {

        const spokenText =
            event.results[0][0].transcript;

        inputText.value = spokenText;

        showStatus("✅ Speech captured!");
    };

    recognition.onerror = (event) => {

        console.error(event.error);

        showStatus(
            "❌ Microphone error: " + event.error
        );
    };

    recognition.onend = () => {

        if (
            status.textContent ===
            "🎤 Listening..."
        ) {
            showStatus("✨ Ready!");
        }
    };
});


// ==========================================
// 🔊 LISTEN / TEXT TO SPEECH
// ==========================================

listenBtn.addEventListener("click", () => {

    const text = outputText.value.trim();

    if (!text) {
        showStatus("⚠️ Nothing to listen to!");
        return;
    }

    if (!("speechSynthesis" in window)) {
        showStatus(
            "❌ Speech isn't supported here."
        );
        return;
    }

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang =
        targetLanguage.value === "hi"
            ? "hi-IN"
            : targetLanguage.value;

    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
        showStatus("🔊 Speaking...");
    };

    speech.onend = () => {
        showStatus("✨ Finished speaking!");
    };

    speech.onerror = () => {
        showStatus("❌ Couldn't speak the text.");
    };

    speechSynthesis.speak(speech);
});


// ==========================================
// 📋 COPY
// ==========================================

copyBtn.addEventListener("click", async () => {

    const text = outputText.value.trim();

    if (!text) {
        showStatus("⚠️ Nothing to copy!");
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        showStatus("📋 Copied successfully!");

    } catch (error) {

        console.error(error);

        showStatus("❌ Couldn't copy.");
    }
});

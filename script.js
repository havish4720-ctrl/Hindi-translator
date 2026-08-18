// ==========================================
// 🌍 HINDI TRANSLATOR — JAVASCRIPT
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
// STATUS MESSAGE
// ==========================================

function showStatus(message) {
    status.textContent = message;
}


// ==========================================
// 🎤 SPEAK BUTTON
// ==========================================

speakBtn.addEventListener("click", () => {

    if (!("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)) {

        showStatus("❌ Speech recognition is not supported here.");
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = sourceLanguage.value === "en"
        ? "en-US"
        : sourceLanguage.value;

    recognition.interimResults = false;
    recognition.continuous = false;

    showStatus("🎤 Listening... Speak now!");

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

        if (status.textContent === "🎤 Listening... Speak now!") {
            showStatus("✨ Ready to translate");
        }
    };
});


// ==========================================
// 🌐 TRANSLATE BUTTON — REAL API
// ==========================================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (!text) {
        showStatus("⚠️ Type or speak something first!");
        return;
    }

    showStatus("🌐 Translating...");

    try {

        const response = await fetch(
            "https://hindi-translator-api.onrender.com/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    q: text,
                    source: sourceLanguage.value,
                    target: targetLanguage.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Translation failed"
            );
        }

        outputText.value = data.translatedText;

        showStatus("✅ Translation complete!");

    } catch (error) {

        console.error(error);

        outputText.value = "";

        showStatus(
            "❌ Translation failed. Please try again."
        );
    }
});

        


// ==========================================
// 🔊 LISTEN BUTTON
// ==========================================

listenBtn.addEventListener("click", () => {

    const text = outputText.value.trim();

    if (!text) {

        showStatus("⚠️ Nothing to listen to!");
        return;
    }

    if (!("speechSynthesis" in window)) {

        showStatus(
            "❌ Your browser doesn't support speech."
        );

        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
        showStatus("🔊 Speaking Hindi...");
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
// 📋 COPY BUTTON
// ==========================================

copyBtn.addEventListener("click", async () => {

    const text = outputText.value.trim();

    if (!text) {

        showStatus("⚠️ Nothing to copy!");
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        showStatus("📋 Copied!");

    } catch (error) {

        // Backup copy method
        outputText.select();

        document.execCommand("copy");

        showStatus("📋 Copied!");
    }
});


// ==========================================
// ✨ READY
// ==========================================

showStatus("✨ Ready to translate");

console.log("🌍 Hindi Translator JavaScript loaded!");

// ==========================================
// 🌍 HINDI TRANSLATOR — COMPLETE SCRIPT
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

const WORKER_URL =
    "https://hindi-translator-api-26.havishkumarsingh.workers.dev";


// ==========================================
// STATUS
// ==========================================

function showStatus(message) {
    if (status) {
        status.textContent = message;
    }
}


// ==========================================
// LANGUAGE NAMES FOR M2M100
// ==========================================

const languageNames = {
    en: "english",
    hi: "hindi",
    es: "spanish",
    fr: "french",
    de: "german",
    ja: "japanese",
    ko: "korean",
    "zh-CN": "chinese",
    it: "italian",
    ru: "russian",
    pt: "portuguese",
    ar: "arabic"
};


// ==========================================
// 🌐 TRANSLATE
// ==========================================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (!text) {
        showStatus("⚠️ Type or speak something first!");
        outputText.value = "";
        return;
    }

    const source =
        languageNames[sourceLanguage.value] ||
        sourceLanguage.value;

    const target =
        languageNames[targetLanguage.value] ||
        targetLanguage.value;

    showStatus("🌐 Translating...");
    translateBtn.disabled = true;

    try {

        const response = await fetch(WORKER_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text,
                source: source,
                target: target
            })
        });

        const rawText = await response.text();

        let data;

        try {
            data = JSON.parse(rawText);
        } catch {
            throw new Error(
                "Worker returned invalid data: " +
                rawText.substring(0, 150)
            );
        }

        if (!response.ok) {
            throw new Error(
                data.error ||
                `Worker error: HTTP ${response.status}`
            );
        }

        if (!data.translatedText) {
            throw new Error(
                "Worker responded, but no translated text was returned."
            );
        }

        outputText.value = data.translatedText;

        showStatus("✅ Translation complete!");

    } catch (error) {

        console.error("TRANSLATION ERROR:", error);

        outputText.value = "";

        showStatus(
            "❌ Translation failed: " +
            error.message
        );

    } finally {

        translateBtn.disabled = false;
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
            "❌ Speech recognition isn't supported in this browser."
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    const selectedLanguage =
        sourceLanguage.value;

    recognition.lang =
        selectedLanguage === "en"
            ? "en-US"
            : selectedLanguage;

    recognition.interimResults = false;
    recognition.continuous = false;

    showStatus("🎤 Listening... Speak now!");

    try {

        recognition.start();

    } catch (error) {

        console.error("MICROPHONE START ERROR:", error);

        showStatus(
            "❌ Could not start microphone."
        );

        return;
    }

    recognition.onresult = (event) => {

        const spokenText =
            event.results[0][0].transcript;

        inputText.value = spokenText;

        showStatus("✅ Speech captured!");
    };

    recognition.onerror = (event) => {

        console.error(
            "SPEECH ERROR:",
            event.error
        );

        showStatus(
            "❌ Microphone error: " +
            event.error
        );
    };

    recognition.onend = () => {

        if (
            status.textContent ===
            "🎤 Listening... Speak now!"
        ) {
            showStatus("✨ Ready to translate!");
        }
    };
});


// ==========================================
// 🔊 LISTEN / TEXT TO SPEECH
// ==========================================

listenBtn.addEventListener("click", () => {

    const text =
        outputText.value.trim();

    if (!text) {

        showStatus(
            "⚠️ Nothing to listen to!"
        );

        return;
    }

    if (!("speechSynthesis" in window)) {

        showStatus(
            "❌ Speech synthesis isn't supported."
        );

        return;
    }

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    const target =
        targetLanguage.value;

    if (target === "hi") {
        speech.lang = "hi-IN";
    } else if (target === "en") {
        speech.lang = "en-US";
    } else {
        speech.lang = target;
    }

    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
        showStatus("🔊 Speaking...");
    };

    speech.onend = () => {
        showStatus("✨ Finished speaking!");
    };

    speech.onerror = (event) => {

        console.error(
            "TEXT-TO-SPEECH ERROR:",
            event
        );

        showStatus(
            "❌ Couldn't speak the translation."
        );
    };

    speechSynthesis.speak(speech);
});


// ==========================================
// 📋 COPY
// ==========================================

copyBtn.addEventListener("click", async () => {

    const text =
        outputText.value.trim();

    if (!text) {

        showStatus(
            "⚠️ Nothing to copy!"
        );

        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        showStatus(
            "📋 Copied successfully!"
        );

    } catch (error) {

        console.error(
            "COPY ERROR:",
            error
        );

        showStatus(
            "❌ Couldn't copy the translation."
        );
    }
});


// ==========================================
// 🚀 STARTUP CHECK
// ==========================================

console.log("🌍 K.C Translator script loaded.");
console.log("Worker:", WORKER_URL);
console.log("Translation system ready.");

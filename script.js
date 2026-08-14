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
// 🌐 TRANSLATE BUTTON
// ==========================================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (!text) {
        showStatus("⚠️ Type or speak something first!");
        return;
    }

    showStatus("🌐 Translating...");

    try {

        /*
         * TEMPORARY TRANSLATION TEST
         *
         * This is NOT the final API.
         * It proves that the button and JavaScript
         * are working before we connect the API.
         */

        if (
            sourceLanguage.value === "en" &&
            targetLanguage.value === "hi"
        ) {

            const demoTranslations = {

                "hello": "नमस्ते",
                "hi": "नमस्ते",
                "good morning": "सुप्रभात",
                "good night": "शुभ रात्रि",
                "thank you": "धन्यवाद",
                "thanks": "धन्यवाद",
                "how are you": "आप कैसे हैं?",
                "my name is havish": "मेरा नाम हविश है",
                "welcome": "स्वागत है"
            };

            const lowerText = text.toLowerCase();

            if (demoTranslations[lowerText]) {

                outputText.value =
                    demoTranslations[lowerText];

            } else {

                outputText.value =
                    "API translation will appear here.";
            }

        } else {

            outputText.value =
                "🌐 API translation will be connected here.";
        }

        showStatus("✅ Translation complete!");

    } catch (error) {

        console.error(error);

        showStatus("❌ Translation failed.");
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

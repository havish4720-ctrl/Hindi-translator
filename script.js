const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const speakBtn = document.getElementById("speakBtn");
const translateBtn = document.getElementById("translateBtn");
const listenBtn = document.getElementById("listenBtn");
const copyBtn = document.getElementById("copyBtn");

const status = document.getElementById("status");


// ================================
// 🌐 TRANSLATE
// ================================

translateBtn.onclick = async function() {
    
    const text = inputText.value.trim();
    
    if (!text) {
        status.textContent = "⚠️ Type something first!";
        return;
    }
    
    outputText.value = "";
    status.textContent = "🌐 Translating...";
    
    try {
        
        const url =
            "https://translate.googleapis.com/translate_a/single" +
            "?client=gtx" +
            "&sl=" + encodeURIComponent(sourceLanguage.value) +
            "&tl=" + encodeURIComponent(targetLanguage.value) +
            "&dt=t" +
            "&q=" + encodeURIComponent(text);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Translation service error");
        }
        
        const data = await response.json();
        
        if (!data || !data[0]) {
            throw new Error("No translation received");
        }
        
        const translation = data[0]
            .map(item => item[0])
            .filter(Boolean)
            .join("");
        
        outputText.value = translation;
        
        status.textContent = "✅ Translation complete!";
        
    } catch (error) {
        
        console.error(error);
        
        status.textContent =
            "❌ Translation failed. Check your internet.";
    }
};


// ================================
// 🎤 SPEAK
// ================================

speakBtn.onclick = function() {
    
    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;
    
    if (!Recognition) {
        status.textContent =
            "❌ Speech recognition not supported.";
        return;
    }
    
    const recognition = new Recognition();
    
    const languages = {
        en: "en-US",
        fr: "fr-FR",
        es: "es-ES",
        de: "de-DE",
        ja: "ja-JP",
        ko: "ko-KR"
    };
    
    recognition.lang =
        languages[sourceLanguage.value] || "en-US";
    
    recognition.interimResults = false;
    
    status.textContent = "🎤 Listening...";
    
    recognition.start();
    
    recognition.onresult = function(event) {
        
        inputText.value =
            event.results[0][0].transcript;
        
        status.textContent =
            "✅ Speech captured!";
    };
    
    recognition.onerror = function(event) {
        
        console.error(event.error);
        
        status.textContent =
            "❌ Mic error: " + event.error;
    };
};


// ================================
// 🔊 LISTEN
// ================================

listenBtn.onclick = function() {
    
    const text = outputText.value.trim();
    
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
    
    speech.onstart = function() {
        status.textContent = "🔊 Speaking Hindi...";
    };
    
    speech.onend = function() {
        status.textContent = "✨ Finished!";
    };
    
    speech.onerror = function() {
        status.textContent =
            "❌ Couldn't speak.";
    };
    
    speechSynthesis.speak(speech);
};


// ================================
// 📋 COPY
// ================================

copyBtn.onclick = async function() {
    
    const text = outputText.value.trim();
    
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
};


console.log("🌍 Hindi Translator ready!");

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const status = document.getElementById("status");

translateBtn.addEventListener("click", () => {

    const text = inputText.value.trim();

    if (!text) {
        status.textContent = "⚠️ Type something first!";
        return;
    }

    outputText.value =
        "TEST: " + text;

    status.textContent =
        "✅ JavaScript is working!";

});

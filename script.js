/* =========================================
   🌈 HINDI TRANSLATOR — VIBY FINAL DESIGN
   ========================================= */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    color: white;

    background:
        radial-gradient(circle at 15% 20%, rgba(255, 0, 153, 0.35), transparent 30%),
        radial-gradient(circle at 85% 15%, rgba(0, 229, 255, 0.35), transparent 30%),
        radial-gradient(circle at 50% 90%, rgba(125, 70, 255, 0.35), transparent 35%),
        linear-gradient(135deg, #09001f, #13083d 45%, #001c35);

    background-attachment: fixed;
    overflow-x: hidden;
}


/* =========================================
   HEADER
   ========================================= */

header {
    width: 100%;
    padding: 22px 7%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgba(8, 3, 25, 0.65);

    border-bottom: 1px solid rgba(255, 255, 255, 0.12);

    backdrop-filter: blur(18px);
}

.logo {
    font-size: 24px;
    font-weight: 900;

    text-shadow:
        0 0 10px #00e5ff,
        0 0 25px #8b5cf6;
}

.tagline {
    color: #cbd5e1;
    font-size: 14px;
}


/* =========================================
   MAIN LAYOUT
   ========================================= */

.app {
    width: min(1200px, 92%);
    min-height: calc(100vh - 160px);

    margin: auto;

    display: grid;
    grid-template-columns: 0.85fr 1.4fr;

    gap: 70px;

    align-items: center;

    padding: 65px 0;
}


/* =========================================
   HERO
   ========================================= */

.hero h1 {
    font-size: clamp(45px, 5vw, 70px);
    line-height: 1.02;

    margin-bottom: 24px;

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #6ee7ff,
            #c084fc,
            #ff7ac8
        );

    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
}

.hero p {
    max-width: 480px;

    color: #c7c9d9;

    font-size: 18px;
    line-height: 1.7;
}


/* =========================================
   TRANSLATOR CARD
   ========================================= */

.translator-card {
    padding: 30px;

    border-radius: 30px;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,0.13),
            rgba(255,255,255,0.055)
        );

    border: 1px solid rgba(255,255,255,0.2);

    backdrop-filter: blur(25px);

    box-shadow:
        0 25px 70px rgba(0,0,0,0.45),
        0 0 40px rgba(139,92,246,0.18);

    transition: 0.3s ease;
}

.translator-card:hover {
    transform: translateY(-6px);

    border-color: rgba(0,229,255,0.5);

    box-shadow:
        0 30px 80px rgba(0,0,0,0.5),
        0 0 50px rgba(0,229,255,0.18);
}


/* =========================================
   LANGUAGE SELECTORS
   ========================================= */

.languages {
    display: grid;

    grid-template-columns: 1fr 45px 1fr;

    gap: 12px;

    align-items: end;

    margin-bottom: 18px;
}

.languages label {
    display: block;

    margin-bottom: 7px;

    font-size: 14px;
    font-weight: bold;

    color: #b9f5ff;
}

.languages select {
    width: 100%;

    padding: 13px;

    border: 1px solid rgba(255,255,255,0.15);

    border-radius: 13px;

    background: rgba(10,8,35,0.9);

    color: white;

    font-size: 15px;

    outline: none;

    cursor: pointer;
}

.languages select:focus {
    border-color: #00e5ff;

    box-shadow:
        0 0 18px rgba(0,229,255,0.25);
}

.arrow {
    padding-bottom: 8px;

    text-align: center;

    color: #00e5ff;

    font-size: 28px;

    text-shadow:
        0 0 15px #00e5ff;
}


/* =========================================
   TEXT BOXES
   ========================================= */

textarea {
    width: 100%;
    height: 145px;

    display: block;

    margin-top: 15px;
    padding: 18px;

    resize: vertical;

    border-radius: 19px;

    border: 1px solid rgba(255,255,255,0.14);

    outline: none;

    background: rgba(5,3,25,0.75);

    color: white;

    font-family: Arial, Helvetica, sans-serif;

    font-size: 17px;
    line-height: 1.5;

    transition: 0.25s ease;
}

textarea::placeholder {
    color: #8e93a8;
}

textarea:focus {
    border-color: #00e5ff;

    box-shadow:
        0 0 22px rgba(0,229,255,0.18);
}


/* =========================================
   BUTTONS
   ========================================= */

.buttons {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 12px;

    margin-top: 18px;
}

button {
    padding: 15px;

    border: 1px solid rgba(255,255,255,0.14);

    border-radius: 15px;

    background:
        linear-gradient(
            135deg,
            #7c3aed,
            #2563eb
        );

    color: white;

    font-size: 16px;
    font-weight: 800;

    cursor: pointer;

    transition: 0.2s ease;

    box-shadow:
        0 8px 20px rgba(0,0,0,0.25);
}

button:hover {
    transform: translateY(-4px);

    background:
        linear-gradient(
            135deg,
            #ec4899,
            #06b6d4
        );

    box-shadow:
        0 0 25px rgba(0,229,255,0.3);
}

button:active {
    transform: scale(0.96);
}


/* =========================================
   INDIVIDUAL BUTTON VIBES
   ========================================= */

#speakBtn {
    background: linear-gradient(135deg, #ff4ecd, #7c3aed);
}

#translateBtn {
    background: linear-gradient(135deg, #00bfff, #2563eb);
}

#listenBtn {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

#copyBtn {
    background: linear-gradient(135deg, #14b8a6, #06b6d4);
}


/* =========================================
   STATUS
   ========================================= */

#status {
    margin-top: 18px;

    text-align: center;

    color: #8ff6ff;

    font-size: 14px;
    font-weight: 600;

    text-shadow:
        0 0 10px rgba(0,229,255,0.4);
}


/* =========================================
   FOOTER
   ========================================= */

.developer-footer {
    width: 100%;

    padding: 32px 20px;

    text-align: center;

    background: rgba(5,2,20,0.72);

    border-top: 1px solid rgba(255,255,255,0.12);

    backdrop-filter: blur(15px);
}

.footer-logo {
    margin-bottom: 10px;

    font-size: 23px;
    font-weight: 900;

    text-shadow:
        0 0 12px #00e5ff;
}

.developer-footer p {
    margin: 7px 0;

    color: #9ca3b8;

    font-size: 14px;
}

.developer-footer .developer {
    color: #e2e8f0;
    font-size: 16px;
}

.developer strong {
    color: #00e5ff;

    text-shadow:
        0 0 12px #00e5ff;
}

.copyright {
    opacity: 0.55;
}


/* =========================================
   📱 TABLET
   ========================================= */

@media (max-width: 850px) {

    header {
        padding: 20px 5%;
    }

    .tagline {
        display: none;
    }

    .app {
        grid-template-columns: 1fr;

        width: 92%;

        gap: 35px;

        padding: 45px 0;
    }

    .hero {
        text-align: center;
    }

    .hero p {
        margin: auto;
    }

    .translator-card {
        width: 100%;
    }
}


/* =========================================
   📱 SMALL SCREEN
   ========================================= */

@media (max-width: 500px) {

    .hero h1 {
        font-size: 40px;
    }

    .hero p {
        font-size: 16px;
    }

    .translator-card {
        padding: 20px;
        border-radius: 23px;
    }

    .languages {
        grid-template-columns: 1fr;
    }

    .arrow {
        display: none;
    }

    textarea {
        height: 130px;
        font-size: 15px;
    }

    button {
        padding: 13px 8px;
        font-size: 14px;
    }
}

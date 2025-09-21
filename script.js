let safeMode = false,
  chatCount = 0,
  chaosLevel = 0,
  clickCount = 0;
let fallingEnabled = false,
  cursorTrailEnabled = false;

const blip = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");
const laugh = new Audio("https://www.soundjay.com/human/sounds/laugh-1.mp3");
const beep = new Audio("https://www.soundjay.com/button/sounds/beep-07.mp3");
const finalClimax = new Audio(
  "https://www.soundjay.com/button/sounds/button-10.mp3"
);
const surpriseSound = new Audio(
  "https://www.soundjay.com/human/sounds/laugh-2.mp3"
);

function toggleSafeMode() {
  safeMode = !safeMode;
  alert("Safe Mode " + (safeMode ? "enabled" : "disabled"));
}

// Delay chaos features for 10 seconds
setTimeout(() => {
  fallingEnabled = true; // enable falling emojis
  cursorTrailEnabled = true; // enable cursor trail
}, 10000);

function navigate(page) {
  const c = document.getElementById("content");
  if (page === "home") {
    c.innerHTML = `
        <section class="hero" onclick="shake(this)">
            <h2>Welcome to SampleCorp</h2>
            <p>Your trusted partner for web solutions.</p>
            <button class="jitter-btn">Learn More</button>
        </section>
        <section class="cards">
            <div class="card" onclick="shake(this)"><h3>About Us</h3><p>We provide innovative web solutions.</p></div>
            <div class="card" onclick="shake(this)"><h3>Services</h3><p>Web development, SEO, and more.</p></div>
            <div class="card" onclick="shake(this)"><h3>Contact</h3><p>Reach out to us today.</p></div>
        </section>`;
    attachJitter();
    subtleChaos();
    subtleAudioTriggers();
    glitchRandomly();
  } else if (page === "about")
    c.innerHTML =
      "<h2>About</h2><p>This is a normal sample site… or is it? 😏</p>";
  else if (page === "chat")
    c.innerHTML = `<h2>Chat</h2><input id="chatInput" placeholder="Ask…"/><button onclick="chat()">Send</button><div id="chatbox"></div>`;
  else if (page === "games") {
    c.innerHTML = `<h2>Games</h2><button class="jitter-btn" onclick="fakeDownload()">Download Game</button>`;
    attachJitter();
  } else if (page === "chaos") chaosPage();
}

function chat() {
  chatCount++;
  const input = document.getElementById("chatInput").value.toLowerCase();
  const box = document.getElementById("chatbox");
  let responses = [
    "Ask Google 😂",
    "Silly question",
    "Nope",
    "Error 404",
    "Try again",
    "Waste of time 😈",
  ];
  if (chatCount > 3)
    responses = [
      "Seriously? 😂",
      "Try harder 😏",
      "Nope, still wrong",
      "Really? 🤡",
      "LOL, nice try",
      "You can't escape!",
    ];
  const reply = responses[Math.floor(Math.random() * responses.length)];
  box.innerHTML += `<p><b>You:</b> ${input}</p><p><b>Fred:</b> ${reply}</p>`;
  if (!safeMode) chaosLevel += 0.5;
  if (Math.random() < 0.2) miniPopup();
}

function fakeDownload() {
  if (safeMode) return alert("Safe Mode active");
  alert("Downloading… just kidding 😜");
  if (!safeMode) chaosLevel += 0.3;
}

function shake(el) {
  if (safeMode) return;
  el.style.transition = "transform 0.1s";
  el.style.transform = "translateX(-5px)";
  setTimeout(() => {
    el.style.transform = "translateX(5px)";
  }, 100);
  setTimeout(() => {
    el.style.transform = "translateX(0)";
  }, 200);
  if (!safeMode) chaosLevel += 0.2;
}

function miniPopup() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.left = Math.random() * 80 + "%";
  popup.style.top = Math.random() * 80 + "%";
  popup.style.background = "#ff0";
  popup.style.color = "#000";
  popup.style.padding = "5px 10px";
  popup.style.borderRadius = "4px";
  popup.style.boxShadow = "0 0 6px #000";
  popup.style.zIndex = 9999;
  popup.textContent = ["Oops!", "Error 404", "Are you sure?", "Try again 😂"][
    Math.floor(Math.random() * 4)
  ];
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
  if (!safeMode) chaosLevel += 0.1;
}

function attachJitter() {
  document.querySelectorAll(".jitter-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      if (safeMode) return;
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        btn.style.transform = `translate(${(dx / 5) * -1}px,${
          (dy / 5) * -1
        }px)`;
        setTimeout(() => (btn.style.transform = "translate(0,0)"), 150);
        if (!safeMode) chaosLevel += 0.05;
      }
    });
  });
}

function subtleChaos() {
  if (safeMode) return;
  setInterval(() => {
    if (chaosLevel < 1 || !fallingEnabled) return;
    document.querySelectorAll(".hero,.card").forEach((el) => {
      el.style.backgroundColor = `hsl(${Math.random() * 360},70%,90%)`;
      setTimeout(() => (el.style.backgroundColor = "#fff"), 200);
    });
  }, 3000);
  setInterval(() => {
    if (!fallingEnabled || safeMode || chaosLevel < 1) return;
    const r = document.createElement("div");
    r.className = "rain";
    r.textContent = ["💥", "💀", "🤡", "🔥", "⚡", "😈"][
      Math.floor(Math.random() * 6)
    ];
    r.style.left = Math.random() * window.innerWidth + "px";
    r.style.top = "-20px";
    r.style.fontSize = 15 + Math.random() * 25 + "px";
    document.body.appendChild(r);
    let t = 0;
    const speed = 2 + Math.random() * 5;
    const fall = setInterval(() => {
      if (t > window.innerHeight) {
        r.remove();
        clearInterval(fall);
      } else {
        r.style.top = t + "px";
        t += speed;
      }
    }, 20);
  }, 200);
  setInterval(screenShake, 5000);
}

function playChaosSound() {
  if (safeMode) return;
  let chance = Math.min(chaosLevel / 5, 0.7);
  if (Math.random() < chance) {
    const sounds = [blip, laugh, beep];
    const s = sounds[Math.floor(Math.random() * sounds.length)];
    s.currentTime = 0;
    s.volume = Math.min(0.1 + chaosLevel / 10, 1);
    s.play();
  }
}

function subtleAudioTriggers() {
  if (safeMode) return;
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (Math.random() < 0.3) playChaosSound();
      if (!safeMode) chaosLevel += 0.05;
    });
  });
  document.body.addEventListener("click", () => {
    if (Math.random() < 0.2) playChaosSound();
    clickCount++;
  });
  setInterval(() => {
    if (Math.random() < 0.1) playChaosSound();
  }, 3000);
  setInterval(fakePrompt, 7000);
}

function askPassword() {
  const pwd = prompt("Enter secret password:");
  if (pwd === "letmein") chaosPage();
  else alert("Wrong password!");
}

function chaosPage() {
  if (safeMode) return;
  const c = document.getElementById("content");
  c.innerHTML = "<h2>CHAOS MODE 😱</h2><p>Total Troll Mayhem Unleashed!</p>";
  document.body.style.background = "#111";
  setInterval(() => {
    document.body.style.background = [
      "#ff5555",
      "#55ff55",
      "#5555ff",
      "#ffff55",
      "#ff55ff",
      "#55ffff",
    ][Math.floor(Math.random() * 6)];
  }, 200);
  setInterval(() => {
    const d = document.createElement("div");
    d.className = "bouncing";
    d.textContent = ["LOL", "😂", "🔥", "WTF", "TROLL", "BOOM", "🤡"][
      Math.floor(Math.random() * 7)
    ];
    d.style.left = Math.random() * window.innerWidth + "px";
    d.style.top = Math.random() * window.innerHeight + "px";
    d.style.transform = `rotate(${Math.random() * 360}deg)`;
    c.appendChild(d);
    setTimeout(() => d.remove(), 4000);
  }, 300);
  setInterval(() => {
    const r = document.createElement("div");
    r.className = "rain";
    r.textContent = ["💥", "💀", "🤡", "🔥", "⚡", "😈"][
      Math.floor(Math.random() * 6)
    ];
    r.style.left = Math.random() * window.innerWidth + "px";
    r.style.top = "-20px";
    r.style.fontSize = 15 + Math.random() * 25 + "px";
    document.body.appendChild(r);
    let t = 0;
    const speed = 2 + Math.random() * 5;
    const fall = setInterval(() => {
      if (t > window.innerHeight) {
        r.remove();
        clearInterval(fall);
      } else {
        r.style.top = t + "px";
        t += speed;
      }
    }, 20);
  }, 200);
  setInterval(() => {
    document.body.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
  }, 1000);
  finalClimax.play();
  document.body.addEventListener("click", (e) => {
    for (let i = 0; i < 15; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      s.style.setProperty("--dx", Math.random() * 100 - 50 + "px");
      s.style.setProperty("--dy", Math.random() * 100 - 50 + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  });
}

function screenShake() {
  if (safeMode || chaosLevel < 1) return;
  const intensity = Math.min(chaosLevel * 2, 10);
  document.body.style.transform = `translate(${
    Math.random() * intensity - intensity / 2
  }px,${Math.random() * intensity - intensity / 2}px)`;
  setTimeout(() => {
    document.body.style.transform = "translate(0,0)";
  }, 100);
}

function glitchRandomly() {
  setInterval(() => {
    if (safeMode || chaosLevel < 1) return;
    const cards = document.querySelectorAll(".card h3");
    if (cards.length > 0) {
      const card = cards[Math.floor(Math.random() * cards.length)];
      glitchText(card);
    }
  }, 4000);
}
function glitchText(el) {
  el.classList.add("glitch");
  el.dataset.text = el.textContent;
  el.style.animation = "glitchAnim 0.3s";
  setTimeout(() => {
    el.classList.remove("glitch");
    el.style.animation = "";
  }, 300);
}

function fakePrompt() {
  if (safeMode || chaosLevel < 2 || !fallingEnabled) return;
  const input = document.createElement("input");
  input.placeholder = ["Enter secret code…", "What is 2+2?", "Type your name…"][
    Math.floor(Math.random() * 3)
  ];
  input.style.position = "fixed";
  input.style.top = Math.random() * 80 + "%";
  input.style.left = Math.random() * 80 + "%";
  input.style.zIndex = 9999;
  input.style.padding = "5px 10px";
  document.body.appendChild(input);
  setTimeout(() => input.remove(), 3000);
}

// Cursor trail
document.body.addEventListener("mousemove", (e) => {
  if (safeMode || !cursorTrailEnabled) return;
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 500);
});

navigate("home");

// ------------------
// Progressive Chaos Timer
// ------------------
setInterval(() => {
  if (safeMode) return;
  chaosLevel += 0.1; // gradually increase chaos over time

  if (Math.random() < chaosLevel / 10) miniPopup();
  if (Math.random() < chaosLevel / 15) screenShake();
  if (Math.random() < chaosLevel / 20 && fallingEnabled) {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360},70%,90%)`;
    setTimeout(() => {
      document.body.style.backgroundColor = "#f2f2f2";
    }, 200);
  }
  if (Math.random() < chaosLevel / 25) {
    document.body.style.cursor =
      "url('https://upload.wikimedia.org/wikipedia/commons/f/f1/Emoji_u1f608.svg'), auto";
    setTimeout(() => {
      document.body.style.cursor = "default";
    }, 500);
  }

  if (chaosLevel > 5 && !document.getElementById("bossBtn")) {
    const bossBtn = document.createElement("button");
    bossBtn.id = "bossBtn";
    bossBtn.textContent = "Secret Mayhem";
    bossBtn.style.position = "fixed";
    bossBtn.style.bottom = "20px";
    bossBtn.style.right = "20px";
    bossBtn.style.zIndex = 10000;
    bossBtn.style.background = "red";
    bossBtn.style.color = "white";
    bossBtn.style.padding = "10px 15px";
    bossBtn.style.borderRadius = "8px";
    bossBtn.onclick = () => chaosPage();
    document.body.appendChild(bossBtn);
  }
}, 30000); // every 30 sec

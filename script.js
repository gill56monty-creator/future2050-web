const features = [
  [53, "Brain Computer Interface", "ब्रेन कंप्यूटर इंटरफेस", "Seedha soch kar command dene ka future concept", "#00F5FF"],
  [54, "Holographic Display", "होलोग्राफिक डिस्प्ले", "3D holographic projection interface", "#FF00FF"],
  [55, "General Purpose AI", "जनरल पर्पस AI", "Multiple tasks samajhne wala advanced AI", "#39FF14"],
  [56, "Quantum Computing", "क्वांटम कंप्यूटिंग", "Quantum-powered advanced calculations", "#FF073A"],
  [57, "Autonomous AI Agents", "ऑटोनॉमस AI एजेंट्स", "Tasks aur workflows automatically manage karne wale AI agents", "#FF6B00"],
  [58, "Real-time 3D World Generation", "रियल टाइम 3D वर्ल्ड जनरेशन", "Text prompt se virtual 3D environment generate karna", "#00BFFF"],
  [59, "Self-Repairing Software", "सेल्फ रिपेयरिंग सॉफ्टवेयर", "Problems detect karke software ko automatically repair karna", "#FFFF00"],
  [60, "Emotional Intelligence AI", "इमोशनल इंटेलिजेंस AI", "Emotional signals samajhkar suitable response dena", "#FF1493"],
  [61, "Holographic Virtual Assistant", "होलोग्राफिक वर्चुअल असिस्टेंट", "Futuristic 3D virtual assistant concept", "#7B68EE"],
  [62, "Neural Memory Interface", "न्यूरल मेमोरी इंटरफेस", "Brain-computer information interaction ka future concept", "#00FA9A"],
  [63, "Immersive Metaverse", "फुल्ली इमर्सिव मेटावर्स", "Highly immersive virtual environment", "#FF4500"],
  [64, "Self-Evolving AI", "सेल्फ इवॉल्विंग AI", "Data aur feedback ke saath adapt hone wala AI", "#E600FF"],
  [65, "Mind-to-Mind Link", "माइंड टू माइंड कम्युनिकेशन", "Direct neural communication ka speculative concept", "#00FFCC"],
  [66, "Personal AI Clone", "पर्सनल AI क्लोन", "Personal style par based digital AI profile", "#FF33CC"],
  [67, "Accelerated Learning", "एक्सेलरेटेड लर्निंग", "AI-assisted fast learning ka future concept", "#66FF66"],
  [68, "Nano-Bot Doctors", "नैनो-बॉट डॉक्टर्स", "Medical nanobot treatment ka speculative simulation", "#FF6666"],
  [69, "Matter Replicator", "मैटर रिप्लिकेटर", "Matter replication ka science-fiction concept", "#FFCC00"],
  [70, "Dream Recording", "ड्रीम रिकॉर्डिंग", "Dream visualization ka speculative concept", "#FF66FF"]
].map(([id, title, hindi, desc, color]) => ({
  id, title, hindi, desc, color, fav: false
}));

const FAVORITES_KEY = "future2050_favorites";
let showOnlyFav = false;
let currentFeature = null;
let neuralTimer = null;
let simulationTimer = null;

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    features.forEach(f => { f.fav = saved.includes(f.id); });
  } catch (e) {
    console.log("Could not load favorites", e);
  }
}

function saveFavorites() {
  try {
    const ids = features.filter(f => f.fav).map(f => f.id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.log("Could not save favorites", e);
  }
}

function updateDashboard() {
  const total = document.getElementById("totalFeatures");
  const count = document.getElementById("favoriteCount");
  if (total) total.innerText = features.length;
  if (count) count.innerText = features.filter(f => f.fav).length;
}

function toggleFavorite(feature) {
  feature.fav = !feature.fav;
  saveFavorites();
  vibrate(35);
  renderFeatures();
}

function toggleFavFilter() {
  showOnlyFav = !showOnlyFav;
  const button = document.getElementById("btnFav");
  if (button) button.innerText = showOnlyFav ? "★ SHOW ALL" : "★ FAVORITES";
  renderFeatures();
}

function filterFeatures() {
  renderFeatures();
}

function renderFeatures() {
  const container = document.getElementById("featureList");
  if (!container) return;

  updateDashboard();

  const searchBox = document.getElementById("search");
  const query = searchBox ? searchBox.value.trim().toLowerCase() : "";

  const results = features.filter(f => {
    const matchesFav = !showOnlyFav || f.fav;
    const text = `${f.id} ${f.title} ${f.hindi} ${f.desc}`.toLowerCase();
    return matchesFav && (!query || text.includes(query));
  });

  container.innerHTML = "";

  if (!results.length) {
    container.innerHTML =
      '<div style="text-align:center;color:#78838d;padding:40px 12px">No features found</div>';
    return;
  }

  results.forEach(f => {
    const card = document.createElement("div");
    card.className = "feature-card";

    card.innerHTML = `
      <div class="color-bar" style="background:${f.color}"></div>
      <div class="feature-content" style="position:relative;padding-right:54px">
        <div class="feature-id" style="color:${f.color}">#${f.id}</div>
        <div class="feature-title"></div>
        <div class="feature-hindi"></div>
        <div class="feature-desc"></div>
        <button class="favorite-toggle" type="button"
          aria-label="${f.fav ? "Remove favorite" : "Add favorite"}"
          style="position:absolute;right:8px;top:8px;width:40px;height:40px;border:0;background:transparent;color:${f.fav ? "#FFD700" : "#667078"};font-size:24px;cursor:pointer">
          ${f.fav ? "★" : "☆"}
        </button>
      </div>`;

    card.querySelector(".feature-title").textContent = f.title;
    card.querySelector(".feature-hindi").textContent = f.hindi;
    card.querySelector(".feature-desc").textContent = f.desc;

    card.addEventListener("click", () => openDemo(f));

    card.querySelector(".favorite-toggle").addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(f);
    });

    container.appendChild(card);
  });
}

function startNeuralStatus() {
  const status = document.getElementById("status");
  if (!status) return;

  if (neuralTimer) clearInterval(neuralTimer);

  let dots = 1;
  neuralTimer = setInterval(() => {
    status.innerText = "NEURAL LINK: ACTIVE  " + "●".repeat(dots);
    dots = dots >= 3 ? 1 : dots + 1;
  }, 650);
}

window.addEventListener("load", () => {
  loadFavorites();

  setTimeout(() => {
    const splash = document.getElementById("splash");
    const main = document.getElementById("main");
    if (splash) splash.style.display = "none";
    if (main) main.style.display = "block";
    renderFeatures();
    startNeuralStatus();
  }, 1200);
});

function openDemo(feature) {
  currentFeature = feature;

  history.pushState(
    { screen: "demo", id: feature.id },
    "",
    "#feature-" + feature.id
  );

  const main = document.getElementById("main");
  const demo = document.getElementById("demo");
  if (main) main.style.display = "none";
  if (demo) demo.style.display = "block";

  setText("demoId", "FEATURE #" + feature.id);
  setText("demoTitle", feature.title);
  setText("demoHindi", feature.hindi);
  setText("demoDesc", feature.desc);
  setText("demoStatus", "Ready to simulate");

  const id = document.getElementById("demoId");
  const status = document.getElementById("demoStatus");
  const button = document.getElementById("btnStart");
  const progress = document.getElementById("progress");

  if (id) id.style.color = feature.color;
  if (status) status.style.color = feature.color;
  if (button) {
    button.style.background = feature.color;
    button.innerText = "START SIMULATION";
    button.disabled = false;
  }
  if (progress) progress.style.display = "none";
}

function showHome() {
  stopSimulation();
  const demo = document.getElementById("demo");
  const main = document.getElementById("main");
  if (demo) demo.style.display = "none";
  if (main) main.style.display = "block";
  currentFeature = null;
}

function goBack() {
  if (location.hash.startsWith("#feature-")) history.back();
  else showHome();
}

window.addEventListener("popstate", showHome);

const simulations = {
  53: ["Scanning simulated neural signals...", "Calibrating BCI interface...", "Decoding a sample command...", "✅ BCI DEMO COMPLETE"],
  54: ["Starting projection simulation...", "Rendering 3D light field...", "Stabilizing virtual image...", "✅ HOLOGRAM DEMO READY"],
  55: ["Loading AI modules...", "Analyzing task context...", "Running reasoning simulation...", "✅ AI DEMO READY"],
  56: ["Initializing quantum simulator...", "Preparing virtual qubits...", "Simulating quantum states...", "✅ QUANTUM DEMO COMPLETE"],
  57: ["Launching sample agents...", "Assigning simulated tasks...", "Coordinating workflow...", "✅ AGENT DEMO COMPLETE"],
  58: ["Reading sample prompt...", "Generating virtual geometry...", "Adding simulated lighting...", "✅ 3D WORLD DEMO READY"],
  59: ["Scanning sample software...", "Detecting simulated issue...", "Testing a sample repair...", "✅ REPAIR DEMO COMPLETE"],
  60: ["Analyzing sample input...", "Estimating emotional cues...", "Preparing a response...", "✅ EMOTIONAL AI DEMO READY"],
  61: ["Loading assistant model...", "Building virtual hologram...", "Rendering assistant...", "✅ ASSISTANT DEMO READY"],
  62: ["Starting neural-interface simulation...", "Encoding sample information...", "Verifying simulated transfer...", "✅ MEMORY DEMO COMPLETE"],
  63: ["Loading virtual environment...", "Synchronizing sample avatar...", "Starting simulated interaction...", "✅ METAVERSE DEMO READY"],
  64: ["Analyzing sample performance...", "Simulating model adaptation...", "Comparing results...", "✅ AI ADAPTATION DEMO COMPLETE"],
  65: ["Synchronizing sample signals...", "Opening virtual channel...", "Testing simulated link...", "✅ LINK DEMO READY"],
  66: ["Building a sample profile...", "Loading preferences...", "Starting clone simulation...", "✅ CLONE DEMO READY"],
  67: ["Loading sample lesson...", "Extracting key concepts...", "Preparing revision...", "✅ LEARNING DEMO COMPLETE"],
  68: ["Starting nanobot simulation...", "Scanning a virtual environment...", "Running sample treatment model...", "✅ NANOBOT DEMO COMPLETE"],
  69: ["Reading sample blueprint...", "Running replication simulation...", "Generating virtual object...", "✅ REPLICATOR DEMO READY"],
  70: ["Starting dream simulation...", "Generating sample sequence...", "Preparing playback...", "✅ DREAM DEMO READY"]
};

function startSimulation() {
  if (!currentFeature) return;
  stopSimulation();

  const button = document.getElementById("btnStart");
  const status = document.getElementById("demoStatus");
  const progress = document.getElementById("progress");
  if (!button || !status) return;

  const steps = simulations[currentFeature.id] || ["Starting demo...", "✅ DONE"];
  let i = 0;

  button.disabled = true;
  if (progress) {
    progress.style.display = "block";
    progress.style.borderTopColor = currentFeature.color;
  }

  status.style.color = currentFeature.color;
  status.innerText = steps[0];
  vibrate(25);

  simulationTimer = setInterval(() => {
    i++;
    if (i < steps.length) {
      status.innerText = steps[i];
      vibrate(20);
    } else {
      stopSimulation();
      if (progress) progress.style.display = "none";
      button.disabled = false;
      button.innerText = "RUN AGAIN";
      vibrate(70);
    }
  }, 850);
}

function stopSimulation() {
  if (simulationTimer) {
    clearInterval(simulationTimer);
    simulationTimer = null;
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerText = value;
}

function vibrate(ms) {
  try {
    if (navigator.vibrate) navigator.vibrate(ms);
  } catch (e) {
    // Vibration may be unavailable in some browsers/WebViews.
  }
}

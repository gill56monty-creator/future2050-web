// ==================================================
// FUTURE 2050 - COMPLETE SCRIPT.JS
// ==================================================

const features = [
  {
    id: 53,
    title: "Brain Computer Interface",
    hindi: "ब्रेन कंप्यूटर इंटरफेस",
    desc: "Seedha soch kar command dene ka future concept",
    color: "#00F5FF",
    fav: false
  },
  {
    id: 54,
    title: "Holographic Display",
    hindi: "होलोग्राफिक डिस्प्ले",
    desc: "3D holographic projection interface",
    color: "#FF00FF",
    fav: false
  },
  {
    id: 55,
    title: "General Purpose AI",
    hindi: "जनरल पर्पस AI",
    desc: "Multiple types ke tasks samajhne wala advanced AI",
    color: "#39FF14",
    fav: false
  },
  {
    id: 56,
    title: "Quantum Computing",
    hindi: "क्वांटम कंप्यूटिंग",
    desc: "Quantum powered advanced calculations",
    color: "#FF073A",
    fav: false
  },
  {
    id: 57,
    title: "Autonomous AI Agents",
    hindi: "ऑटोनॉमस AI एजेंट्स",
    desc: "Tasks aur workflows automatically manage karne wale AI agents",
    color: "#FF6B00",
    fav: false
  },
  {
    id: 58,
    title: "Real-time 3D World Generation",
    hindi: "रियल टाइम 3D वर्ल्ड जनरेशन",
    desc: "Text prompt se virtual 3D environment generate karna",
    color: "#00BFFF",
    fav: false
  },
  {
    id: 59,
    title: "Self-Repairing Software",
    hindi: "सेल्फ रिपेयरिंग सॉफ्टवेयर",
    desc: "Problems detect karke software ko automatically repair karna",
    color: "#FFFF00",
    fav: false
  },
  {
    id: 60,
    title: "Emotional Intelligence AI",
    hindi: "इमोशनल इंटेलिजेंस AI",
    desc: "Emotional signals ko samajhkar suitable response dena",
    color: "#FF1493",
    fav: false
  },
  {
    id: 61,
    title: "Holographic Virtual Assistant",
    hindi: "होलोग्राफिक वर्चुअल असिस्टेंट",
    desc: "Futuristic 3D virtual assistant concept",
    color: "#7B68EE",
    fav: false
  },
  {
    id: 62,
    title: "Neural Memory Interface",
    hindi: "न्यूरल मेमोरी इंटरफेस",
    desc: "Brain-computer information interaction ka future concept",
    color: "#00FA9A",
    fav: false
  },
  {
    id: 63,
    title: "Immersive Metaverse",
    hindi: "फुल्ली इमर्सिव मेटावर्स",
    desc: "Highly immersive virtual environment integration",
    color: "#FF4500",
    fav: false
  },
  {
    id: 64,
    title: "Self-Evolving AI",
    hindi: "सेल्फ इवॉल्विंग AI",
    desc: "Data aur feedback ke saath adapt aur improve hone wala AI",
    color: "#E600FF",
    fav: false
  },
  {
    id: 65,
    title: "Mind-to-Mind Link",
    hindi: "माइंड टू माइंड कम्युनिकेशन",
    desc: "Direct neural communication ka speculative future concept",
    color: "#00FFCC",
    fav: false
  },
  {
    id: 66,
    title: "Personal AI Clone",
    hindi: "पर्सनल AI क्लोन",
    desc: "Personal preferences aur style par based digital AI profile",
    color: "#FF33CC",
    fav: false
  },
  {
    id: 67,
    title: "Accelerated Learning",
    hindi: "एक्सेलरेटेड लर्निंग",
    desc: "AI-assisted high-speed learning ka future concept",
    color: "#66FF66",
    fav: false
  },
  {
    id: 68,
    title: "Nano-Bot Doctors",
    hindi: "नैनो-बॉट डॉक्टर्स",
    desc: "Medical nanobot treatment ka speculative simulation",
    color: "#FF6666",
    fav: false
  },
  {
    id: 69,
    title: "Matter Replicator",
    hindi: "मैटर रिप्लिकेटर",
    desc: "Digital blueprint se matter replication ka sci-fi concept",
    color: "#FFCC00",
    fav: false
  },
  {
    id: 70,
    title: "Dream Recording",
    hindi: "ड्रीम रिकॉर्डिंग",
    desc: "Dream visualization aur recording ka speculative concept",
    color: "#FF66FF",
    fav: false
  }
];

let showOnlyFav = false;
let currentFeature = null;
let neuralTimer = null;
let simulationTimer = null;


// ==================================================
// APP START
// ==================================================

window.addEventListener("load", () => {

  loadFavorites();
  updateConnection();
  updateClock();

  setTimeout(() => {

    const splash = document.getElementById("splash");
    const main = document.getElementById("main");

    if (splash) {
      splash.style.display = "none";
    }

    if (main) {
      main.style.display = "block";
    }

    renderFeatures();
    startNeuralStatus();

  }, 1800);
});


// ==================================================
// DASHBOARD
// ==================================================

function updateDashboard() {

  const total =
    document.getElementById("totalFeatures");

  const favorites =
    document.getElementById("favoriteCount");

  if (total) {
    total.innerText = features.length;
  }

  if (favorites) {
    favorites.innerText =
      features.filter(feature => feature.fav).length;
  }
}


// ==================================================
// CLOCK
// ==================================================

function updateClock() {

  const clock =
    document.getElementById("clock");

  if (!clock) return;

  const now = new Date();

  clock.innerText =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
}

setInterval(updateClock, 1000);


// ==================================================
// ONLINE / OFFLINE
// ==================================================

function updateConnection() {

  const connection =
    document.getElementById("connection");

  if (!connection) return;

  if (navigator.onLine) {

    connection.innerText = "● ONLINE";
    connection.classList.add("is-online");

  } else {

    connection.innerText = "● OFFLINE";
    connection.classList.remove("is-online");

  }
}

window.addEventListener(
  "online",
  updateConnection
);

window.addEventListener(
  "offline",
  updateConnection
);


// ==================================================
// FAVORITES
// ==================================================

function loadFavorites() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "future2050_favorites"
        ) || "[]"
      );

    features.forEach(feature => {
      feature.fav =
        saved.includes(feature.id);
    });

  } catch (error) {

    console.log(
      "Favorite load error:",
      error
    );
  }
}


function saveFavorites() {

  const ids =
    features
      .filter(feature => feature.fav)
      .map(feature => feature.id);

  localStorage.setItem(
    "future2050_favorites",
    JSON.stringify(ids)
  );
}


function toggleFavorite(feature) {

  feature.fav = !feature.fav;

  saveFavorites();
  vibrate(40);
  renderFeatures();
}


function toggleFavFilter() {

  showOnlyFav = !showOnlyFav;

  const button =
    document.getElementById("btnFav");

  if (button) {

    button.innerText =
      showOnlyFav
        ? "★ SHOW ALL"
        : "★ FAVORITES";
  }

  renderFeatures();
}


// ==================================================
// NEURAL STATUS
// ==================================================

function startNeuralStatus() {

  if (neuralTimer) {
    clearInterval(neuralTimer);
  }

  const status =
    document.getElementById("status");

  if (!status) return;

  let dots = 1;

  neuralTimer =
    setInterval(() => {

      status.innerText =
        "NEURAL LINK: ACTIVE  " +
        "●".repeat(dots);

      dots++;

      if (dots > 3) {
        dots = 1;
      }

    }, 650);
}


// ==================================================
// SEARCH
// ==================================================

function filterFeatures() {
  renderFeatures();
}


// ==================================================
// FEATURE LIST
// ==================================================

function renderFeatures() {

  updateDashboard();

  const container =
    document.getElementById(
      "featureList"
    );

  if (!container) return;

  const search =
    document.getElementById("search");

  const query =
    search
      ? search.value.trim().toLowerCase()
      : "";

  const result =
    features.filter(feature => {

      const favoriteMatch =
        !showOnlyFav || feature.fav;

      const searchable =
        (
          feature.id + " " +
          feature.title + " " +
          feature.hindi + " " +
          feature.desc
        ).toLowerCase();

      const searchMatch =
        !query ||
        searchable.includes(query);

      return (
        favoriteMatch &&
        searchMatch
      );
    });


  container.innerHTML = "";


  if (result.length === 0) {

    container.innerHTML = `
      <div style="
        color:#666;
        text-align:center;
        padding:50px 10px;
      ">
        No features found
      </div>
    `;

    return;
  }


  result.forEach(feature => {

    const card =
      document.createElement("div");

    card.className =
      "feature-card";

    card.innerHTML = `
      <div
        class="color-bar"
        style="background:${feature.color}">
      </div>

      <div class="feature-content">

        <div
          class="feature-id"
          style="color:${feature.color}">
          #${feature.id}

          ${
            feature.fav
              ? '<span class="star">★</span>'
              : ""
          }
        </div>

        <div class="feature-title">
          ${feature.title}
        </div>

        <div class="feature-hindi">
          ${feature.hindi}
        </div>

        <div class="feature-desc">
          ${feature.desc}
        </div>

      </div>
    `;


    // Normal tap
    card.addEventListener(
      "click",
      () => {
        openDemo(feature);
      }
    );


    // Desktop right click
    card.addEventListener(
      "contextmenu",
      event => {

        event.preventDefault();

        toggleFavorite(feature);
      }
    );


    // Mobile long press
    let pressTimer = null;
    let longPressed = false;

    card.addEventListener(
      "touchstart",
      () => {

        longPressed = false;

        pressTimer =
          setTimeout(() => {

            longPressed = true;

            toggleFavorite(feature);

          }, 650);
      },
      { passive: true }
    );


    card.addEventListener(
      "touchend",
      event => {

        if (pressTimer) {
          clearTimeout(pressTimer);
        }

        if (longPressed) {
          event.preventDefault();
        }
      }
    );


    card.addEventListener(
      "touchmove",
      () => {

        if (pressTimer) {
          clearTimeout(pressTimer);
        }
      },
      { passive: true }
    );


    container.appendChild(card);
  });
}


// ==================================================
// DETAIL SCREEN
// ==================================================

function openDemo(feature) {

  currentFeature = feature;

  history.pushState(
    {
      screen: "demo",
      id: feature.id
    },
    "",
    "#feature-" + feature.id
  );

  const main =
    document.getElementById("main");

  const demo =
    document.getElementById("demo");

  if (main) {
    main.style.display = "none";
  }

  if (demo) {
    demo.style.display = "block";
  }

  setText(
    "demoId",
    "FEATURE #" + feature.id
  );

  setText(
    "demoTitle",
    feature.title
  );

  setText(
    "demoHindi",
    feature.hindi
  );

  setText(
    "demoDesc",
    feature.desc
  );

  setText(
    "demoStatus",
    "Ready to simulate"
  );


  const id =
    document.getElementById(
      "demoId"
    );

  const status =
    document.getElementById(
      "demoStatus"
    );

  const button =
    document.getElementById(
      "btnStart"
    );

  const progress =
    document.getElementById(
      "progress"
    );


  if (id) {
    id.style.color =
      feature.color;
  }

  if (status) {
    status.style.color =
      feature.color;
  }

  if (button) {

    button.style.background =
      feature.color;

    button.innerText =
      "START SIMULATION";

    button.disabled = false;
  }

  if (progress) {
    progress.style.display =
      "none";
  }

  window.scrollTo(0, 0);
}


// ==================================================
// BACK
// ==================================================

function showHome() {

  stopSimulation();

  const demo =
    document.getElementById("demo");

  const main =
    document.getElementById("main");

  if (demo) {
    demo.style.display = "none";
  }

  if (main) {
    main.style.display = "block";
  }

  currentFeature = null;
}


function goBack() {

  showHome();

  if (
    location.hash.startsWith(
      "#feature-"
    )
  ) {

    history.back();
  }
}


window.addEventListener(
  "popstate",
  () => {

    const demo =
      document.getElementById(
        "demo"
      );

    if (
      demo &&
      demo.style.display !== "none"
    ) {

      showHome();
    }
  }
);


// ==================================================
// SIMULATIONS
// ==================================================

const simulations = {

  53: [
    "Scanning simulated neural signals...",
    "Calibrating BCI interface...",
    "Decoding virtual thought pattern...",
    "Recognizing simulated command...",
    "✅ BCI SIMULATION COMPLETE"
  ],

  54: [
    "Starting projection system...",
    "Calculating virtual light field...",
    "Rendering 3D hologram...",
    "Stabilizing projection...",
    "✅ HOLOGRAM SIMULATION READY"
  ],

  55: [
    "Loading general AI modules...",
    "Analyzing task context...",
    "Running reasoning simulation...",
    "Generating result...",
    "✅ GENERAL AI SIMULATION READY"
  ],

  56: [
    "Initializing quantum simulator...",
    "Preparing virtual qubits...",
    "Simulating quantum states...",
    "Computing result...",
    "✅ QUANTUM SIMULATION COMPLETE"
  ],

  57: [
    "Launching AI agents...",
    "Assigning virtual tasks...",
    "Coordinating workflow...",
    "Verifying results...",
    "✅ AI AGENTS SIMULATION COMPLETE"
  ],

  58: [
    "Reading environment prompt...",
    "Generating 3D geometry...",
    "Adding virtual materials...",
    "Building environment...",
    "✅ 3D WORLD GENERATED"
  ],

  59: [
    "Scanning sample software...",
    "Detecting simulated issue...",
    "Generating repair...",
    "Running verification...",
    "✅ SOFTWARE REPAIR COMPLETE"
  ],

  60: [
    "Reading simulated input...",
    "Analyzing emotional cues...",
    "Estimating context...",
    "Generating response...",
    "✅ EMOTIONAL AI READY"
  ],

  61: [
    "Loading assistant model...",
    "Building virtual hologram...",
    "Synchronizing visual data...",
    "Rendering assistant...",
    "✅ HOLOGRAPHIC ASSISTANT READY"
  ],

  62: [
    "Initializing neural simulation...",
    "Preparing sample information...",
    "Encoding virtual memory...",
    "Verifying transfer...",
    "✅ MEMORY INTERFACE DEMO COMPLETE"
  ],

  63: [
    "Loading virtual world...",
    "Initializing immersive environment...",
    "Synchronizing avatar...",
    "Starting interaction...",
    "✅ METAVERSE SIMULATION READY"
  ],

  64: [
    "Analyzing AI performance...",
    "Simulating adaptation...",
    "Testing new configuration...",
    "Comparing results...",
    "✅ ADAPTIVE AI SIMULATION COMPLETE"
  ],

  65: [
    "Initializing dual neural simulation...",
    "Synchronizing virtual signals...",
    "Creating communication channel...",
    "Testing link...",
    "✅ MIND-LINK SIMULATION READY"
  ],

  66: [
    "Analyzing preference profile...",
    "Building AI personality...",
    "Loading digital profile...",
    "Starting AI clone...",
    "✅ PERSONAL AI CLONE READY"
  ],

  67: [
    "Loading learning material...",
    "Extracting key concepts...",
    "Creating accelerated lesson...",
    "Preparing revision...",
    "✅ LEARNING SIMULATION COMPLETE"
  ],

  68: [
    "Initializing nanobot simulation...",
    "Scanning virtual bloodstream...",
    "Locating simulated target...",
    "Running treatment model...",
    "✅ NANOBOT SIMULATION COMPLETE"
  ],

  69: [
    "Reading digital blueprint...",
    "Analyzing virtual materials...",
    "Running replication model...",
    "Generating virtual object...",
    "✅ REPLICATION SIMULATION COMPLETE"
  ],

  70: [
    "Starting dream simulation...",
    "Generating visual sequence...",
    "Encoding simulated dream...",
    "Preparing playback...",
    "✅ DREAM DEMO READY"
  ]
};


// ==================================================
// START SIMULATION
// ==================================================

function startSimulation() {

  if (!currentFeature) {
    return;
  }

  stopSimulation();

  const button =
    document.getElementById(
      "btnStart"
    );

  const status =
    document.getElementById(
      "demoStatus"
    );

  const progress =
    document.getElementById(
      "progress"
    );

  if (!button || !status) {
    return;
  }


  const steps =
    simulations[
      currentFeature.id
    ] || [
      "Initializing...",
      "Processing...",
      "Finalizing...",
      "✅ SIMULATION COMPLETE"
    ];


  button.disabled = true;

  if (progress) {

    progress.style.display =
      "block";

    progress.style.borderTopColor =
      currentFeature.color;
  }


  let index = 0;

  status.innerText =
    steps[index];

  status.style.color =
    currentFeature.color;

  vibrate(30);


  simulationTimer =
    setInterval(() => {

      index++;

      if (
        index <
        steps.length
      ) {

        status.innerText =
          steps[index];

        vibrate(25);

      } else {

        stopSimulation();

        if (progress) {
          progress.style.display =
            "none";
        }

        button.disabled = false;

        button.innerText =
          "RUN AGAIN";

        vibrate(100);
      }

    }, 900);
}


// ==================================================
// STOP SIMULATION
// ==================================================

function stopSimulation() {

  if (simulationTimer) {

    clearInterval(
      simulationTimer
    );

    simulationTimer = null;
  }
}


// ==================================================
// UTILITIES
// ==================================================

function setText(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.innerText = value;
  }
}


function vibrate(duration) {

  if (
    navigator.vibrate &&
    typeof navigator.vibrate ===
      "function"
  ) {

    navigator.vibrate(
      duration
    );
  }
}
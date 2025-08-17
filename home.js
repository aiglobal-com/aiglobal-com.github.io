







document.addEventListener("DOMContentLoaded", () => {
  const feed = document.getElementById("activity-feed");

  const actions = ["Deposit", "Withdrawal"];

  // List of realistic last 3 letters (unique endings)
  const realisticEndings = ["vid", "der", "ean", "son", "dan", "ley", "ric", "red", "tim", "mar",
    "uca", "o34", "obi", "obo", "ub1", "ufu", "ug0", "ibi", "a12", "af4",
    "o03", "u26", "ufu", "udu", "aba", "og5", "ebe", "ie0", "ig5", "ib1",
    "eg0", "uca", "ugo", "a78", "ocu", "eca", "ibe", "udu", "a00", "e67",
    "aca", "aci", "ug5", "ube", "o81", "ebe", "obo", "o47", "aof", "o03",
    "ifa", "udu", "a12", "ug0", "u48", "a56", "igi", "ae2", "uca", "oba",
    "ibu", "u26", "o81", "obo", "ezi", "eca", "u60", "uca", "a00", "ubu",
    "oc7", "ifu", "ube", "afu", "ub1", "a78", "ibu", "uca", "ode", "ibo",
    "ou5", "ofo", "ie0", "ibe", "ica", "ibu", "ug0", "u26", "a56", "ubo",
    "aca", "a00", "ub1", "uca", "a78", "obi", "of9", "u60", "ogu", "ibu",
    "ezi", "a12", "eca", "ufu", "oca", "aba", "ube", "ube", "ezi", "uca"


  ];

  // Random letters generator
  function randomLetters(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  }

  // Mask username, show only last 3 letters
  function maskUser(name) {
    const lastThree = name.slice(-3);
    return `*****${lastThree}`;
  }

  function randomAmount() {
    return (Math.random() * 500 + 50).toFixed(2);
  }

  function randomTime() {
    const mins = Math.floor(Math.random() * 5) + 1;
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }

  // Track used endings to ensure uniqueness
  let usedEndings = new Set();

  // Create a new activity ensuring unique last 3 letters (realistic endings)
  function createActivity() {
    let ending;

    // Pick a unique realistic ending
    do {
      ending = realisticEndings[Math.floor(Math.random() * realisticEndings.length)];
    } while (usedEndings.has(ending));

    usedEndings.add(ending);

    // Prepend random letters to make a username length between 6 and 9 total
    const prefixLength = Math.floor(Math.random() * 4) + 3; // 3 to 6 letters before ending
    const prefix = randomLetters(prefixLength);
    const username = prefix + ending;

    const action = actions[Math.floor(Math.random() * actions.length)];
    const masked = maskUser(username);
    const amount = randomAmount();
    const time = randomTime();

    const div = document.createElement("div");
    div.className = `activity-item ${action.toLowerCase()}`;
    div.dataset.ending = ending; // store for removal later

    div.innerHTML = `
      <div class="activity-user">${masked}</div>
      <div class="activity-details">
        <span class="activity-amount">${action} - $${amount}</span>
        <span class="activity-time">${time}</span>
      </div>
    `;

    return div;
  }

  // Initialize feed with 5 activities
  for (let i = 0; i < 5; i++) {
    const activity = createActivity();
    feed.appendChild(activity);
  }

  // Update feed every 5 seconds
  setInterval(() => {
    const newActivity = createActivity();
    feed.prepend(newActivity);

    // Remove oldest if more than 5
    if (feed.children.length > 5) {
      const last = feed.lastElementChild;
      const endingToRemove = last.dataset.ending;
      usedEndings.delete(endingToRemove);
      feed.removeChild(last);
    }
  }, 5000);
});







document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-cards");
  const status = document.getElementById("status-message");

  const ids = ["bitcoin","ethereum","ripple","litecoin","cardano"].join(",");
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?` +
                 `vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=5&page=1` +
                 `&sparkline=false&price_change_percentage=24h`;

  let lastSuccessfulData = null;
  let retryInterval = 3000; // Start with 3 seconds

  async function fetchAndUpdate() {
    try {
      const resp = await fetch(apiUrl);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const coins = await resp.json();
      if (!Array.isArray(coins) || coins.length === 0) throw new Error("Invalid response");

      lastSuccessfulData = coins;
      renderCoins(coins);
      status.textContent = ''; // Hide message on success
      retryInterval = 3000;
    } catch (err) {
      console.error("Fetch failed:", err);
      if (lastSuccessfulData) {
        renderCoins(lastSuccessfulData);
        status.textContent = "Displaying cached data due to fetch error.";
      } else {
        status.textContent = "Error loading data. Retrying…";
      }
      retryInterval = Math.min(retryInterval * 2, 60000); // Exponential backoff to max 60s
    }
  }

  function renderCoins(coins) {
    container.innerHTML = coins.map(c => {
      const isUp = c.price_change_percentage_24h >= 0;
      const symbol = isUp ? '▲' : '▼';
      const pct = Math.abs(c.price_change_percentage_24h).toFixed(2);
      return `
        <div class="crypto-card">
          <div class="crypto-logo">
            <img src="${c.image}" alt="${c.name} Logo" />
          </div>
          <div class="crypto-name">${c.name} (${c.symbol.toUpperCase()})</div>
          <div class="crypto-price">$${c.current_price.toLocaleString()}</div>
          <div class="crypto-change ${isUp ? 'up' : 'down'}">${symbol} ${pct}%</div>
        </div>`;
    }).join("");
  }

  fetchAndUpdate();  
  (function scheduleNext() {
    setTimeout(() => {
      fetchAndUpdate();
      scheduleNext();
    }, retryInterval);
  })();
});

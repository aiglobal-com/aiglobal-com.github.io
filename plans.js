


// === USER CONTROL ===
let activeUser = 'defaultUser';

// === STATE ===
let userBalance = 11.00;
let cooldowns = {};

// === DOM ELEMENTS ===
const balanceEl = document.getElementById('balance');
const messageBox = document.getElementById('message-box');
const verificationPopup = document.getElementById('verification-popup');
const codeDisplay = document.getElementById('code-display');
const userCodeInput = document.getElementById('user-code');
const verifyBtn = document.getElementById('verify-btn');
const cancelBtn = document.getElementById('cancel-btn');

// === CODE ===
let currentPlan = null;
let currentCode = '';

// === BALANCE ===
function updateBalance() {
  balanceEl.textContent = `Available Balance: $${userBalance.toFixed(2)}`;
  const allBalances = JSON.parse(localStorage.getItem('userBalances') || '{}');
  allBalances[activeUser] = userBalance;
  localStorage.setItem('userBalances', JSON.stringify(allBalances));
}

function setBalance(value) {
  userBalance = parseFloat(value);
  updateBalance();
}

function getBalance() {
  return userBalance;
}

// === PLAN 1 USAGE ===
function getPlan1Uses() {
  const uses = JSON.parse(localStorage.getItem('plan1Uses') || '{}');
  return uses[activeUser] || 0;
}

function setPlan1Uses(value) {
  const uses = JSON.parse(localStorage.getItem('plan1Uses') || '{}');
  uses[activeUser] = value;
  localStorage.setItem('plan1Uses', JSON.stringify(uses));
}

function isCooldownActive() {
  const lastUsed = cooldowns[activeUser + '_plan1'] || 0;
  return Date.now() - lastUsed < 86400000; // 24 hours
}

// === LOCAL STORAGE SAVE/LOAD ===
function saveReturnEvent(amount, planNumber, capital, profit) {
  const returnTime = Date.now() + 86400000; // 24 hours later
  const allReturns = JSON.parse(localStorage.getItem('pendingReturns') || '{}');

  if (!allReturns[activeUser]) {
    allReturns[activeUser] = [];
  }

  allReturns[activeUser].push({
    amount,
    plan: planNumber,
    time: returnTime,
    capital,
    profit
  });

  localStorage.setItem('pendingReturns', JSON.stringify(allReturns));
}

function checkPendingReturns() {
  const allReturns = JSON.parse(localStorage.getItem('pendingReturns') || '{}');
  const userReturns = allReturns[activeUser] || [];
  const now = Date.now();
  const remaining = [];

  for (const event of userReturns) {
    if (now < event.time) {
      remaining.push(event); // not ready yet
    } else {
      userBalance += event.amount;
      showMessage(`💰 Plan ${event.plan} completed. $${event.amount} returned.`);
    }
  }

  allReturns[activeUser] = remaining;
  localStorage.setItem('pendingReturns', JSON.stringify(allReturns));
  updateBalance();
}

// === VERIFICATION ===
function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

verifyBtn.addEventListener('click', () => {
  const inputCode = userCodeInput.value.toUpperCase();

  if (inputCode === currentCode) {
    const recycleCost = 10;
    const profit = 1;
    const returnAmount = recycleCost + profit;

    if (userBalance < recycleCost) {
      showMessage('❌ Insufficient balance.');
      verificationPopup.classList.add('hidden');
      return;
    }

    const uses = getPlan1Uses();
    if (uses >= 7) {
      showMessage('❌ Max uses (7) reached.');
      verificationPopup.classList.add('hidden');
      return;
    }

    userBalance -= recycleCost;
    cooldowns[activeUser + '_plan1'] = Date.now();
    localStorage.setItem('cooldowns', JSON.stringify(cooldowns));
    setPlan1Uses(uses + 1);
    updateBalance();
    saveReturnEvent(returnAmount, 1, recycleCost, profit);
    showMessage('✅ Plan 1 started.');
  } else {
    showMessage('❌ Incorrect code. Plan canceled.');
  }

  verificationPopup.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
  verificationPopup.classList.add('hidden');
});

// === PLAN BUTTONS ===
document.querySelectorAll('.select-btn').forEach(button => {
  button.addEventListener('click', () => {
    const planCard = button.closest('.plan');
    const planNum = parseInt(planCard.dataset.plan);
    const cost = parseFloat(planCard.dataset.cost || 0);

    if (planNum >= 2 && planNum <= 5) {
      showMessage('Available balance is not sufficient');
      return;
    }

    if (planNum === 6) {
      if (userBalance < cost) {
        showMessage('Available balance is not sufficient');
        return;
      }
      userBalance -= cost;
      updateBalance();
      showMessage(`Plan 6 activated.`);
      return;
    }

    if (planNum === 1) {
      const uses = getPlan1Uses();
      if (uses >= 7) {
        showMessage('❌ Plan 1 usage limit reached (7 times).');
        return;
      }

      if (isCooldownActive()) {
        showMessage('⏳ Plan 1 is on 24h cooldown.');
        return;
      }

      currentPlan = planCard;
      currentCode = generateCode();
      codeDisplay.textContent = currentCode;
      userCodeInput.value = '';
      verificationPopup.classList.remove('hidden');
    }
  });
});

// === MESSAGE BOX ===
function showMessage(msg) {
  messageBox.textContent = msg;
  messageBox.classList.remove('hidden');
  messageBox.classList.add('show');

  setTimeout(() => {
    messageBox.classList.remove('show');
    messageBox.classList.add('hidden');
  }, 3000);
}

// === USER SWITCHING ===
function changeUser(newUser) {
  activeUser = newUser;

  const balances = JSON.parse(localStorage.getItem('userBalances') || '{}');
  userBalance = balances[activeUser] || 11.00;

  cooldowns = JSON.parse(localStorage.getItem('cooldowns') || '{}');

  initialize();
}

// === INIT ===
function initialize() {
  cooldowns = JSON.parse(localStorage.getItem('cooldowns') || '{}'); // <-- Moved here
  checkPendingReturns();
  updateBalance();
}

// Initialize UI for default user
initialize();







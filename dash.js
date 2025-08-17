const transactions = [
  /*{ date: '2025-08-14', type: 'Deposit', amount: 1000 },*/
];

let totalDeposit = 0;
let totalWithdraw = 0;
let totalBenefit = 0;

const historyEl = document.getElementById('dash001-transaction-history');

transactions.forEach(tx => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${tx.date}</td>
    <td>${tx.type}</td>
    <td>$${tx.amount}</td>
  `;
  historyEl.appendChild(row);

  if (tx.type === 'Deposit') totalDeposit += tx.amount;
  if (tx.type === 'Withdraw') totalWithdraw += tx.amount;
  if (tx.type === 'Benefit') totalBenefit += tx.amount;
});

document.getElementById('dash001-deposit-amount').innerText = `$${totalDeposit}`;
document.getElementById('dash001-withdraw-amount').innerText = `$${totalWithdraw}`;
document.getElementById('dash001-benefit-amount').innerText = `$${totalBenefit}`;

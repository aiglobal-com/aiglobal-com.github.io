
        const depositMethodContainer = document.getElementById('depositMethod');
        const dropdownButton = document.getElementById('dropdownButton');
        const dropdownContent = document.querySelector('.dropdown-content');
        const amountInDollars = document.getElementById('amountInDollars');
        const currencyAmount = document.getElementById('currencyAmount');
        const depositButton = document.getElementById('depositButton');
        const modal = document.getElementById('modal');
        const chosenCurrency = document.getElementById('chosenCurrency');
        const usdAmount = document.getElementById('usdAmount');
        const cryptoAmount = document.getElementById('cryptoAmount');
        const address = document.getElementById('address');
        const copySuccessPopup = document.getElementById('copySuccessPopup');
        const errorMessage = document.getElementById('error-message');

        // Store exchange rates (initially 0, will be updated from API)
        let exchangeRates = {
            BTC: 0,
            TRX: 0,
            ETH: 0,
            "USDT-TRC20": 1,
            "USDT-ERC20": 1
        };

        // Store deposit addresses
        const depositAddresses = {
            BTC: "bc1qe0w6kukn9agsazeyexazek6vm2kwq09p39shwa",
            TRX: "TDfFyVX6ViRemfgcFT2MpDE7WDy22M8KTn",
            ETH: "0x30E4B16bD4ace4ECe38e280Dd43854117738cc09",
            "USDT-TRC20": "TDfFyVX6ViRemfgcFT2MpDE7WDy22M8KTn",
            "USDT-ERC20": "0x30E4B16bD4ace4ECe38e280Dd43854117738cc09"
        };

        // Toggle dropdown visibility
        dropdownButton.addEventListener('click', function() {
            depositMethodContainer.classList.toggle('open');
        });

        

        // Handle method selection from dropdown
        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach(function(item) {
            item.addEventListener('click', function() {
                dropdownButton.textContent = item.textContent;
                depositMethodContainer.classList.remove('open');
                depositMethodContainer.dataset.selectedMethod = item.getAttribute('data-value');
                chosenCurrency.textContent = item.textContent;
                currencyAmount.value = '';
                amountInDollars.value = '';
            });
        });

        // Fetch exchange rates from API
        function fetchExchangeRates() {
            const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    exchangeRates.BTC = data.bitcoin.usd;
                    exchangeRates.ETH = data.ethereum.usd;
                    updateCurrencyAmount();
                })
                .catch(error => {
                    console.error('Error fetching exchange rates:', error);
                });
        }

        // Update the amount in the chosen currency based on the current exchange rate
        amountInDollars.addEventListener('input', updateCurrencyAmount);

        function updateCurrencyAmount() {
            const amount = parseFloat(amountInDollars.value);
            const selectedMethod = depositMethodContainer.dataset.selectedMethod;

            if (!isNaN(amount) && selectedMethod) {
                const rate = exchangeRates[selectedMethod] || 1;
                const convertedAmount = (amount / rate).toFixed(6);
                currencyAmount.value = convertedAmount;
            }
        }

        // When "Deposit Now" is clicked
        depositButton.addEventListener('click', function() {
            const method = depositMethodContainer.dataset.selectedMethod;
            const amount = parseFloat(amountInDollars.value);

            if (isNaN(amount) || !method) {
                errorMessage.style.display = 'block'; // Show error message
                
                return;
                
            }

            errorMessage.style.display = 'none'; // Hide error message
            const rate = exchangeRates[method];
            const amountInCurrency = (amount / rate).toFixed(6);

            // Show modal with details
            usdAmount.textContent = amount.toFixed(2);
            cryptoAmount.value = amountInCurrency;
            address.value = depositAddresses[method];

            modal.style.display = 'block';
        });

        // Close the modal
        function closeModal() {
            modal.style.display = 'none';
        }

        // Copy to clipboard function
        function copyToClipboard(inputId) {
            const inputElement = document.getElementById(inputId);
            inputElement.select();
            document.execCommand("copy");

            // Show "Copied successfully" message as popup
            copySuccessPopup.style.display = 'block';
            setTimeout(() => {
                copySuccessPopup.style.display = 'none'; // Hide after 3 seconds
            }, 3000);
        }

        // Fetch exchange rates when the page loads
        fetchExchangeRates();




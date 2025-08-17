
    const chatbox = document.getElementById('chatbox');
    const inputBox = document.getElementById('input-box');
    const chatContainer = document.getElementById('chat-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    
    const menu = document.getElementById('menu');
    const menuIcon = document.getElementById('menu-icon');

    // Function to toggle menu visibility
    function toggleMenu() {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    // Hide the menu if the user clicks anywhere on the page, including the menu itself or menu options
    document.addEventListener('click', function(event) {
    // If the clicked element is the menu icon, toggle the menu visibility
    if (menuIcon.contains(event.target)) {
        toggleMenu();
    } else {
        // Otherwise, hide the menu if the click is outside the menu or on the menu itself
        menu.style.display = 'none';
    }

    // Close the menu when clicking on either of the menu options (Restart or Real Person)
    if (event.target.closest('#menu a')) {
        menu.style.display = 'none';
    }
    });







    // Function to restart the conversation
    function restartConversation() {
      chatbox.innerHTML = ''; // Clear the conversation
      saveChatHistory(); // Save empty chat history
    }

    // Function to simulate a real person request
    function realPerson() {
      const supportDiv = document.createElement('div');
      supportDiv.classList.add('message', 'support');
      supportDiv.innerHTML = `<div class="bot-icon">P</div>Wait, looking for a well-skilled agent...`;
      chatbox.appendChild(supportDiv);

      // Show the loading indicator
      loadingIndicator.innerHTML = '<div class="loader"></div>';

      saveChatHistory(); // Save chat history to localStorage
      chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message

      setTimeout(() => {
        const tryAgainDiv = document.createElement('div');
        tryAgainDiv.classList.add('message', 'support');
        tryAgainDiv.innerHTML = `<div class="bot-icon">A</div>Try again later.`;
        chatbox.appendChild(tryAgainDiv);

        // Hide the loading indicator
        loadingIndicator.innerHTML = '';

        saveChatHistory(); // Save chat history to localStorage
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message
      }, 10000); // Wait 10 seconds before responding
    }

    // Load previous chat history from localStorage if available
    window.onload = function() {
      const chatHistory = localStorage.getItem('chatHistory');
      if (chatHistory) {
        chatbox.innerHTML = chatHistory;
      }
    };

    // Save chat history to localStorage
    function saveChatHistory() {
      localStorage.setItem('chatHistory', chatbox.innerHTML);
    }

    // Open chat function
    function openChat() {
      chatContainer.style.display = 'flex';
      document.getElementById('open-chat-btn').style.display = 'none'; // Hide open chat button
      greetUser(); // Greet user when chat is opened
    }

    // Greet user when chat is opened
    function greetUser() {
      const supportDiv = document.createElement('div');
      supportDiv.classList.add('message', 'support');
      supportDiv.innerHTML = `<div class="bot-icon">A</div>Hey, I am Alexa, ChatBot assistant! How can I help you?`;
      chatbox.appendChild(supportDiv);

      saveChatHistory(); // Save chat history to localStorage
      chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message
    }

    // Close chat function
    function closeChat() {
      chatContainer.style.display = 'none'; // Hide the chat container
      document.getElementById('open-chat-btn').style.display = 'block'; // Show the open chat button
    }


    // Function to send message using Enter key
    function sendMessage(event) {
      if (event.key === 'Enter' && inputBox.value.trim() !== "") {
        sendMessageToChat(inputBox.value);
        inputBox.value = ""; // Clear input after sending
      }
    }

    // Function to send message using the button
    function sendMessageButton() {
      if (inputBox.value.trim() !== "") {
        sendMessageToChat(inputBox.value);
        inputBox.value = ""; // Clear input after sending
      }
    }


    // Function to handle sending a message
    function sendMessageToChat(userMessage) {
      const userMessageDiv = document.createElement('div');
      userMessageDiv.classList.add('message', 'user');
      userMessageDiv.innerHTML = `<div class="user-icon">U</div>You: ${userMessage}`;
      chatbox.appendChild(userMessageDiv);

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'support');
        botMessageDiv.innerHTML = `<div class="bot-icon">A</div>Alexa: ${botResponse}`;
        chatbox.appendChild(botMessageDiv);

        saveChatHistory(); // Save chat history to localStorage
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message
        loadingIndicator.innerHTML = ''; // Hide loading indicator
      }, 1000);

      // Show loading indicator while the bot is thinking
      loadingIndicator.innerHTML = '<div class="loader"></div>';

      chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message
    }

    // Function to get bot's response based on user message
    function getBotResponse(userMessage) {
      const userMessageLower = userMessage.toLowerCase();

      // Simple keyword-based responses
      if (userMessageLower.includes("hello")) {
        return "Hi! How can I assist you today?";
      }
      if (userMessageLower.includes("pricing")) {
        return "You can check our pricing on our website.";
      }
      return "I'm sorry, I didn't understand that. Can you rephrase?";
    }

    // Hide the menu if the user clicks outside of it or on the menu icon
    document.addEventListener('click', function(event) {
    // Check if the clicked element is the menu icon
    if (menuIcon.contains(event.target)) {
        toggleMenu(); // Toggle the menu
    } else if (!menu.contains(event.target)) {
        // If the clicked element is outside of the menu, hide the menu
        menu.style.display = 'none';
    }
    });




document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input');
    const sendMessage = document.querySelector('.send-message');
    const quickActions = document.querySelectorAll('.quick-action-btn');

    let conversationState = {
        step: 'greeting',
        destination: null,
        startDate: null,
        endDate: null,
        budget: null
    };

    const botResponses = {
        greeting: {
            message: "Hello there! 😊 Welcome to your personal travel planner. I'm here to help you plan the perfect trip. Let's get started!",
            quickActions: ['Find Hotels', 'Popular Destinations', 'Budget Planning']
        },
        askDestination: {
            message: "Where would you like to go? ✈️ Choose from popular destinations like Ram Mandir, Taj Mahal, Manali, or Varanasi Ghats—or enter any place you have in mind!",
            quickActions: ['Ram Mandir', 'Taj Mahal', 'Manali', 'Varanasi Ghats']
        },
        askDates: {
            message: "Great choice! When are you planning to travel? 📅 Please enter your start and end dates in DD-MM-YYYY format.",
            quickActions: ['Next Week', 'Next Month', 'Custom Dates']
        },
        askBudget: {
            message: "Got it! Now, what's your estimated budget for this trip? 💰 This will help me find the best options for you.",
            quickActions: ['Under ₹2000', '₹2000-₹4000', '₹4000-₹6000', 'Above ₹6000']
        },
        searching: {
            message: "Awesome! 🎉 I'm now looking for the best hotels and flights that fit your preferences. Just a moment while I gather the details...",
            quickActions: []
        },
        showResults: {
            message: "Here are the top recommendations for your trip! Click on any option to see more details or proceed with booking. Safe travels! 🚀🌍",
            quickActions: ['View All Hotels', 'Compare Prices', 'Save Search']
        }
    };

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            showBotMessage(botResponses.greeting);
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        resetChat();
    });

    // Handle message sending
    function sendUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">Just now</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showBotMessage(response) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.innerHTML = `
            <div class="message-content">${response.message}</div>
            <div class="message-time">Just now</div>
        `;
        chatMessages.appendChild(messageElement);

        if (response.quickActions && response.quickActions.length > 0) {
            const quickActionsDiv = document.createElement('div');
            quickActionsDiv.className = 'quick-actions';
            response.quickActions.forEach(action => {
                const button = document.createElement('button');
                button.className = 'quick-action-btn';
                button.textContent = action;
                button.addEventListener('click', () => handleQuickAction(action));
                quickActionsDiv.appendChild(button);
            });
            chatMessages.appendChild(quickActionsDiv);
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserInput(input) {
        sendUserMessage(input);
        
        switch (conversationState.step) {
            case 'greeting':
                conversationState.step = 'askDestination';
                showBotMessage(botResponses.askDestination);
                break;
            case 'askDestination':
                conversationState.destination = input;
                conversationState.step = 'askDates';
                showBotMessage(botResponses.askDates);
                break;
            case 'askDates':
                conversationState.startDate = input;
                conversationState.step = 'askBudget';
                showBotMessage(botResponses.askBudget);
                break;
            case 'askBudget':
                conversationState.budget = input;
                conversationState.step = 'searching';
                showBotMessage(botResponses.searching);
                setTimeout(() => {
                    showBotMessage(botResponses.showResults);
                    searchAndDisplayResults();
                }, 2000);
                break;
        }
    }

    function handleQuickAction(action) {
        switch (action) {
            case 'Find Hotels':
                handleUserInput('I want to find hotels');
                break;
            case 'Ram Mandir':
            case 'Taj Mahal':
            case 'Manali':
            case 'Varanasi Ghats':
                handleUserInput(action);
                break;
            case 'Next Week':
                const nextWeek = getFormattedDate(7);
                handleUserInput(`${nextWeek} to ${getFormattedDate(14)}`);
                break;
            case 'Next Month':
                const nextMonth = getFormattedDate(30);
                handleUserInput(`${nextMonth} to ${getFormattedDate(37)}`);
                break;
            case 'Under ₹2000':
            case '₹2000-₹4000':
            case '₹4000-₹6000':
            case 'Above ₹6000':
                handleUserInput(action);
                break;
            case 'View All Hotels':
                searchAndDisplayResults();
                break;
        }
    }

    function searchAndDisplayResults() {
        if (conversationState.destination) {
            window.location.href = `hotels.html?destination=${encodeURIComponent(conversationState.destination)}`;
        }
    }

    function getFormattedDate(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toLocaleDateString('en-GB');
    }

    function resetChat() {
        chatMessages.innerHTML = '';
        conversationState = {
            step: 'greeting',
            destination: null,
            startDate: null,
            endDate: null,
            budget: null
        };
    }

    // Handle send button click
    sendMessage.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserInput(message);
            chatInput.value = '';
        }
    });

    // Handle enter key press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                handleUserInput(message);
                chatInput.value = '';
            }
        }
    });

    // Language selector functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}); 
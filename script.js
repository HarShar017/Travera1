// Register ScrollTrigger plugin first
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Theme Toggle with smooth transition
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(isDark) {
    if (isDark) {
        html.setAttribute('data-theme', 'dark');
        document.body.style.colorScheme = 'dark';
    } else {
        html.setAttribute('data-theme', 'light');
        document.body.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check for saved theme preference or system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
});

// Mobile Menu with improved animation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const moreMenu = document.querySelector('.more-menu');
let isMenuOpen = false;

function toggleMenu(event) {
    event?.preventDefault();
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    if (!isMenuOpen) {
        moreMenu.querySelector('.more-content').style.display = 'none';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// More Menu Toggle
const moreBtn = document.querySelector('.more-btn');
const moreContent = document.querySelector('.more-content');

function handleMoreMenu(event) {
    event.stopPropagation();
    const isVisible = moreContent.style.display === 'block';
    
    if (!isVisible) {
        moreContent.style.display = 'block';
        moreContent.style.opacity = '1';
        moreContent.style.visibility = 'visible';
        moreContent.style.transform = 'translateY(0)';
    }
}

function hideMoreMenu() {
    moreContent.style.opacity = '0';
    moreContent.style.visibility = 'hidden';
    moreContent.style.transform = 'translateY(10px)';
    setTimeout(() => {
        moreContent.style.display = 'none';
    }, 300);
}

moreBtn.addEventListener('mouseenter', handleMoreMenu);
moreMenu.addEventListener('mouseleave', hideMoreMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        toggleMenu();
    }
});

// Reliable image loading with fallbacks
const fallbackImages = {
    'hero-main': 'https://images.unsplash.com/photo-1598324789736-4861f89564a0',
    'taj-mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
    'kerala-backwaters': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2',
    'varanasi-ganges': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc',
    'jaipur-palace': 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
    'goa-beach': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'
};

function loadImage(url, fallbackKey) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(fallbackImages[fallbackKey]);
        img.src = url;
    });
}

// Initialize images
async function initializeImages() {
    const mainImage = document.querySelector('.main-image');
    const tajImage = document.querySelector('.floating-card.top img');
    const keralaImage = document.querySelector('.floating-card.bottom img');

    mainImage.src = await loadImage(mainImage.src, 'hero-main');
    tajImage.src = await loadImage(tajImage.src, 'taj-mahal');
    keralaImage.src = await loadImage(keralaImage.src, 'kerala-backwaters');
}

// Update destinations data with reliable images
const destinations = [
    {
        image: 'ram mandir.JPG',
        name: 'Ram Mandir',
        location: 'Ayodhya, Uttar Pradesh',
        rating: '4.9',
        duration: '1-2 days',
        description: 'The magnificent Ram Mandir, a symbol of faith and architectural grandeur.',
        badge: 'New'
    },
    {
        image: 'Varanasi ghats.JPG',
        name: 'Varanasi Ghats',
        location: 'Varanasi, Uttar Pradesh',
        rating: '4.8',
        duration: '2-3 days',
        description: 'Ancient spiritual capital with mesmerizing Ganga aarti ceremonies.',
        badge: 'Spiritual'
    },
    {
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        rating: '4.9',
        duration: '2-3 days',
        description: 'Symbol of eternal love, this marble wonder is a UNESCO World Heritage site.',
        badge: 'Most Popular'
    },
    {
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2',
        name: 'Kerala Backwaters',
        location: 'Alleppey, Kerala',
        rating: '4.8',
        duration: '3-4 days',
        description: 'Serene waterways, houseboats, and lush greenery in God's own country.',
        badge: 'Top Rated'
    },
    {
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
        name: 'City Palace',
        location: 'Jaipur, Rajasthan',
        rating: '4.8',
        duration: '4-5 days',
        description: 'Pink City's royal heritage with stunning architecture and culture.',
        badge: 'Heritage'
    },
    {
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
        name: 'Goa Beaches',
        location: 'North Goa',
        rating: '4.6',
        duration: '5-7 days',
        description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage.',
        badge: 'Beach Life'
    },
    {
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
        name: 'Ladakh',
        location: 'Leh, Ladakh',
        rating: '4.9',
        duration: '6-8 days',
        description: 'Breathtaking mountain landscapes, Buddhist monasteries, and adventure sports.',
        badge: 'Adventure'
    },
    {
        image: 'https://images.unsplash.com/photo-1580181167702-c5a7c2dd1c7f',
        name: 'Mysore Palace',
        location: 'Mysore, Karnataka',
        rating: '4.7',
        duration: '2-3 days',
        description: 'Magnificent royal palace with stunning architecture and rich history.',
        badge: 'Royal'
    },
    {
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
        name: 'Rann of Kutch',
        location: 'Gujarat',
        rating: '4.8',
        duration: '3-4 days',
        description: 'Vast white salt desert offering stunning sunset views and cultural experiences.',
        badge: 'Unique'
    },
    {
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66',
        name: 'Hampi Ruins',
        location: 'Karnataka',
        rating: '4.7',
        duration: '2-3 days',
        description: 'Ancient ruins and boulder-strewn landscape of the Vijayanagara Empire.',
        badge: 'Historical'
    },
    {
        image: 'https://images.unsplash.com/photo-1626714175561-f2c0dca12516',
        name: 'Valley of Flowers',
        location: 'Uttarakhand',
        rating: '4.8',
        duration: '4-5 days',
        description: 'Stunning alpine valley famous for its meadows of endemic flowers.',
        badge: 'Nature'
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization');
    
    // Initialize destination slider first
    try {
        console.log('Initializing destination slider...');
        initializeDestinationSlider();
        console.log('Destination slider initialized successfully');
    } catch (error) {
        console.error('Error initializing destination slider:', error);
    }
    
    // Then initialize other components
    initializeImages();
    setupScrollingTiles();
    
    // Initialize animations
    initializeAnimations();
});

// Initialize animations
function initializeAnimations() {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// Initialize destination slider
function initializeDestinationSlider() {
    console.log('Initializing destination slider...');
    const sliderWrapper = document.querySelector('.destination-slider-wrapper');
    const prevButton = document.querySelector('.slider-btn.prev');
    const nextButton = document.querySelector('.slider-btn.next');

    if (!sliderWrapper || !prevButton || !nextButton) return;

    // Calculate scroll amount (card width + gap)
    const cardWidth = 280; // Width of the card
    const cardGap = 24;  // Gap between cards (1.5rem = 24px)
    const scrollAmount = cardWidth + cardGap;

    // Scroll functions
    const scrollPrev = () => {
        sliderWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    };

    const scrollNext = () => {
        sliderWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    // Update button states
    const updateButtonStates = () => {
        const { scrollLeft, scrollWidth, clientWidth } = sliderWrapper;
        
        // Disable prev button if at start
        prevButton.disabled = scrollLeft <= 0;
        
        // Disable next button if at end
        nextButton.disabled = scrollLeft >= scrollWidth - clientWidth - 10; // 10px buffer
    };

    // Add event listeners
    prevButton.addEventListener('click', scrollPrev);
    nextButton.addEventListener('click', scrollNext);
    sliderWrapper.addEventListener('scroll', updateButtonStates);

    // Initialize button states
    updateButtonStates();

    // Handle touch/drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    sliderWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderWrapper.style.cursor = 'grabbing';
        startX = e.pageX - sliderWrapper.offsetLeft;
        scrollLeft = sliderWrapper.scrollLeft;
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        sliderWrapper.style.cursor = 'grab';
    });

    sliderWrapper.addEventListener('mouseup', () => {
        isDown = false;
        sliderWrapper.style.cursor = 'grab';
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        sliderWrapper.scrollLeft = scrollLeft - walk;
    });

    console.log('Destination slider initialization complete');
}

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chat bot...');
    
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input');
    const sendMessage = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');
    const quickActions = document.querySelectorAll('.quick-action-btn');
    const langButtons = document.querySelectorAll('.lang-btn');

    if (!chatToggle || !chatWindow) {
        console.error('Chat elements not found!');
        return;
    }

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        console.log('Chat toggle clicked');
        chatWindow.classList.remove('hidden');
        chatInput.focus();
    });

    closeChat.addEventListener('click', () => {
        console.log('Close chat clicked');
        chatWindow.classList.add('hidden');
    });

    // Handle message sending
    function sendUserMessage(message) {
        console.log('Sending user message:', message);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate bot response
        setTimeout(() => {
            addBotMessage(getBotResponse(message));
        }, 1000);
    }

    // Add bot message with typing animation
    function addBotMessage(message) {
        console.log('Adding bot message:', message);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="typing-indicator">...</span>
            </div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate typing
        setTimeout(() => {
            messageDiv.querySelector('.message-content').innerHTML = message;
        }, 1500);
    }

    // Handle send button click
    sendMessage.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendUserMessage(message);
            chatInput.value = '';
        }
    });

    // Handle enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                sendUserMessage(message);
                chatInput.value = '';
            }
        }
    });

    // Handle quick action buttons
    quickActions.forEach(button => {
        button.addEventListener('click', () => {
            sendUserMessage(button.textContent);
        });
    });

    // Handle language selection
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would typically update the language
            addBotMessage('Language changed successfully!');
        });
    });

    // Get current time for message timestamps
    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Simple bot response logic
    function getBotResponse(message) {
        const responses = {
            'Budget Planning': 'I can help you plan your budget! Would you like to set a daily spending limit or get recommendations based on your destination?',
            'Local Insights': 'I can provide you with local tips, best restaurants, and cultural experiences. What specific information are you looking for?',
            'Hidden Gems': 'I know some amazing off-the-beaten-path locations! Would you like recommendations for your current destination?',
            'AR Tours': 'I can guide you through virtual tours of popular attractions. Which destination would you like to explore?',
            'Compare Bookings': 'I can help you find the best deals across multiple platforms. What type of booking are you looking for?'
        };

        // Check for keywords in the message
        for (const [key, response] of Object.entries(responses)) {
            if (message.toLowerCase().includes(key.toLowerCase())) {
                return response;
            }
        }

        // Default response
        return "I'm here to help! You can ask me about budget planning, local insights, hidden gems, AR tours, or booking comparisons.";
    }

    console.log('Chat bot initialization complete');
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    }

    lastScroll = currentScroll;
});

// Scrolling Tiles Setup
const destinationTiles = [
    {
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
        title: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh'
    },
    {
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2',
        title: 'Kerala Backwaters',
        location: 'Alleppey, Kerala'
    },
    {
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc',
        title: 'Varanasi Ghats',
        location: 'Varanasi, UP'
    },
    {
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
        title: 'City Palace',
        location: 'Jaipur, Rajasthan'
    },
    {
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
        title: 'Ladakh',
        location: 'Leh, Ladakh'
    },
    {
        image: 'https://images.unsplash.com/photo-1580181167702-c5a7c2dd1c7f',
        title: 'Mysore Palace',
        location: 'Mysore, Karnataka'
    },
    {
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
        title: 'Rann of Kutch',
        location: 'Gujarat'
    },
    {
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66',
        title: 'Hampi Ruins',
        location: 'Karnataka'
    }
];

function createTile(destination) {
    return `
        <div class="destination-tile">
            <img src="${destination.image}" alt="${destination.title}" class="tile-image" loading="lazy">
            <div class="tile-content">
                <h3 class="tile-title">${destination.title}</h3>
                <p class="tile-location">${destination.location}</p>
            </div>
        </div>
    `;
}

function setupScrollingTiles() {
    const rightTrack = document.querySelector('.scrolling-tiles.right .tile-track');
    
    // Create initial tiles
    const tiles = destinationTiles.map(createTile).join('');
    
    // Duplicate tiles for seamless scrolling
    rightTrack.innerHTML = tiles + tiles;
    
    // Pause animation on hover
    rightTrack.addEventListener('mouseenter', () => {
        rightTrack.style.animationPlayState = 'paused';
    });
    
    rightTrack.addEventListener('mouseleave', () => {
        rightTrack.style.animationPlayState = 'running';
    });

    // Add click event to tiles
    rightTrack.querySelectorAll('.destination-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const title = tile.querySelector('.tile-title').textContent;
            // Smooth scroll to discover section
            const discoverSection = document.querySelector('#discover');
            if (discoverSection) {
                discoverSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Add keyframe animation to CSS
const style = document.createElement('style');
style.textContent = `
@keyframes scrollDown {
    0% {
        transform: translateY(-50%);
    }
    100% {
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);

// Destination Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.destination-slider-wrapper');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const cardWidth = 350; // Width of each card plus gap
    const scrollAmount = cardWidth * 2; // Scroll two cards at a time

    if (prevBtn && nextBtn && slider) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Touch scroll handling
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
}); 
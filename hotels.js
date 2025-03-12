document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const hotelsGrid = document.getElementById('hotels-grid');
    const destinationTitle = document.getElementById('destination-title');
    const destinationDescription = document.getElementById('destination-description');
    const searchInput = document.getElementById('destination-search');
    const budgetSelect = document.getElementById('budget-range');
    const searchBtn = document.querySelector('.search-btn');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    // Get destination from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const destinationParam = urlParams.get('destination');

    if (destinationParam) {
        searchInput.value = destinationParam;
        loadDestinationData(destinationParam);
    }

    // Search button click handler
    searchBtn.addEventListener('click', () => {
        const destination = searchInput.value;
        if (destination) {
            loadDestinationData(destination);
            // Update URL without reloading
            const newUrl = `${window.location.pathname}?destination=${encodeURIComponent(destination)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
    });

    // Slider navigation
    prevBtn.addEventListener('click', () => {
        hotelsGrid.scrollBy({
            left: -420,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        hotelsGrid.scrollBy({
            left: 420,
            behavior: 'smooth'
        });
    });

    // Update button states on scroll
    hotelsGrid.addEventListener('scroll', updateButtonStates);

    function updateButtonStates() {
        const { scrollLeft, scrollWidth, clientWidth } = hotelsGrid;
        
        prevBtn.disabled = scrollLeft <= 0;
        nextBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 10;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    function loadDestinationData(destinationName) {
        const destination = window.hotelUtils.getDestinationData(destinationName);
        
        if (!destination) {
            destinationTitle.textContent = 'Destination not found';
            destinationDescription.textContent = 'Please try another destination';
            hotelsGrid.innerHTML = '';
            return;
        }

        destinationTitle.textContent = destination.name;
        destinationDescription.textContent = destination.description;

        const budgetRange = budgetSelect.value;
        const filteredHotels = window.hotelUtils.filterHotelsByBudget(destination.hotels, budgetRange);
        
        renderHotels(filteredHotels);
        updateButtonStates();
    }

    function renderHotels(hotels) {
        hotelsGrid.innerHTML = hotels.map(hotel => `
            <div class="hotel-card">
                <img src="${hotel.image || 'placeholder.jpg'}" alt="${hotel.name}" class="hotel-image">
                <div class="hotel-content">
                    <div class="hotel-header">
                        <h3 class="hotel-name">${hotel.name}</h3>
                        <div class="hotel-rating">
                            <span>★</span>
                            <span>${hotel.rating}</span>
                        </div>
                    </div>
                    
                    <div class="price-comparison">
                        ${Object.entries(hotel.price).map(([platform, price]) => `
                            <div class="platform-price">
                                <span class="platform-name">${platform}</span>
                                <span class="price-amount">₹${price}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="hotel-footer">
                        <span class="availability ${hotel.availability.toLowerCase()}">${hotel.availability}</span>
                        <a href="${hotel.booking_link}" class="book-now" target="_blank">Book Now</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Handle budget filter changes
    budgetSelect.addEventListener('change', () => {
        if (searchInput.value) {
            loadDestinationData(searchInput.value);
        }
    });

    // Initialize button states
    updateButtonStates();
}); 
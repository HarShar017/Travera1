// Mock data for destinations and hotels
const destinationsData = {
    "destinations": [
        {
            "name": "Ram Mandir, Ayodhya",
            "location": "Ayodhya, Uttar Pradesh, India",
            "description": "A sacred Hindu temple dedicated to Lord Ram, attracting pilgrims and tourists from across the world.",
            "image": "https://images.unsplash.com/photo-1704435338374-3ebf6a1d2674",
            "hotels": [
                {
                    "name": "Ayodhya Palace",
                    "price": { "MakeMyTrip": 2500, "Booking.com": 2700, "Expedia": 2600 },
                    "rating": 4.5,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                },
                {
                    "name": "Ram Heritage",
                    "price": { "MakeMyTrip": 3200, "Booking.com": 3500, "Expedia": 3400 },
                    "rating": 4.0,
                    "availability": "Limited",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd"
                },
                {
                    "name": "Sarayu Riverside Resort",
                    "price": { "MakeMyTrip": 4200, "Booking.com": 4500, "Expedia": 4300 },
                    "rating": 4.7,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                }
            ]
        },
        {
            "name": "Taj Mahal, Agra",
            "location": "Agra, Uttar Pradesh, India",
            "description": "One of the Seven Wonders of the World, the Taj Mahal is a symbol of love and Mughal architecture.",
            "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523",
            "hotels": [
                {
                    "name": "Mughal Palace",
                    "price": { "MakeMyTrip": 4000, "Booking.com": 4200, "Expedia": 4100 },
                    "rating": 5.0,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                },
                {
                    "name": "Royal Taj Inn",
                    "price": { "MakeMyTrip": 2500, "Booking.com": 2700, "Expedia": 2600 },
                    "rating": 4.5,
                    "availability": "Limited",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
                },
                {
                    "name": "Taj View Grand",
                    "price": { "MakeMyTrip": 5500, "Booking.com": 5800, "Expedia": 5600 },
                    "rating": 4.8,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                }
            ]
        },
        {
            "name": "Manali",
            "location": "Himachal Pradesh, India",
            "description": "A popular hill station known for its scenic beauty, adventure sports, and snow-covered mountains.",
            "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
            "hotels": [
                {
                    "name": "Snow Retreat",
                    "price": { "MakeMyTrip": 3500, "Booking.com": 3700, "Expedia": 3600 },
                    "rating": 4.5,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1601918774946-25832a4be0d6"
                },
                {
                    "name": "Mountain View",
                    "price": { "MakeMyTrip": 2800, "Booking.com": 3000, "Expedia": 2900 },
                    "rating": 4.2,
                    "availability": "Limited",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1506059612708-99d6c258160e"
                },
                {
                    "name": "Alpine Lodge & Spa",
                    "price": { "MakeMyTrip": 6000, "Booking.com": 6300, "Expedia": 6100 },
                    "rating": 4.9,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811"
                }
            ]
        },
        {
            "name": "Varanasi Ghats",
            "location": "Varanasi, Uttar Pradesh, India",
            "description": "Ancient riverfront steps along the Ganges, known for spiritual rituals and scenic views.",
            "image": "https://images.unsplash.com/photo-1561359313-0639aad49ca6",
            "hotels": [
                {
                    "name": "Ganga View Inn",
                    "price": { "MakeMyTrip": 3000, "Booking.com": 3200, "Expedia": 3100 },
                    "rating": 4.5,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd"
                },
                {
                    "name": "Holy Ghat Stay",
                    "price": { "MakeMyTrip": 2700, "Booking.com": 2900, "Expedia": 2800 },
                    "rating": 4.2,
                    "availability": "Limited",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                },
                {
                    "name": "Riverside Heritage Hotel",
                    "price": { "MakeMyTrip": 4500, "Booking.com": 4800, "Expedia": 4600 },
                    "rating": 4.7,
                    "availability": "Available",
                    "booking_link": "#",
                    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
                }
            ]
        }
    ]
};

// Function to get destination data
function getDestinationData(destinationName) {
    return destinationsData.destinations.find(
        dest => dest.name.toLowerCase().includes(destinationName.toLowerCase())
    );
}

// Function to filter hotels by budget range
function filterHotelsByBudget(hotels, budgetRange) {
    if (!budgetRange) return hotels;
    
    const [min, max] = budgetRange.split('-').map(Number);
    return hotels.filter(hotel => {
        const avgPrice = Object.values(hotel.price).reduce((a, b) => a + b) / 3;
        if (max) {
            return avgPrice >= min && avgPrice <= max;
        }
        return avgPrice >= min;
    });
}

// Export the functions and data
window.hotelUtils = {
    getDestinationData,
    filterHotelsByBudget,
    destinationsData
}; 
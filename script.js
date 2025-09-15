const sensorCards = document.getElementById('sensor-cards');

// A simplified, consistent function to create all sensor cards
const createCard = (name, value, unit = '') => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h2');
    title.textContent = name;
    card.appendChild(title);

    const valueEl = document.createElement('p');
    valueEl.className = 'value';

    // Special text for PIR and IR sensors
    if (name === 'PIR') {
        valueEl.textContent = value ? 'Motion Detected' : 'No Motion';
    } else if (name === 'IR') {
        valueEl.textContent = value ? 'Object Detected' : 'No Object';
    } else {
        valueEl.textContent = `${value} ${unit}`;
    }
    card.appendChild(valueEl);

    return card;
};

const updateDashboard = (data) => {
    if (!data) return; // Don't update if there's no data
    sensorCards.innerHTML = ''; // Clear existing cards
    sensorCards.appendChild(createCard('MQ2', data.mq2, 'ppm'));
    sensorCards.appendChild(createCard('Temperature', data.temperature, '°C'));
    sensorCards.appendChild(createCard('Humidity', data.humidity, '%'));
    sensorCards.appendChild(createCard('PIR', data.pir));
    sensorCards.appendChild(createCard('IR', data.ir));
};

// Initial data load when the page opens
fetch('https://wsnbackend.onrender.com/api/sensors')
    .then(response => response.json())
    .then(data => updateDashboard(data))
    .catch(err => console.error('Initial fetch error:', err));

// WebSocket connection for real-time updates from the server
const ws = new WebSocket('wss://wsnbackend.onrender.com');

ws.onopen = () => {
    console.log('WebSocket connection established');
};

ws.onmessage = (event) => {
    console.log('Received data from WebSocket:', event.data);
    const data = JSON.parse(event.data);
    updateDashboard(data);
};

ws.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

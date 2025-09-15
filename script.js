const sensorCards = document.getElementById('sensor-cards');

const createCard = (name, value, unit, status) => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h2');
    title.textContent = name;
    card.appendChild(title);

    const valueEl = document.createElement('p');
    valueEl.className = 'value';
    valueEl.textContent = `${value} ${unit}`;
    card.appendChild(valueEl);

    if (status !== undefined) {
        const statusEl = document.createElement('p');
        statusEl.className = `status ${status ? 'on' : 'off'}`;
        statusEl.textContent = status ? 'ON' : 'OFF';
        card.appendChild(statusEl);
    }

    return card;
};

const updateDashboard = (data) => {
    sensorCards.innerHTML = '';
    sensorCards.appendChild(createCard('MQ2', data.mq2, 'ppm'));
    sensorCards.appendChild(createCard('Temperature', data.temperature, '°C'));
    sensorCards.appendChild(createCard('Humidity', data.humidity, '%'));
    sensorCards.appendChild(createCard('PIR', data.pir ? 'Motion' : 'No Motion', '', data.pir));
    sensorCards.appendChild(createCard('IR', data.ir ? 'Object' : 'No Object', '', data.ir));
};

// Initial data load
fetch('/api/sensors')
    .then(response => response.json())
    .then(data => updateDashboard(data))
    .catch(err => console.error(err));

// WebSocket connection
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updateDashboard(data);
};
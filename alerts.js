const alertsList = document.getElementById('alerts-list');

const createAlertItem = (alert) => {
    const item = document.createElement('div');
    item.className = 'alert-item';

    let message = '';
    if (alert.mq2 > 500) message += `High Gas Level: ${alert.mq2} ppm. `;
    if (alert.temperature > 35) message += `High Temperature: ${alert.temperature}°C. `;
    if (alert.pir) message += `Motion Detected. `;
    if (alert.ir) message += `Object Detected. `;

    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    item.appendChild(messageEl);

    const timestampEl = document.createElement('p');
    timestampEl.className = 'timestamp';
    timestampEl.textContent = new Date(alert.timestamp).toLocaleString();
    item.appendChild(timestampEl);

    return item;
};

fetch('/api/sensors/alerts')
    .then(response => response.json())
    .then(alerts => {
        alerts.forEach(alert => {
            alertsList.appendChild(createAlertItem(alert));
        });
    })
    .catch(err => console.error(err));
const createChart = (ctx, label, data, color) => {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
            datasets: [{
                label: label,
                data: data.map(d => d.value),
                borderColor: color,
                tension: 0.1
            }]
        }
    });
};

fetch('https://wsnbackend.onrender.com/api/sensors/history')
    .then(response => response.json())
    .then(data => {
        const mq2Data = data.map(d => ({ timestamp: d.timestamp, value: d.mq2 }));
        const tempData = data.map(d => ({ timestamp: d.timestamp, value: d.temperature }));
        const humidityData = data.map(d => ({ timestamp: d.timestamp, value: d.humidity }));

        createChart(document.getElementById('mq2Chart'), 'MQ2', mq2Data, 'red');
        createChart(document.getElementById('tempChart'), 'Temperature', tempData, 'blue');
        createChart(document.getElementById('humidityChart'), 'Humidity', humidityData, 'green');
    })
    .catch(err => console.error(err));

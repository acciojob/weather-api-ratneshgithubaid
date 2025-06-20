//your JS code here. If required.
document.getElementById('getWeather').addEventListener('click', function() {
    // Replace with your actual API key from OpenWeatherMap
    const apiKey = '09e72cf0b4d631ab14e95688bab47448';
    const city = 'London';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const weatherDescription = data.weather[0].main;
        const temperature = data.main.temp;
        document.getElementById('weatherData').innerHTML = `
            Current weather in ${city}: ${weatherDescription}<br>
            Temperature: ${temperature}°C
        `;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherData').textContent = 'Failed to fetch weather data. Please try again.';
    });
});
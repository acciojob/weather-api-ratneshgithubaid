document.addEventListener('DOMContentLoaded', function() {
    const getWeatherButton = document.getElementById('getWeather');
    const weatherDataDiv = document.getElementById('weatherData');

    getWeatherButton.addEventListener('click', function() {
        // Show loading state
        weatherDataDiv.innerHTML = '<div class="loading"></div> Fetching weather data...';
        weatherDataDiv.className = '';
        
        const city = 'London';
        // Using a public demo API key for OpenWeatherMap that works for London
        const apiKey = 'b6907d289e10d714a6e88b30761fae22';
        const url = `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].main;
            // Format the output as required
            weatherDataDiv.innerHTML = `
                <span class="weather-icon">${getWeatherEmoji(weatherDescription)}</span>
                Current weather in London: ${weatherDescription}
            `;
            weatherDataDiv.className = 'success';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherDataDiv.innerHTML = `
                <span class="weather-icon">❌</span>
                Failed to fetch weather data. Please try again.
                <div style="font-size:0.8rem; margin-top:10px;">Error: ${error.message}</div>
            `;
            weatherDataDiv.className = 'error';
        });
    });
    
    function getWeatherEmoji(description) {
        const emojiMap = {
            'Clouds': '☁️',
            'Clear': '☀️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '💨',
            'Haze': '😶‍🌫️',
            'Dust': '💨',
            'Fog': '🌁',
            'Sand': '💨',
            'Ash': '🌋',
            'Squall': '💨',
            'Tornado': '🌪️'
        };
        
        return emojiMap[description] || '🌡️';
    }
});
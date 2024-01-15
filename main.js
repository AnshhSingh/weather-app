const apiKey = '0cc1ce77a7fa887558dc6076b899e31a';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('search-input').value;
    getWeatherData(city);
});

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            getForecast(city);
            // updateBackground(data.weather[0].icon);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError('City not found. Please try again.');
        });
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayWeather(data) {
    document.getElementById('city').textContent = data.name;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent =  data.weather[0].description; 
    document.getElementById('icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function displayForecast(forecastList) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const forecastDay = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const forecastTemp = `${forecast.main.temp.toFixed(1)}°C`;
        const forecastIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-day');
        forecastDiv.innerHTML = `
            <div>${forecastDay}</div>
            <img class="forecast-icon" src="${forecastIcon}" alt="Forecast Icon">
            <div class="forecast-temp">${forecastTemp}</div>
        `;

        forecastContainer.appendChild(forecastDiv);
    }
}

// function updateBackground(weatherIcon) {
//     const body = document.body;
//     let backgroundImage;

//     switch (weatherIcon) {
//         case '01d':
//         case '02d':
//             backgroundImage = 'url("day.jpg")';
//             break;
//         case '01n':
//         case '02n':
//             backgroundImage = 'url("night.jpg")';
//             break;
//         case '03d':
//         case '04d':
//         case '03n':
//         case '04n':
//             backgroundImage = 'url("cloudy.jpg")';
//             break;
//         case '09d':
//         case '10d':
//         case '09n':
//         case '10n':
//             backgroundImage = 'url("rainy.jpg")';
//             break;
//         case '11d':
//         case '11n':
//             backgroundImage = 'url("stormy.jpg")';
//             break;
//         case '13d':
//         case '13n':
//             backgroundImage = 'url("snowy.jpg")';
//             break;
//         default:
//             backgroundImage = 'url("default.jpg")';
//     }

//     body.style.backgroundImage = backgroundImage;
// }


function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;

    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

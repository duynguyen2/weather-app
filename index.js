import { APIKey as _APIKey } from './config';

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {


    const APIKey = _APIKey;
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
    .then(reponse => response.json()).then(
        json => {
            if(json.cod === '404') {
                container.computedStyleMap.height = '400px';
                weatherBox.computedStyleMap.display = 'none';
                weatherDetails.computedStyleMap.display = 'none';
                error404.computedStyleMap.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.computedStyleMap.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main) {
                case 'Clear':
                        //image.src = 'images/clear.png';
                        break;
                case 'Clouds':
                        //image.src = 'images/clouds.png';
                        break;
                case 'Haze':
                        //image.src = 'images/haze.png';
                        break;
                case 'Rain':
                        //image.src = 'images/rain.png';
                        break;
                case 'Snow':
                        //image.src = 'images/snow.png';
                        break;
                default:
                        //image.src = 'images/error404.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${paarseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('faadeIn');
            container.style.height = '590px';
        });
});
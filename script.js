const apiKey = '522985f548363b557d3ac405f9286a40';

    async function getWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          console.log('Weather Data:', data);

          // Update HTML elements with weather information
          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273) + "°C";
          document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

          // Update weather icon based on weather conditions
          const weatherIcon = document.getElementById("weatherIcon");
          const weatherMain = data.weather[0].main.toLowerCase();
          weatherIcon.src = getWeatherIconUrl(weatherMain);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    function updateWeather() {
      const cityInput = document.getElementById("cityInput").value;
      getWeather(cityInput);
    }

    function getWeatherIconUrl(weatherMain) {
      // Map weather conditions to respective icon URLs
      const iconMappings = {
        "clear": "./images/clear.png",
        "clouds": "./images/clouds.png",
        "rain": "./images/rain.png",
        "drizzle": "./images/drizzle.png",
        "mist": "./images/mist.png",
        "snow": "./images/snow.png",
        // Add more mappings as needed
      };

      // Default to a generic icon if no match is found
      return iconMappings[weatherMain] || "./images/clouds.png";
    }

    // Attach event listener to the search button
    document.getElementById("searchButton").addEventListener("click", updateWeather);

    // Initial call to fetch weather data for the default city
    getWeather("Jamshedpur");
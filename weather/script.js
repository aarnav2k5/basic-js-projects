document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("locationInput");
  const search = document.getElementById("searchButton");
  const showInfo = document.getElementById("weather-info");
  const locationInfo = document.getElementById("location");
  const tempInfo = document.getElementById("temperature");
  const descInfo = document.getElementById("description");
  const error = document.getElementById("error");
  const loader = document.getElementById("loader");

  const API_KEY = "1ec8cb03d8d19a7020bcc02d1e40cd1e";

  search.addEventListener("click", async () => {
    const cityName = cityInput.value.trim();
    if (!cityName) {
      showError("Please enter a city name.");
      return;
    }

    showLoader();
    error.textContent = "";
    showInfo.classList.add("hidden");

    try {
      const weatherData = await fetchWeatherData(cityName);
      hideLoader();
      displayWeatherData(weatherData);
    } catch (error) {
      hideLoader();
      showError("City not found or unable to fetch data.");
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;

    // Convert temperature from Kelvin to Celsius
    const celsius = main.temp - 273.15;

    // Update UI with weather details
    locationInfo.textContent = name;
    tempInfo.textContent = `Temperature: ${celsius.toFixed(2)} °C`;
    descInfo.textContent = `Description: ${weather[0].description}`;

    showInfo.classList.remove("hidden");
  }

  function showError(message = "An error occurred. Please try again.") {
    error.textContent = message;
    error.classList.remove("hidden");
    showInfo.classList.add("hidden");
  }

  function showLoader() {
    loader.classList.remove("hidden");
  }

  function hideLoader() {
    loader.classList.add("hidden");
  }
});

// Chave de autenticação e URL base da API OpenWeatherMap - LINK: https://openweathermap.org
const apiKey = "7321ef9e596292440d47ee9cbc354ec4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Seleciona os elementos do DOM
const searchBox = document.querySelector(".weather-search input");
const searchBtn = document.querySelector(".weather-search button");
const weatherIcon = document.querySelector(".weather-icon");

// Função para buscar o clima de uma cidade
async function checkWeather(city) {
	try {
		const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
		if (response.status === 404) {
			displayError(true);
			return;
		}
		const data = await response.json();
		updateWeatherInfo(data);
		displayError(false);
	} catch (error) {
		console.error("Erro ao buscar dados do clima:", error);
		displayError(true);
	}
}

// Atualiza as informações do clima na página
function updateWeatherInfo(data) {
	document.querySelector(".weather-city").textContent = data.name;
	document.querySelector(".weather-temp").textContent = `${Math.round(data.main.temp)}°C`;
	document.querySelector(".weather-humidity").textContent = `${data.main.humidity}%`;
	document.querySelector(".weather-wind").textContent = `${data.wind.speed} km/h`;

	// Mapeia a condição do tempo para o ícone correspondente
	const iconMapping = {
		Clouds: "clouds.png",
		Clear: "clear.png",
		Rain: "rain.png",
		Drizzle: "drizzle.png",
		Mist: "mist.png"
	};
	weatherIcon.src = `img/${iconMapping[data.weather[0].main] || "default.png"}`;
	document.querySelector(".weather-info").style.display = "block";
}

// Exibe ou oculta a mensagem de erro
function displayError(show) {
	document.querySelector(".weather-info").style.display = show ? "none" : "block";
	document.querySelector(".weather-error").style.display = show ? "block" : "none";
}

// Lida com a busca do clima
function handleSearch() {
	const city = searchBox.value.trim();
	if (city) {
		checkWeather(city);
	}
}

// Adiciona eventos de clique e tecla Enter
searchBtn.addEventListener("click", handleSearch);
searchBox.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleSearch();
	}
});
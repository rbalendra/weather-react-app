const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchAPI = async (query) => {
	try {
		const url = `${BASE_URL}?q=${query}&units=metric&appid=${API_KEY}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		return data || [];
	} catch (error) {
		console.log('Error fetching data', error);
		return [];
	}
};
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

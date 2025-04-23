import './MajorCities.css';

const MajorCities = ({ cities, onCitySelect }) => {
	if (!cities || cities.length === 0) {
		return null;
	}

	return (
		<div className='major-cities-container'>
			<h2>Weather of your Major Cities</h2>
			<div className='city-cards'>
				{cities.map((city, index) => {
					// Get the icon code for each individual city
					const iconCode = city.weather[0].icon;
					const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

					return (
						<div
							key={index}
							className='city-card'
							onClick={() => onCitySelect(city.name)}>
							<p className='city-name'>{city.name}</p>
							<img
								src={iconUrl}
								alt={city.weather[0].description}
								className='city-icon'
							/>
							<p className='weather-description'>
								{city.weather[0].description}
							</p>

							<p className='city-temp'>{Math.round(city.main.temp)}°C</p>
							<p>Feels like: {Math.round(city.main.feels_like)}°C</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MajorCities;

import React from 'react';
import './Layout.css';
import { PacmanLoader } from 'react-spinners';

const Layout = ({ weather }) => {
	if (!weather || !weather.main) {
		return (
			<div className='weather-container'>
				<PacmanLoader color='#5da9e9' />
				<p>Loading weather information...</p>
			</div>
		);
	}
	const iconCode = weather.weather[0].icon;
	const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

	return (
		<div className='weather-container'>
			<h1 className='weather-header'>
				Bringing the latest weather to the city of your choice...
			</h1>
			<div className='weather-card'>
				<p className='location-info'>{weather.name}</p>
				<img
					src={iconUrl}
					alt={weather.weather[0].description}
					className='weather-icon'
				/>
				<p className='weather-description'>{weather.weather[0].description}</p>
				<p className='feels-like'>
					Feels like: {Math.round(weather.main.feels_like)}°C
				</p>
				<h3>
					<span className='temperature'>{Math.round(weather.main.temp)}°C</span>
				</h3>
			</div>
		</div>
	);
};

export default Layout;

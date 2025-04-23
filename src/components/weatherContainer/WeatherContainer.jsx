import React, { useState, useEffect } from 'react';
import { fetchAPI } from '../../util/fetchAPI.js';
import SearchBar from '../searchbar/SearchBar.jsx';
import Layout from '../layout/Layout.jsx';
import MajorCities from '../majorCities/MajorCities.jsx';
import { PacmanLoader } from 'react-spinners';
import './WeatherContainer.css'; // Import CSS for styling

const WeatherContainer = () => {
	const [loading, setLoading] = useState(true); // Initialize loading state to true
	const [weather, setWeather] = useState(null); // Initialize weather state to null
	const [majorCities, setMajorCities] = useState([]); // Initialize majorCities state to an empty array

	const majorCityList = [
		// List of major cities to fetch weather data for
		'Melbourne',
		'Sydney',
		'Brisbane',
		'Perth',
		'Adelaide',
		'Hobart',
		'Darwin',
		'Canberra',
	];

	const handleSearch = async (query) => {
		// Function to handle search queries
		try {
			setLoading(true);
			const results = await fetchAPI(query);
			setWeather(results);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching', error);
			setLoading(false);
		}
	};

	const fetchMajorCities = async () => {
		try {
			setLoading(true);
			const citiesData = await Promise.all(
				// Fetch weather data for all major cities in parallel because promise.all will wait for all promises to resolve before proceeding
				// and return an array of results
				majorCityList.map((city) => fetchAPI(city))
			);
			setMajorCities(citiesData.filter((data) => data && data.main)); //validate the data before setting it to state
			// Filter out any invalid data (e.g., if the API returns an error for a city)
			setLoading(false);
		} catch (error) {
			console.error('Error fetching major cities', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMajorCities();
		handleSearch('Melbourne');
	}, []); // Fetch major cities weather data and default to Melbourne on component mount

	return (
		<>
			<SearchBar onSearch={handleSearch} />
			{loading ? (
				<div className='loader-container'>
					<PacmanLoader color='#5da9e9' />
					<p>loading weather data....</p>
				</div>
			) : (
				<>
					<Layout weather={weather} />
					<MajorCities cities={majorCities} onCitySelect={handleSearch} />
				</>
			)}
		</>
	);
};

export default WeatherContainer;

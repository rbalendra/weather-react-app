import React from 'react';
import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(query);

		return;
	};

	return (
		<div className='search-container'>
			<form className='search-form' onSubmit={handleSubmit}>
				<input
					type='text'
					className='search-input'
					placeholder='Search for a city...'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className='search-button' type='submit'>
					Search City
				</button>
			</form>
		</div>
	);
};

export default SearchBar;

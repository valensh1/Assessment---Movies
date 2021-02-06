import React, { useState, useEffect } from 'react';
import MovieInfo from './MovieInfo';

export default function App(props) {
	const [query, updateQuery] = useState({
		baseURL: 'http://www.omdbapi.com/?',
		apiKey: 'apikey=' + 'b639f789', //http://www.omdbapi.com/?i=tt3896198&apikey=b639f789    arthur's API key =8d432cb5
		option: '&s=',
		title: '',
		searchURL: '' //purpose of submitting form is to update this
	});

	const [movie, setMovie] = useState({});

	useEffect(() => {
		(async () => {
			if (query.searchURL) {
				try {
					const response = await fetch(query.searchURL);
					const data = await response.json();
					await setMovie(data);
					console.log(data);
				} catch (error) {
					console.error(error);
				} finally {
					updateQuery({
						baseURL: 'http://www.omdbapi.com/?',
						apiKey: 'apikey=' + 'b639f789', //http://www.omdbapi.com/?i=tt3896198&apikey=b639f789    arthur's API key =8d432cb5
						option: '&s=',
						title: '',
						searchURL: '' //purpose of submitting form is to update this
					});
				}
			}
		})();
	}, [query]);

	const handleChange = event => {
		updateQuery({ ...query, ...{ [event.target.id]: event.target.value } }); //the spread operator preserves the old values so we don't overwrite them because the updateQuery method will overwrite query with whatever we have inside updateQuery. event.target.id is possible because of the id being used below in the input field.
	};

	const handleSubmit = event => {
		event.preventDefault();
		updateQuery({
			...query,
			searchURL: query.baseURL + query.apiKey + query.option + query.title
		});
	};

	return (
		<div className="Page-wrapper">
			<h2>Ruth App</h2>
			<h2>{name}</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title"> Title</label>
				<input
					id="title" //this is the target and must be same as what is being used in handleChange event handler above and title must equal a key in object
					type="text"
					value={query.title}
					onChange={handleChange} // upon typing this will force title to change because it will fire off this function and update title
				/>
				<input type="submit" value="Find Movie Info" />
			</form>
			<div className={'Page'}></div>
			{Object.keys(movie).length ? <MovieInfo movie={movie} /> : ''}
		</div>
	);
}

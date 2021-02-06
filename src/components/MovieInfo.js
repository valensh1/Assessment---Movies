import React from 'react';

export default function MovieInfo(props) {
	console.log(props);
	let moviesToMap = props.movie.Search;
	//console.log(props.movie.Search);
	return (
		<ul>
			{moviesToMap.map(item => {
				return <li>{item.Title}</li>;
			})}
		</ul>
	);
}

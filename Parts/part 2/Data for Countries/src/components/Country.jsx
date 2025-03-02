export const CountryForList = ({countryName}) => {
	return (
		<p>{countryName}</p>
	)
}

export const CountryForSummary = ({countryInfo, showIfTrue}) => {
	if (showIfTrue) {
		console.log("summary:",countryInfo, countryInfo.languages)
		return (
			<div>
				<h2>{countryInfo.name.common}</h2>
				<p>Capital {countryInfo.capital}</p>
				<p>Area {countryInfo.area}</p>

				<h2>Languages</h2>
				<ul>
					{Object.values(countryInfo.languages).map((language, index) => <li key={index}>{language}</li>)}
				</ul>
				<img src={countryInfo.flags.png} style={{ border: "2px solid black", borderRadius: "5px" }} />
			</div>
		)		
	}
	return <div></div>
}

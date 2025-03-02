import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import ListCountries from './components/ListCountries'
import {CountryForSummary} from './components/Country'

import countryService from './services/countries'

const App = () => {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('')
	const [allCountries, setAllCountries] = useState([])
	const [countryInfo, setCountryInfo] = useState([])
	const [showCountryInfo, setShowCountryInfo] = useState(false)

	useEffect(() => {
		console.log('load initial state')
		countryService
		.getAll()
		.then(response => {
			console.log('promise fulfilled')
			const settinCountries = response.data.map(country => country.name.common)
			setAllCountries(settinCountries)
			setCountries(settinCountries)
		})
	}, [])

	useEffect(() => {
		if (countries.length == 1) {
			console.log(`useEffect[countries]:\nFilter has narrowed search to ${countries[0]}`)
			countryService
			.getOne(countries[0])
			.then(response => {
				console.log(`Promise fulfilled for ${countries[0]} info`)
				setCountryInfo(response.data)
				setShowCountryInfo(true)
			})
		} else {
			setShowCountryInfo(false)
		}
	}, [countries])

	const handleFilterChange = (event) => {
		//console.log(event.target)
		const filterValue = event.target.value.toLowerCase();
		setNewFilter(filterValue)
		const tempList = allCountries.filter(country => country.toLowerCase().includes(filterValue))
		setCountries(tempList)
	}

	return (
		<div>
		<h2>Country Info Viewer</h2>
			<Filter filter={newFilter} change={handleFilterChange}/>
			<ListCountries countryList={countries} removeEvent={null} showIfFalse={showCountryInfo}/>
			<p>Show Country info: {showCountryInfo.toString()}</p>
			<CountryForSummary countryInfo={countryInfo} showIfTrue={showCountryInfo}/>
		</div>
	)
}

export default App

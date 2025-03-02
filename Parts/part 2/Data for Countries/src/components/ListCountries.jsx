const ListCountries =({countryList, showIfFalse}) => {
    if (countryList.length < 1 || countryList == undefined) {
        return <div></div>
    }
    if (countryList.length > 10) {
        return <p>{countryList.length - 10} too many matches, specify another filter</p>
    }
    if (showIfFalse) {
        return <div></div>
    }
    return (
        <ul>
            {countryList.map((country, index) => (
                <li key={index}>{country}</li>
            ))}
        </ul>
    )
}

export default ListCountries

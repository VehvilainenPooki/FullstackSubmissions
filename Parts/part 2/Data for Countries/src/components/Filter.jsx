const Filter = ({filter, change}) => {
    return (
        <div>
          Find a country <input title='filter' id='0'
            value={filter}
            onChange={change}
          />
        </div>
    )
}

export default Filter

const Filter = ({filter, change}) => {
    return (
        <div>
          filter shown with<input title='filter' id='0'
            value={filter}
            onChange={change}
          />
        </div>
    )
}

export default Filter

const AddForm = ({submit, name, nameChange, number, numberChange}) => {
    return (
        <div>
          <form onSubmit={submit}>
            name: <input title='name' id='1'
              value={name}
              onChange={nameChange}
            />
            <br></br>
            number: <input title='number' id='2'
              value={number}
              onChange={numberChange}
            />
            <br></br>
            <button type="submit">add</button>
          </form>
        </div>
    )
}

export default AddForm

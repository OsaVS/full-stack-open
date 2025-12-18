const Filter = ({onChange, value}) => {
    return (
        <div>
            <input onChange={onChange} value={value}/>
        </div>
    )
}

export default Filter;
const PersonForm = ({
    onSubmit,
    handleNameChange,
    handleNumberChange,
    name,
    number,
}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input onChange={handleNameChange} value={name} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={number} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm;
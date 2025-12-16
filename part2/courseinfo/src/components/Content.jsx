const Part = ({name, exercises}) => {
    return(
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({parts}) => {
    return(
        <div>
            {parts.map(part =>
                <Part key={part.name} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
    
}

export default Content
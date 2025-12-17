import Content from './Content'
import Header from './Header'

const Course = ({course}) => {

    const total = course.parts.reduce(
        (sum, part) => sum + part.exercises, 0
    )

    return(
        <div>
            <Header name={course.name} />

            <Content parts={course.parts} />

            <p><b>total of {total} exercises</b></p>
        </div>
    )
    
    
}

export default Course
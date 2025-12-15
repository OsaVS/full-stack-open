import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {props.good} <br/>
        neutral {props.neutral} <br />
        bad {props.bad} <br />
        all {props.all} <br />
        average {props.average} <br />
        positive {props.positive} %
      </p>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good + 1 - bad) / (all + 1))
    setPositive(((good + 1) / (all + 1)) * 100)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / (all + 1))
    setPositive((good / (all + 1)) * 100)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - (bad + 1)) / (all + 1))
    setPositive((good / (all + 1)) * 100)
  }

  return (
    <div >
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>

      <h1>statistics</h1>
      <div>
        <Statistics 
          good={good} 
          neutral={neutral} 
          bad={bad} 
          all={all} 
          average={average} 
          positive={positive} 
        />
      </div>
    </div>
  )

}



export default App

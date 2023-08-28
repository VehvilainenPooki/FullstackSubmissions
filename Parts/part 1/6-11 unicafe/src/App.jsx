import { useState } from 'react'

const Average = ({good, neutral, bad}) => {
  const average = (good-bad)/(good+neutral+bad)
  return (
    <div>
      average {average}
    </div>
  )
}

const Positive = ({good, neutral, bad}) => {
  const positive = (good)/(good+neutral+bad)
  return (
    <div>
      positive {positive*100} %
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div id="b">
      <h1>give feedback</h1>
      <p></p>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <p></p>
      <h1>statistics</h1>
      
      good {good}
      <br></br>
      neutral {neutral}
      <br></br>
      bad {bad}
      <Average good={good} neutral={neutral} bad={bad}/>
      <Positive good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
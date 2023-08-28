import { useState } from 'react'



const Statistics = ({good, neutral, bad}) => {
  if ((good+neutral+bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      good {good}
      <br></br>
      neutral {neutral}
      <br></br>
      bad {bad}
      <StatisticLine text={"average"} value={<Average good={good} neutral={neutral} bad={bad}/>}/>
      <StatisticLine text={"positive"} value={<Positive good={good} neutral={neutral} bad={bad}/>}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Average = ({good, neutral, bad}) => {
  const average = (good-bad)/(good+neutral+bad)
  return (average)
}

const Positive = ({good, neutral, bad}) => {
  const positive = (good)/(good+neutral+bad)
  return ((positive*100) + "%")
}


const Button = ({text, setValue, value}) => {
  return (
    <button onClick={() => setValue(value + 1)}>
      {text}
    </button>
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
      <Button text={"good"} setValue={setGood} value={good}/>
      <Button text={"neutral"} setValue={setNeutral} value={neutral}/>
      <Button text={"bad"} setValue={setBad} value={bad}/>
      <p></p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
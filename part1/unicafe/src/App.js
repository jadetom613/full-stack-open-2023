import { useState } from 'react'

const Button = (prop) => {
  return(
    <button onClick={prop.onClick}>
      {prop.text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0){
    return(
      <p>No Feedback Given</p>
    )
  }else{
    return(
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={good+neutral+bad}/>
            <StatisticLine text='average' value={(good-bad)/(good+neutral+bad)}/>
            <StatisticLine text='positive' value={good/(good+neutral+bad)*100}/>
          </tbody>
        </table>
      </>
    )
  }
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive'){
    return (
      <tr>
        <td>{text}: {value}%</td>
      </tr>
    ) 
  }
  return(
    <tr>
      <td>{text}: {value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = ()=> {
    const newGood = good + 1
    setGood(newGood)
    console.log(newGood)
  }

  const handleNeutralClick = ()=> {
    const newNetrual = neutral + 1
    setNeutral(newNetrual)
    console.log(newNetrual)
  }

  const handleBadClick = ()=> {
    const newBad = bad + 1
    setBad(newBad)
    console.log(newBad)
  }

  return (
    <>
      <h1>give Feedback</h1>
      <Button text='good' onClick={handleGoodClick}/>
      <Button text='neutral' onClick={handleNeutralClick}/>
      <Button text='bad' onClick={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
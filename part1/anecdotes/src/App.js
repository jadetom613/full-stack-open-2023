import { useState } from 'react'

const Button = ({text, OnClick}) => {
  return(
      <button onClick={OnClick}>
        {text}
      </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))


  const handleNextClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
    console.log('randomNum: ', randomNum)
  }

  const handleVoteClick = () => {
    const pointCopy = [ ...points]
    pointCopy[selected] += 1
    setPoints(pointCopy)
  }
  
  const maxVote = points.indexOf(Math.max(...points))

  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} vote</p>
      <div>
        <Button text='vote' OnClick={handleVoteClick}></Button>
        <Button text='next anecdote' OnClick={handleNextClick}></Button>
      </div>
      <div>
        <h1>Anecdotes with votes</h1>
        <p>{anecdotes[maxVote]}</p>
        <p>has {points[maxVote]} votes</p>
      </div>
    </div>
  )
}

export default App
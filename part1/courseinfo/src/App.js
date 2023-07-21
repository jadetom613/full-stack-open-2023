const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.content} {props.exercise}</p>
  )
}

const Content = (props) => {
  const content = props.content.map((x,index)=><Part key={index} content={x.name} exercise={x.exercise} />)
  console.log(content)
  /** 
  return(
    <>
      {content}
    </>
  )
  */
 return(
  <div>
    {content}
  </div>
 )
}

const Total = (props) => {
  let total = 0
  for (const item in props.total){
   total += (props.total[item].exercise)
  }
  return(
    <p>Number of exercises: {total} </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App
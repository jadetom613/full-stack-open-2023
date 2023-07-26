const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Part = ({content, exercises}) => {
    return(
      <p>{content} {exercises}</p>
    )
  }
  
  const Content = ({content}) => {
    const newContent = content.map((x)=><Part key={x.id} content={x.name} exercises={x.exercises} />)
    //console.log('content: ', content)
   return(
    <div>
      {newContent}
    </div>
   )
  }
  
  const Course = ({course}) => {
    return(
      <>
        <Header course={course.name}/>
        <Content content={course.parts}/>
        <Total total={course.parts}/>
      </>
    )
  }
  
  const Total = ({total}) => {
    const totalExercises = total.reduce(
        (sum, exercise) => sum + exercise.exercises,0
    )
    return (
      <h4>Total of {totalExercises} exercises</h4>
    )
  }

  export default Course;
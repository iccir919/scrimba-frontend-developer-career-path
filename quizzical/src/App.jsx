import { useState, useEffect } from 'react'
import Introduction from "./Introduction"
import Quiz from "./Quiz"
import testData from "./testData"

function App() {

  const [showQuiz, setShowQuiz] = useState(true)
  const [questions, setQuestions] = useState(testData)

  function startQuiz() {
    setShowQuiz(true)
  }

  // useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  //     .then(res => {
  //       if (!res.ok) throw Error("Something went wrong")
  //       return res.json()
  //     })
  //     .then(data => {
  //       console.log(data.results)
  //       setQuestions(data.results)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }, [])

  return (
    <main>
      {
        showQuiz ? 
        <Quiz 
          questions={questions} 
        /> : <Introduction startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

import { useState, useEffect } from 'react'
import Introduction from "./Introduction"
import Questions from './Questions'

function App() {

  const [showQuiz, setShowQuiz] = useState(false)
  const [questions, setQuestions] = useState([])

  function startQuiz() {
    setShowQuiz(true)
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => {
        if (!res.ok) throw Error("Something went wrong")
        return res.json()
      })
      .then(data => {
        console.log(data.results)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <main>
      {
        showQuiz ? <Questions /> : <Introduction startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

import { useState } from 'react'
import Introduction from "./Introduction"
import Questions from './Questions'

function App() {

  const [showQuiz, setShowQuiz] = useState(false)

  function startQuiz() {
    setShowQuiz(true)
  }

  return (
    <main>
      {
        showQuiz ? <Questions /> : <Introduction startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

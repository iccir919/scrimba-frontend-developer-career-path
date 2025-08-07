import { useState, useEffect } from 'react'
import { decode } from "html-entities"
import Introduction from "./Introduction"
import Quiz from "./Quiz"
import testData from "./testData"

function App() {

  const [showQuiz, setShowQuiz] = useState(true)
  const [questions, setQuestions] = useState(decodeAndFormatQuestions(testData))
  const [guesses, setGuesses] = useState(questions.map(question => ({ "question_id": question.question_id, "guess": null })))
  console.log("guesses_state", guesses)

  function startQuiz() {
    setShowQuiz(true)
  }

  function handleGuess(guess_answer, question_id) {
    setGuesses(prevGuesses => {
      return prevGuesses.map(guessObj => {
        if (guessObj.question_id === question_id) { 
          if (guessObj.guess === null || guessObj.guess !== guess_answer) {
            return {
              ...guessObj,
              guess: guess_answer
            }
          } else {
            return guessObj
          }
        } else {
          return guessObj
        }
      })
    })
  }

  function decodeAndFormatQuestions(questions) {
    return questions.map((question, question_index) => (
        {
          ...question,
          question: decode(question.question),
          incorrect_answers: question.incorrect_answers.map(answer => decode(answer)),
          correct_answer: decode(question.correct_answer),
          question_id: `question_${question_index + 1}`,
          possible_answers: randomlyInsertElement(question.correct_answer, question.incorrect_answers)
        }
    ))
  }


  function randomlyInsertElement(element, array) {
      const index = Math.floor(Math.random() * (array.length + 1))
      const newArray = [
          ...array.slice(0, index),
          element,
          ...array.slice(index)
      ]
      return newArray
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
          guesses={guesses}
          handleGuess={handleGuess}
        /> : <Introduction startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

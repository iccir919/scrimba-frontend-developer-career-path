import { useState, useEffect } from 'react'
import { decode } from "html-entities"
import Introduction from "./Introduction"
import Quiz from "./Quiz"
import testData from "./testData"

function App() {

  const [showQuiz, setShowQuiz] = useState(true)
  const [questions, setQuestions] = useState(decodeAndFormatQuestions(testData))

  function startQuiz() {
    setShowQuiz(true)
  }

  function decodeAndFormatQuestions(questions) {
    return questions.map((question, question_index) => {
        const decodedQuestion = {
        ...question,
        question: decode(question.question),
        incorrect_answers: question.incorrect_answers.map(answer => decode(answer)),
        correct_answer: decode(question.correct_answer),
        question_id: question_index + 1
      }

      decodedQuestion.possible_answers = 
        randomlyInsertElement(decodedQuestion.correct_answer, decodedQuestion.incorrect_answers)
        .map((answer, answer_index) => ({
          answer: answer,
          answer_id: answer_index + 1
        }))

      return decodedQuestion
    })
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
        /> : <Introduction startQuiz={startQuiz} />
      }
    </main>
  )
}

export default App

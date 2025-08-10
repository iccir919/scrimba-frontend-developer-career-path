import { useState, useEffect } from 'react'
import { decode } from "html-entities"
import Introduction from "./Introduction"
import Quiz from "./Quiz"

function App() {

  const [showQuiz, setShowQuiz] = useState(false)
  const [questions, setQuestions] = useState(decodeAndFormatQuestions([]))
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [quizVersion, setQuizVersion] = useState(0)

  function startQuiz() {
    setShowQuiz(true)
  }

  function retryQuestions() {
    setQuizVersion(prev => prev + 1)
  }

  function handleGuess(guess_answer, question_id) {
    setQuestions(prevQuestions => 
      prevQuestions.map(question =>
        question.question_id === question_id 
        ? {...question, guess: guess_answer}
        : question
      )
    )
  }

  function decodeAndFormatQuestions(questions) {
    return questions.map((question, question_index) => (
        {
          ...question,
          question: decode(question.question),
          incorrect_answers: question.incorrect_answers.map(answer => decode(answer)),
          correct_answer: decode(question.correct_answer),
          question_id: `question_${question_index + 1}`,
          possible_answers: randomlyInsertElement(
            decode(question.correct_answer),
            question.incorrect_answers.map(incorrect_answer => decode(incorrect_answer))
          ),
          guess: null
        }
    ))
  }

  function handleQuizSubmit() {
    console.log("Quiz submitted")
    setIsQuizCompleted(true)
  }

  function handleNewQuiz() {
    setShowQuiz(false)
    setIsQuizCompleted(false)
    setQuizVersion(prev => prev + 1)
  }


  function randomlyInsertElement(element, array) {
      const index = Math.floor(Math.random() * (array.length + 1))
      return [
          ...array.slice(0, index),
          element,
          ...array.slice(index)
      ]
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => {
        if (!res.ok) throw Error("Something went wrong")
        return res.json()
      })
      .then(data => {
        setQuestions(decodeAndFormatQuestions(data.results))
      })
      .catch(err => {
        console.error(err)
      })
  }, [quizVersion])

  return (
    <main>
      {
        showQuiz ? 
        <Quiz 
          questions={questions} 
          handleGuess={handleGuess}
          handleQuizSubmit={handleQuizSubmit}
          isQuizCompleted={isQuizCompleted}
          handleNewQuiz={handleNewQuiz}
        /> 
        : <Introduction 
          startQuiz={startQuiz} 
          questions={questions} 
          retryQuestions={retryQuestions}
        />
      }
    </main>
  )
}

export default App

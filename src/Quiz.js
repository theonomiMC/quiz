// import logo from './logo.svg';
import React from 'react'
import Loading from './components/Loading'
import Questions from './components/Questions'
import useFetch from './components/useFetch'
import './App.css'

// ---External API ---
const URL = 'https://opentdb.com/api_category.php'
// ----  Array Of Difficulties
const difficultyArray = ["easy", "medium", "hard"]

const Quiz = () => {
  const { data, isLoading } = useFetch(URL)
  const [category, setCategory] = React.useState('')
  const [difficulty, setDifficulty] = React.useState('')
  const [questions, setQuestions] = React.useState([])

  //---- Set Category and Difficulty Values
  const chooseCategory = (e) => {
    setCategory(e.target.value)
  }
  const chooseDifficulty = (e) => {
    setDifficulty(e.target.value)
  }
  //--- Start Quiz
  const startQuiz = async () => {
    try {
      await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
        .then(res => res.json())
        .then(data => setQuestions(data.results))
    } catch (err) {
      console.log(err.message)
    }
  }

  const reset = () => {
    setQuestions([])
  }

  // --- Render Options ----
  if (questions.length < 1) {
    return <main>
      {isLoading ? <Loading /> : (
        <React.Fragment>
          <div>
            <h1 className='section-title'>Quiz</h1>
            {data.trivia_categories && data.trivia_categories.map(category => <button className='btn-white'
              key={category.id}
              onClick={chooseCategory}
              value={category.id} >
              {category.name}
            </button>
            )}
          </div>

          <div>
            <h2 style={{ marginTop: '3rem' }}>Choose Dificulty: </h2>
            {difficultyArray.map((item, i) => (
              <button className='btn-white' key={i} onClick={chooseDifficulty} value={item}>{item}</button>
            ))}
            <div className='btn-wrapper'>
              <button type='click' onClick={startQuiz} className='btn submit'>start</button>
            </div>
          </div>
        </React.Fragment>
      )}
    </main>
  }

  return <main>
    <Questions questions={questions} reset={reset} />
  </main>

}

export default Quiz;

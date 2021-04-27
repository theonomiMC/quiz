import React, { useState } from 'react'
import Result from './Result'


//  Decode HTML Characters
const decode = (str) => {
    let doubleQuote = /&quot;/g
    let singleQuote = /&#039;/g
    return str.replace(doubleQuote, "\"").replace(singleQuote, "'")
}

const Questions = ({ questions, reset, startQuiz }) => {
    const [showResult, setShowresult] = useState(false)
    const [correct, setCorrect] = React.useState(0)
    const [index, setIndex] = useState(0)

    // console.log(questions.map((el, i) => `answer ${i} ${el.correct_answer}`))
    //---Shuffle Answers
    const answersList = questions.map(el => [...el.incorrect_answers, el.correct_answer].sort(() => Math.random() - 0.5))

    const handleCorrectAnswer = (answer) => {
        const response = questions.some(p => p.correct_answer === answer)
        if (index < questions.length - 1) {
            setIndex(i => i + 1)
            if (response) {
                setCorrect(correct => correct + 1)
            }
        } else {
            setCorrect(correct => correct + 1)
            setShowresult(true)
        }
    }

    return <>
        {!showResult ? (
            <React.Fragment>
                <div className='wrapper'>
                    <div className='row' aria-label="category">
                        <h3 aria-label="question number">Question {index + 1}</h3>
                    </div>
                    <div className='row' aria-label="question">
                        <p>{decode(questions[index].question)}</p>
                    </div>
                </div>
                <div className='wrapper'>
                    <div className='row' aria-label="answer section">
                        <ul className='list'>
                            {answersList[index].map((answer, j) => <li key={j * new Date().getTime()}>
                                <button className='btn-white' onClick={() => handleCorrectAnswer(answer)}>
                                    {decode(answer)}
                                </button>
                            </li>)}

                        </ul>
                    </div>
                </div>
            </React.Fragment>
        ) : (
            <div aria-label="result">
                <Result correct={correct} questions={questions} />
                <div className='btn-wrapper'>
                    <button type='click' onClick={reset} className='btn submit'>play again</button>
                </div>

            </div>
        )
        }
    </>
}

export default Questions





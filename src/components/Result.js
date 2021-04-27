import React from 'react'

const Result = ({ correct, questions }) => {
    console.log(correct)
    return <article>
     <h1 className='section-title'>Result</h1>
        <div className='results'>        
            <h4 className='section-title'>
                You have {correct} / {questions.length} correct answers
            </h4>
        </div>
    </article>


}

export default Result
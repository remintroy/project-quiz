import React from 'react'
import NavBar from "../../components/NavBar/NavBar";
import "./Quiz.css";

//importing module for code highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';


function Quiz() {

    //To HighLight the code 
    // Add the code questions in the CodeString
    const codeString =
        `var a = orange; 
let b = apple; 
                    
console.log(this.a,this.b);`

    return (
        <>
            <NavBar />
            <div className="QuizPageQuestion">

                <div className="quiz">
                    <h5 className="quiz-name">
                        7 : Apple orange
                    </h5>
                    <p className="timer">
                        00:45
                    </p>
                </div>

                <div className="code-question">
                    <SyntaxHighlighter language="javascript" style={dracula} >
                        {/*  
                    Specify the Code Language above
                    To HighLight the code 
                    Add the code questions in the CodeString Above  
                    */}
                        {codeString}
                    </SyntaxHighlighter>
                </div>
                <div className="hashtags">
                    <span>#js</span>
                    <span>#creativecoding</span>
                </div>

                <h4 className="question-h4">
                    Q. What Will Be The Output For The Code Given Above ?
                </h4>

                <span className='choose-option'>Choose The Correct Option</span>

                <div className="answer-options">
                    <div className="options">Apple</div>
                    <div className="options">Orange</div>
                    <div className="options">Apple,Orange</div>
                    <div className="options">Error</div>
                </div>

                <span className='how-works'><span class="material-symbols-outlined"> info  </span> See How It Works</span>
                <div className="next-question">Next Question</div>

            </div>
        </>
    )
}

export default Quiz

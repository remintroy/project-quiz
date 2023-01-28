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
        `
var a = orange; 
let b = apple; 
                    
console.log(this.a,this.b);

`

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
                    <span>#js </span>
                    <span>#creativecoding</span>
                </div>
                <div className="question-headline">
                    <h4 className="question-h4">
                        Q. What will be the output for the code given above ?
                    </h4>
                </div>
                <span className='choose-option'>Choose the correct option</span>

                <div className="answer-options">
                    <div className="options">Apple</div>
                    <div className="options">Orange</div>
                    <div className="options">Apple,Orange</div>
                    <div className="options">Error</div>
                </div>

                <div className="next-question">Next Question</div>
                <span className='how-works'><span class="material-symbols-outlined">info</span>Don't know. See how it works </span>

            </div>
        </>
    )
}

export default Quiz

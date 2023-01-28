import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Step.css'

function Step1() {
    const navigate = useNavigate()
    return (
        <>
            <div className='step1Page'>
                <div className="left">
                     <h4 className='navName'>Quizo</h4>
                     <div className='leftCenter'>
                        <h4>Step 1</h4>
                        <p>Enter you personal information to get closer</p>
                        <div className='firstSection'><div className="first">1</div><span>Personal Information</span></div>
                        <div className='gap'></div>
                         <div className='SecondarySection'><div className="first">2</div><span>Languages</span></div>
                         <div className='gap'></div>
                         <div className='SecondarySection'><div className="first">3</div><span>Education</span></div>
                         <div className='gap'></div>
                         <div className='SecondarySection'><div className="first">4</div><span>Experience</span></div>
                     </div>
                </div>
                <div className="right">
                    <button onClick={()=>navigate('/step2')}>next</button>
                </div>
            </div>
        </>

    )
}

export default Step1

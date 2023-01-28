import React, { useRef } from 'react'
import './Step2.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Step2() {
  const navigate = useNavigate()
  let count = useRef(0);
  const [select1, setSelect1] = useState(false)
  const [select2, setSelect2] = useState(false)
  const [select3, setSelect3] = useState(false)
  const [select4, setSelect4] = useState(false)
  const [select5, setSelect5] = useState(false)
  const [select6, setSelect6] = useState(false)
  const [select7, setSelect7] = useState(false)
  const [select8, setSelect8] = useState(false)

  const ToggleDiv1 = (e) => {
    if (count.current > 2 && select1 == false) {
      e.preventDefault()
      return
    }
    setSelect1(!select1)

    if (select1 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current-1
    }
  }

  const ToggleDiv2 = (e) => {
    if (count.current > 2 && select2 == false) {
      e.preventDefault()
      return;
    }
    setSelect2(!select2)

    if (select2 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }
  }
  const ToggleDiv3 = (e) => {
    if (count.current > 2 && select3 == false) {
      e.preventDefault()
      return;
    }
    setSelect3(!select3)

    if (select3 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }
  }
  const ToggleDiv4 = (e) => {
    if (count.current > 2 && select4 == false) {
      e.preventDefault()
      return;
    }
    setSelect4(!select4)

    if (select4 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }
  }
  const ToggleDiv5 = (e) => {
    if (count.current > 2 && select5 == false) {
      e.preventDefault()
      return;
    }
    setSelect5(!select5)

    if (select5 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }
  }
  const ToggleDiv6 = (e) => {
    if (count.current > 2 && select6 == false) {
      e.preventDefault()
      return;
    }
    setSelect6(!select6)

    if (select6 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }
  }
  const ToggleDiv7 = (e) => {
    if (count.current > 2 && select7 == false) {
      e.preventDefault()
      return;
    }
    setSelect7(!select7)

    if (select7 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }
  }
  const ToggleDiv8 = (e) => {
    if (count.current > 2 && select8 == false) {
      e.preventDefault()
      return;
    }
    setSelect8(!select8)

    if (select8 == false) {
      count.current = count.current + 1
    } else {
      count.current = count.current - 1
    }

  }

  console.log(count.current);

  return (
    <>
      <div className='step2Page'>
        <div className="left">
          <h4 className='navName'>Quizo</h4>
          <div className='leftCenter'>
            <h4>Step 2</h4>
            <p>Select your preferred languages</p>
            <div className='firstSection'><div className="first">1</div><span>Personal Information</span></div>
            <div className='gap'></div>
            <div className='firstSection'><div className="first">2</div><span>Languages</span></div>
            <div className='gap'></div>
            <div className='SecondarySection'><div className="first">3</div><span>Education</span></div>
            <div className='gap'></div>
            <div className='SecondarySection'><div className="first">4</div><span>Experience</span></div>
          </div>
        </div>
        <div className="right">
          <h4>Language</h4>
          <label>Select your preferred languages </label>
          <div className="box">
            <div className={select1 ? 'active' : 'box1'} onClick={(e) => ToggleDiv1(e)}>
              Javascript
            </div>
            <div className={select2 ? 'active' : 'box1'} onClick={(e) => ToggleDiv2(e)}>
              Python
            </div>
            <div className={select3 ? 'active' : 'box1'} onClick={(e) => ToggleDiv3(e)}>
              Ruby
            </div>
            <div className={select4 ? 'active' : 'box1'} onClick={(e) => ToggleDiv4(e)}>
              C
            </div>
            <div className={select5 ? 'active' : 'box1'} onClick={(e) => ToggleDiv5(e)}>
              C++
            </div>
            <div className={select6 ? 'active' : 'box1'} onClick={(e) => ToggleDiv6(e)}>
              Golang
            </div>
            <div className={select7 ? 'active' : 'box1'} onClick={(e) => ToggleDiv7(e)}>
              Java
            </div>
            <div className={select8 ? 'active' : 'box1'} onClick={(e) => ToggleDiv8(e)}>
              PHP
            </div>
          </div>
          <div className="buttons">
            <div className='backBtn' onClick={() => navigate('/step')}>Back</div>
            <div className='nextBtn' onClick={() => navigate('/step3')}>Next step</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Step2

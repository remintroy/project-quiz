import React from "react";
import "./Step2.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Step2() {
  const navigate = useNavigate();

  const [languages, setLanguages] = useState({
    Javascript: false,
    python: false,
    Ruby: false,
    C: false,
    "C++": false,
    Golang: false,
    Java: false,
    PHP: false,
  });

  // selects curresponding language
  const updateLanguageSelection = (key) => setLanguages({ ...languages, [key]: !languages[key] });

  return (
    <div className="step2Page">
      <div className="left">
        <h4 className="navName">Quizo</h4>
        <div className="leftCenter">
          <h4>Step 2</h4>
          <p>Select your preferred languages</p>
          <div className="firstSection">
            <div className="first">1</div>
            <span>Personal Information</span>
          </div>
          <div className="gap"></div>
          <div className="firstSection">
            <div className="first">2</div>
            <span>Languages</span>
          </div>
          <div className="gap"></div>
          <div className="SecondarySection">
            <div className="first">3</div>
            <span>Education</span>
          </div>
          <div className="gap"></div>
          <div className="SecondarySection">
            <div className="first">4</div>
            <span>Experience</span>
          </div>
        </div>
      </div>
      <div className="right">
        <h4>Language</h4>
        <label>Select your preferred languages </label>
        <div className="box">
          {/* Lists all options */}
          {Object.keys(languages).map((e) => {
            return (
              <div className={`box1 ${languages[e] ? "active" : ""}`} key={e} onClick={() => updateLanguageSelection(e)}>
                {e}
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <div className="backBtn" onClick={() => navigate("/step")}>
            Back
          </div>
          <div className="nextBtn" onClick={() => navigate("/step3")}>
            Next step
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;

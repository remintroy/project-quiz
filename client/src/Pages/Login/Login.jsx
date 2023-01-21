import React from "react";
import "./Login.css";
import googleIcn from "../../icons/google.png";
import githubIcn from "../../icons/github.png";

function Login() {
  return (
    <div className="LoginPage">
      <div className="container">
        <h1>Welcome back</h1>
        <div className="inputCont">
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Passoword" />
          <button>Continue</button>
        </div>
        <div className="or">
          <div></div>
          <span>OR</span>
          <div></div>
        </div>
        <div className="providers">
          <button className="g">
            <img src={googleIcn} alt="" /> Continue with google
          </button>
          <button className="g h">
            <img src={githubIcn} alt="" /> Continue with github
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

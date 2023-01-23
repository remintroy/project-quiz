import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import googleIcn from "../../icons/google.png";
import githubIcn from "../../icons/github.png";
import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authConfig } from "../../Services/Firebase";
import { useRef } from "react";
import { backend } from "../../Services/Axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusDisplay, setStatusDisplay] = useState({
    show: true,
    error: false,
    message: "Hi, Do I know Your? Lets see...",
  });

  const passwordInput = useRef("");
  const emailInput = useRef("");

  const navigate = useNavigate();

  // reset all input color to default
  const resetAllInputColors = () => {
    emailInput.current.classList.remove("err");
    passwordInput.current.classList.remove("err");
  };

  // format firebase error and display to user
  const showFirebaseError = (error) => {
    setStatusDisplay({
      show: true,
      error: true,
      message: error.code ? ` Oops ${error.code?.split("/")[1]?.split("-")?.join(" ")} !` : "Oops Faild to login",
    });
  };

  // Login with email and password
  const loginWithEmailHandler = async () => {
    try {
      resetAllInputColors();
      setStatusDisplay({
        error: false,
        show: true,
        message: "Loading...",
      });
      const response = await signInWithEmailAndPassword(authConfig, email, password);
      submitToServer(response);
    } catch (error) {
      // error handling
      showFirebaseError(error);
    }
  };

  // signin with google
  const loginWithGoogleHandler = async () => {
    try {
      resetAllInputColors();
      setStatusDisplay({
        error: false,
        show: true,
        message: "Loading...",
      });
      const response = await signInWithPopup(authConfig, new GoogleAuthProvider());
      submitToServer(response);
    } catch (error) {
      // handling error
      showFirebaseError(error);
    }
  };

  const submitToServer = async ({ _tokenResponse: { idToken } }) => {
    try {
      // eslint-disable-next-line
      const {
        data: { accessToken, refreshToken },
      } = await backend.post("/auth/signin", { idToken: idToken });

      // success response
      setStatusDisplay({
        error: false,
        show: true,
        message: "Login success",
      });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // TODO: Login complete Send user to desired page...
      // ...
    } catch (errorResponse) {
      // handling error
      const {
        response: {
          data: { error },
        },
      } = errorResponse;

      // display error to user
      setStatusDisplay({
        error: true,
        show: true,
        message: error,
      });
    }
  };

  return (
    <div className="LoginPage">
      <div className="container">
        <h1>Welcome back</h1>
        <div className="inputCont">
          {statusDisplay.show && (
            <div className={`dispState ${statusDisplay.error ? "err" : ""}`}>{statusDisplay.message}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            ref={emailInput}
            onFocus={resetAllInputColors}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            ref={passwordInput}
            onFocus={resetAllInputColors}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Show password
            {!showPassword && (
              <span onClick={(e) => setShowPassword(true)} className="material-symbols-outlined">
                check_box_outline_blank
              </span>
            )}
            {showPassword && (
              <span onClick={(e) => setShowPassword(false)} className="material-symbols-outlined">
                check_box
              </span>
            )}
          </p>
          <button onClick={(e) => loginWithEmailHandler()}>Continue</button>
        </div>
        <div className="signup" onClick={(e) => navigate("/signup")}>
          Don't have account ? SIGNUP
        </div>
        <div className="or">
          <div></div>
          <span>OR</span>
          <div></div>
        </div>
        <div className="providers">
          <button className="g" onClick={(e) => loginWithGoogleHandler()}>
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

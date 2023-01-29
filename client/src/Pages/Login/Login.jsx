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
  const passwordInput = useRef("");
  const emailInput = useRef("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusDisplay, setStatusDisplay] = useState({
    show: true,
    error: false,
    message: "Hi, Do I know You? Lets see...",
  });

  const navigate = useNavigate();

  // reset all input color to default
  const resetAllInputColors = () => {
    emailInput.current.classList.remove("err");
    passwordInput.current.classList.remove("err");
  };

  const showErrorStatus = (message) => setStatusDisplay({ error: true, show: true, message: message });
  const showStatus = (message) => setStatusDisplay({ error: false, show: true, message: message });

  const firebaseAuthentication = async (type) => {
    try {
      // error message for empty fields
      const incompleteFieldErr = {
        code: "auth/plz-fillout-all-required-fields",
      };

      if (type === "Email" && !email && !password) throw incompleteFieldErr;

      resetAllInputColors();
      showStatus("Loading...");

      const response =
        type === "Google"
          ? await signInWithPopup(authConfig, new GoogleAuthProvider())
          : type === "Email"
          ? await signInWithEmailAndPassword(authConfig, email, password)
          : "// github function here";

      submitToServer(response);
    } catch (error) {
      showErrorStatus(error.code ? `${error.code?.split("/")[1]?.split("-")?.join(" ")} !` : "Oops Faild to login");
    }
  };

  const submitToServer = async ({ _tokenResponse: { idToken } }) => {
    try {
      // success response
      showStatus("Connecting to server");
      // request to server and getting token response from server
      const response = await backend.post("/auth/signin", { idToken: idToken });
      localStorage.setItem("accessToken", response?.data?.accessToken);
      localStorage.setItem("refreshToken", response?.data?.refreshToken);
      setStatusDisplay({
        error: false,
        show: true,
        message: "Login success",
      });
      // sends user to desired page after login
      navigate("/");
      // ...
    } catch (errorResponse) {
      const response = errorResponse;
      const error = response?.data?.error;
      showErrorStatus(error ? error : "Oops someting went wrong!");
    }
  };

  return (
    <div className="LoginPage">
      <div className="ExistingUser ">
        <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="" />
        <h2>Remin T Roy</h2>
        <p>You are currently logged in as remin@gmail.com</p>
        <div className="btnCont">
          <button>Logout and continue</button>
          <button>Go back to home page</button>
        </div>
      </div>
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
          <button onClick={(e) => firebaseAuthentication("Email")}>Continue</button>
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
          <button className="g" onClick={(e) => firebaseAuthentication("Google")}>
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

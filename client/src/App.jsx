import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoaderFullPage from "./context/LoaderFullPage";
import User from "./context/User";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Quiz from "./Pages/Quiz/Quiz";
import { backend } from "./Services/Axios";

function App() {
  // constants
  const loader = useRef({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    //
    const getUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // if there is not token in local storage
      if (!refreshToken) setUser(null);
      else
        try {
          // get user data from server
          const res = await backend.get("/user_data", { headers: { authorization: `Bearer ${accessToken}` } });
          // set user data;
          setUser(res.data?.data);
          //..
        } catch (error) {
          try {
            if (!error.response.status === 401) throw error;
            // headers whith refresh token
            const headers = { headers: { authorization: `Bearer ${refreshToken}` } };
            // new access token response from server
            const res = await backend.post("/auth/generate_refresh_token", {}, headers);
            // save new access token to local storage
            localStorage.setItem("accessToken", res.data?.data?.accessToken);
            // re requesting data from server
            getUserData();
          } catch (error) {
            // error while accessing data or error while getting new access token
            console.warn(error);
          }
        }
    };
    // getting user data
    getUserData();
  }, []);

  // full page loader handiler
  const showFullPageLoader = () => loader.current.classList.add("show");
  const hideFullPageLoader = () => loader.current.classList.remove("show");

  return (
    <LoaderFullPage.Provider value={{ showFullPageLoader, hideFullPageLoader }}>
      <User.Provider value={{ user, setUser }}>
        <div className="App">
          <div className="loadingFullPage" ref={loader}>
            <div className="banter-loader">
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
              <div className="banter-loader__box"></div>
            </div>
            <h2>Team Quiz</h2>
          </div>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
          </Routes>
        </div>
      </User.Provider>
    </LoaderFullPage.Provider>
  );
}

export default App;

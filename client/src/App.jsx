import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import LoaderFullPage from "./context/LoaderFullPage";
import User from "./context/User";


//Importing Pages 

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import Quiz from "./Pages/Quiz/Quiz";
import Step1 from "./Pages/Step1/Step1";
import Step2 from "./Pages/Step2/Step2";
import Step3 from "./Pages/Step3/Step3";
import Step4 from "./Pages/Step4/Step4";
import { backend } from "./Services/Axios";

function App() {
  // constants
  const loader = useRef({});
  const [user, setUser] = useState(null);

  // full page loader handiler
  const showFullPageLoader = () => loader.current.classList.add("show");
  const hideFullPageLoader = () => loader.current.classList.remove("show");

  // this use effect act as data initializer for entier application
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
          return true;
          //..
        } catch (error) {
          try {
            if (!error.response?.status === 401) throw error;
            // headers whith refresh token
            const headers = { headers: { authorization: `Bearer ${refreshToken}` } };
            // new access token response from server
            const res = await backend.post("/auth/generate_refresh_token", {}, headers);
            // save new access token to local storage
            localStorage.setItem("accessToken", res.data?.data?.accessToken);
            // re requesting data from server
            getUserData();
            return true;
          } catch (error) {
            // error while accessing data or error while getting new access token
            console.warn(error);
            return false;
          }
        }

      return false;
    };

    showFullPageLoader();
    const loadingHideDelay = Date.now() + 500; // loading will show for atleast 1/2s.

    // getting user data
    getUserData().then(() => {
      while (loadingHideDelay > Date.now()) {}
      hideFullPageLoader();
    });
  }, []);

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
            <Route
              path="/"
              element={
                <SideBar>
                  <Home />
                </SideBar>
              }
            />
            <Route
              path="/quiz"
              element={
                <SideBar>
                  <Quiz />
                </SideBar>
              }
            ></Route>
            <Route path="/explore" element={<SideBar>Explore</SideBar>}></Route>
            <Route path="/tasks" element={<SideBar>Tasks</SideBar>}></Route>
            <Route path="/settings" element={<SideBar>Settings</SideBar>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/step" element={<Step1 />}></Route>
            <Route path="/step2" element={<Step2 />}></Route>
            <Route path="/step3" element={<Step3 />}></Route>
            <Route path="/step4" element={<Step4 />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </User.Provider>
    </LoaderFullPage.Provider>
  );
}

export default App;

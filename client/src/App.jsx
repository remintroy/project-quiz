import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoaderFullPage from "./context/LoaderFullPage";
import Login from "./Pages/Login/Login";

function App() {
  const loader = useRef({});

  const showFullPageLoader = () => {
    loader.current.classList.add("show");
  };

  const hideFullPageLoader = () => {
    loader.current.classList.remove("show");
  };

  return (
    <LoaderFullPage.Provider value={{ showFullPageLoader, hideFullPageLoader }}>
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
          <Route path="/" element={<h1>Home Page</h1>}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </LoaderFullPage.Provider>
  );
}

export default App;

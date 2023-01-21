import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

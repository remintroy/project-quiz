import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.css";

function Home() {
  return (
    <>
      <NavBar />
      <SideBar />
      <div className="HomePage">
        <h1>Home sweet home</h1>
        <br />
      </div>
    </>
  );
}

export default Home;

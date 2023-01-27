import React from "react";
import { useState } from "react";
import "./SideBar.css";

function SideBar() {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <div className={`SideBar ${showSideBar ? "show" : ""}`}>
      <div className="top">
        <div className="searchBar">
          <input type="text" placeholder="Search" />
        </div>
        <ul className="actions">
          <li>
            <span className="material-symbols-outlined">home</span> Home
          </li>
          <li>
            <span className="material-symbols-outlined">dataset</span> Projects
          </li>
          <li>
            <span className="material-symbols-outlined">task</span> Tasks
          </li>
          <li>
            <span className="material-symbols-outlined">stars</span> Stared
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="actions">
          <li>
            <span className="material-symbols-outlined">settings</span> Settings
          </li>
          <li>
            <span className="material-symbols-outlined">contact_support</span>Support
          </li>
        </ul>
        <div className="userData">
          <img src="/img/Profile-Demo.jpg" alt="img" className="profile-img" />
          {showSideBar && (
            <div className="userInfo">
              <b>Name</b>
              <p>sample@email.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;

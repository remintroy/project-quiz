import React from "react";
import { useContext } from "react";
import { useState } from "react";
import User from "../../context/User";
import "./SideBar.css";

function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const userContext = useContext(User);

  return (
    <div className={`SideBar ${showSideBar ? "show" : ""}`}>
      <div className="top">
        <div className="searchBar">
          <input type="text" placeholder="Search" />
        </div>
        <ul className="actions">
          <li>
            <span className="material-symbols-outlined" onClick={(e) => setShowSideBar(!showSideBar)}>
              home
            </span>{" "}
            {showSideBar && "Home"}
          </li>
          <li>
            <span className="material-symbols-outlined">dataset</span> {showSideBar && "Projects"}
          </li>
          <li>
            <span className="material-symbols-outlined">task</span>
            {showSideBar && "Tasks"}
          </li>
          <li>
            <span className="material-symbols-outlined">stars</span>
            {showSideBar && "Stared"}
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="actions">
          <li>
            <span className="material-symbols-outlined">settings</span> {showSideBar && "Settings"}
          </li>
          <li>
            <span className="material-symbols-outlined">contact_support</span> {showSideBar && "Support"}
          </li>
        </ul>
        {userContext?.user && (
          <div className="userData">
            <img src="/img/Profile-Demo.jpg" alt="img" className="profile-img" />
            {showSideBar && (
              <div className="userInfo">
                <b>{userContext?.user?.name}</b>
                <p>
                  {userContext?.user?.email?.length > 15
                    ? `${userContext?.user?.email.slice(0, 15)}...`
                    : userContext?.user?.email}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;

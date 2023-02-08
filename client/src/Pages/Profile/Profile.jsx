import React from 'react'
import './profile.css'


function Profile() {
    return (
        <>
            <div className="logo-wrap">
                <img src="./img/user-remin.png" alt="" className='user-profile-img' />
                <div className="logo">
                    <h4>Quizo</h4>
                </div>
                <div className="hi-user">
                    <h3>Hi, Remin</h3>
                    <h4>Welcome Back</h4>
                </div>
            </div>

            <div className="ranking-stats">

            </div>
        </>
    )
}

export default Profile

import React, { useEffect, useState } from 'react';
import './Login.css';
import Popup from '../Popup/Popup'

const Login = () => {
    const [login, setlogin] = useState();
    const [popup,setpopup]  = useState(false);
    const [render,rerender] = useState(true);
    
    useEffect(()=>{
        fetch('/api/users/me').then(user => {
            if (user.status === 200) {
             setlogin(true);
            }
            else {
              setlogin(false);
            }
          });
    },[render])

    const onLogoutClick = (e) => {
        e.preventDefault();
        fetch('/api/sessions/me', {
            method: 'DELETE',
        }).then(res => {
            if (res.status === 204) {
                console.log("Successfully Logout");
            }
            setlogin(false);
        });
    }


    let userStatus;
    if(login){
        userStatus = <div onClick={onLogoutClick}>Logout</div>;
    }
    else{
        userStatus = <div onClick={()=>setpopup(true)}>Login/Signup</div>;
    }

    const updatePopup = ()=>{
            setpopup(false);
            rerender(!render);
    }

  
    return (
        <>
           <span className="login-signup">{userStatus}</span>
           {popup && <Popup updatePopup={updatePopup}/>}
        </>
    )
}

export default Login;
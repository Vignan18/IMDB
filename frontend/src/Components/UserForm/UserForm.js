import React, { useState } from 'react';
import "./UserForm.css";
 import { useNavigate } from "react-router-dom";
const UserForm = ({clickHandler}) => {
    const [email, setemail] = useState('');
    const navigate = useNavigate();
    const [password, setpassword] = useState('');
    const [userStatus,setuserStatus] = useState('login');

    const newUserHandler  = (e)=>{
        e.preventDefault();
        setuserStatus('signup');
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        if(userStatus === 'signup'){
            onSignupClick();  
        }
        else{
            onLoginClick();
        }
    }

    const onLoginClick = () => {

        fetch('/api/sessions', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(res => {
            if (res.status === 204) {
                console.log("Successfully registered");
                navigate("/");
                clickHandler();
            }
        });
    }


    const onSignupClick = () => {
      
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(res=>{
           if(res.status === 201){
            setuserStatus('login');
           }
        })

    }

    return (
        <>
            <div className="LoginPage"  style={{textAlign: 'center'}}>
                <div className='content'>
                <form>
                    <input  className='email-input' placeholder="email" name="email" required type="email" onInput={(e) => setemail(e.target.value)} value={email}></input>
                    <input className='password-input' placeholder="password" name="password" required type="password" onInput={(e) => setpassword(e.target.value)} value={password}></input>
                    <div>
                        <button type="submit" className="login" onClick={submitHandler}>{userStatus}</button>
                        <br></br>
                        <button  className="newuser" onClick={newUserHandler}>New User</button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )

}
export default UserForm;
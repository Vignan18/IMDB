import React, { useState } from 'react';
import "./UserForm.css"


const LoginForm = ({closeModal}) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const onLoginClick = (e) => {
        e.preventDefault();
        fetch('/api/sessions', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(res => {
            if (res.status === 204) {
                console.log("Successfully registered");
            }
        });
        // setModalIsopen(false);
        // setlogin("logout");
    }

    const onSignupClick = (e) => {
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

    }

    return (
        <>
            <div className='modalBackground'>
                <div className='modalContainer'>
                    <div className='closebtn'>
                    <button onClick={()=>closeModal(false)}>X</button>
                    </div>
                    <div className='title'>
                        <h1>LoginForm</h1>
                    </div>
            <div className="body">
                <form>
                    <input placeholder="email" name="email" required type="email" onInput={(e) => setemail(e.target.value)} value={email}></input>
                    <input placeholder="password" name="password" required type="password" onInput={(e) => setpassword(e.target.value)} value={password}></input>
                    <div>
                        <input type="submit" onClick={onLoginClick} value="Login"></input>
                        <input type="submit" onClick={onSignupClick} value="Sign up"></input>
                    </div>
                </form>
            </div>
            <div className='footer'>
                <button>Signup</button>
                <button>Login</button>
            </div>
            </div>
            </div>
            
        </>
    )
}

export default LoginForm;
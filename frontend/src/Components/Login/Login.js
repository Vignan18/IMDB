import React, { useState } from 'react';
import './Login.css';
import UserForm from '../UserForm/UserForm';


const Login = () => {
    const [modalIsopen, setModalIsopen] = useState(false);
    const [login, setlogin] = useState(true);


    const onLogoutClick = (e) => {
        e.preventDefault();
        fetch('/api/sessions/me', {
            method: 'DELETE',
        }).then(res => {
            if (res.status === 204) {
                console.log("Successfully Logout");
                setlogin(true);
            }
        });
    }

    const closeModal = () => {
        setModalIsopen(false);
        setlogin(false);
    }
    return (
        <>
            {login && <div className='login'>
                <button onClick={() => setModalIsopen(true)}
                >signin/login</button>
                {modalIsopen && <UserForm closeModal={closeModal} />}
            </div>
            }
            {
                !login && <div className='login' ><button onClick={onLogoutClick}>Logout</button></div>
            }
        </>
    )
}

export default Login;
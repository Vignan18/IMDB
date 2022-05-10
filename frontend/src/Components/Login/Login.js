import React, { useState } from 'react';
import './Login.css';
import UserForm from '../UserForm/UserForm';


const Login = () => {
    const [modalIsopen, setModalIsopen] = useState(false);
    const [login, setlogin] = useState('signin')

    const closeModal = ()=>{
        setModalIsopen(false);
    }
    return (
        <>
            <div className='login'>
                <button onClick={() => setModalIsopen(true)}
                >{login}</button>
                {modalIsopen &&  <UserForm closeModal={closeModal}/>}
               
            </div>
        </>
    )
}

export default Login;
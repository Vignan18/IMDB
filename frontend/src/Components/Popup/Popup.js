import React, { useEffect, useState } from 'react';
import  UserForm from '../UserForm/UserForm';
import "./Popup.css"

const Popup = ({updatePopup})=>{
    const clickHandler = ()=>{
        updatePopup();
    }
    return (
        <>
            <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={clickHandler}><b>X</b></button>
                <UserForm clickHandler={updatePopup}/>          
            </div>
        </div> 
        </>
    )
}

export default Popup;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SendRead.css';

const SendRead = () => {



    const sendMessage = useSelector(state => state.Unread.sendMessage);
    const navigate = useNavigate();

    const onBackHandlerFromSend = () => {
        navigate('/inbox/send')
    }




    return (
        <div className='inboxMessage'>
            <div>
                <h5><ion-icon name="checkmark-circle-outline"></ion-icon> Text message
                    <button
                        onClick={onBackHandlerFromSend}
                        type="button"
                        className="btn btn-outline-danger"
                    >back</button>
                </h5>
            </div>
            <hr />
            <div>
                <div className='inboxMain'>
                    <span><ion-icon style={{ width: '30px', height: '30px' }} name="person-circle-outline"></ion-icon></span>
                    <span className='subject '>{sendMessage.subject}</span>
                    <span className='email'>{sendMessage.emailTo}</span>
                    <hr />
                    <div className='mt-5 message'>
                        <span>{sendMessage.composeText}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendRead;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './InboxRead.css';

const InboxRead = () => {

    const mailMessage = useSelector(state => state.Unread.mailMessage);
    const navigate = useNavigate();


    const onBackHandlerFromInbox = () => {
        navigate('/inbox/mail')
    }



    return (
        <div className='inboxMessage'>
            <div>
                <h5><ion-icon name="checkmark-circle-outline"></ion-icon> Text message
                    <button
                        onClick={onBackHandlerFromInbox}
                        type="button"
                        className="btn btn-outline-danger"
                    >back</button>
                </h5>
            </div>
            <hr />
            <div>
                <div className='inboxMain'>
                    <span><ion-icon style={{ width: '30px', height: '30px' }} name="person-circle-outline"></ion-icon></span>
                    <span className='subject '>{mailMessage.subject}</span>
                    <span className='email'>{mailMessage.emailFrom}</span>
                    <hr />
                    <div className='mt-5 message'>
                        <span>{mailMessage.composeText}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InboxRead
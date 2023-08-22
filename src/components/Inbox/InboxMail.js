import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../store/Unread';
import { useNavigate } from 'react-router-dom';
import UseFetch from '../useFetch/UseFetch';
import './InboxMail.css';

const InboxMail = () => {


    const email = localStorage.getItem('email')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const receiveEmail = useSelector(state => state.Unread.receiveMails)



    UseFetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail.json`)


    const textDetailsHandler = async (mailDetail) => {
        dispatch(messageActions.visibility())
        const { emailFrom, check, subject, composeText, id } = mailDetail;
        dispatch(messageActions.mailDetail({ emailFrom, check: false, subject, composeText, id }))
        dispatch(messageActions.inboxEmails({ emailFrom, check: false, subject, composeText, id }))
        navigate('/inbox/inboxmessage')
        if (check) {
            try {
                const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail/${id}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'applications/json'
                    },
                    body: JSON.stringify({
                        check: false,
                        emailFrom: emailFrom,
                        subject: subject,
                        composeText: composeText,
                        id: id
                    })
                })

                if (response.ok) {
                    const data = await response.json();
                }
                else {
                    const data = await response.json();
                    let errorMessage = 'Fails!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)
                }
            }
            catch (error) {
                console.log(error.message)
            }
        }

    }




    const emailRemoveHandler = async (id) => {

        dispatch(messageActions.removeInboxMail(id))

        try {
            const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'applications/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
            }
            else {
                const data = await response.json();
                let errorMessage = 'Fails!';
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage)

            }
        }
        catch (error) {
            console.log(error.message)
        }

    }



    return (
        <>
            <table className="table">
                <thead>
                </thead>
                <tbody>
                    {receiveEmail && receiveEmail.map((mail) => (
                        <tr
                            key={mail.id}>
                            <th scope="row"><ion-icon name="chatbox-outline"></ion-icon></th>
                            <td
                                onClick={() => textDetailsHandler(mail)}>
                                {mail.check && <img className='dotImage' src='https://tse1.mm.bing.net/th?id=OIP.HlXvcAlRI7rCgUl0X6PlOAHaJl&pid=Api&rs=1&c=1&qlt=95&w=94&h=121' alt='image' />}
                                {mail.subject}
                            </td>
                            <td><ion-icon name="send-outline"></ion-icon>{mail.composeText}</td>
                            <td

                                onClick={() => textDetailsHandler(mail)}>{mail.emailFrom} </td>
                            <td
                                onClick={() => emailRemoveHandler(mail.id)}
                            ><ion-icon name="trash-outline"></ion-icon></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default InboxMail
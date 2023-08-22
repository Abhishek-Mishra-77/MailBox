import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../store/Unread';
import { useNavigate } from 'react-router-dom';
import UseFetch from '../useFetch/UseFetch';
import './Send.css';

const Send = () => {


    const email = localStorage.getItem('email')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendMails = useSelector(state => state.Unread.sendMails)





    UseFetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail.json`)



    const textDetailsHandler = async (mailDetail) => {
        dispatch(messageActions.visibility())
        const { emailTo, subject, composeText, id } = mailDetail;
        dispatch(messageActions.sendDetail({ emailTo, subject, composeText, id }))
        navigate('/inbox/sendRead')
    }



    const emailRemoveHandler = async (id) => {

        dispatch(messageActions.removeSendMail(id))

        try {
            const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail/${id}.json`, {
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

        } catch (error) {
            console.log(error.message)
        }

    }





    return (
        <>
            <table className="table">
                <thead>
                </thead>
                <tbody>
                    {sendMails.map((mail) => (
                        <tr
                            key={mail.id}>
                            <th scope="row"><ion-icon name="chatbox-outline"></ion-icon></th>
                            <td
                                onClick={() => textDetailsHandler(mail)}>
                                {mail.subject}
                            </td>
                            <td><ion-icon name="send-outline"></ion-icon>{mail.composeText}</td>
                            <td
                                onClick={() => textDetailsHandler(mail)}>{mail.emailTo}</td>
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

export default Send
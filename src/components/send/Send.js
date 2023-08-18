import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../store/Unread';
import { useNavigate } from 'react-router-dom';
import './Send.css';

const Send = () => {


    const email = localStorage.getItem('email')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendMails = useSelector(state => state.Unread.sendMails)




    useEffect(() => {
        const getEmail = async () => {
            console.log('send')
            try {
                const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const mailData = Object.values(data);
                        dispatch(messageActions.sendEmails(mailData))
                    }

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
                alert(error.message)
            }
        }
        getEmail()
        const myInterval = setInterval(getEmail, 5500);
    }, [])






    const textDetailsHandler = async (mailDetail) => {
        const message = 'sendMail';
        dispatch(messageActions.visibility())
        const { emailTo, check, subject, composeText, id } = mailDetail;
        dispatch(messageActions.sendDetail({ emailTo, check: false, subject, composeText, id, message: message }))
        navigate('/inbox/inboxmessage')
        if (check) {
            try {
                const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    const mailData = Object.values(data).find((mail) => {
                        return mail.id === id
                    })
                    const mailId = Object.keys(data).find((key) => data[key] === mailData);

                    const response1 = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail/${mailId}.json`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'applications/json'
                        },
                        body: JSON.stringify({
                            check: false,
                            emailTo: emailTo,
                            subject: subject,
                            composeText: composeText,
                            id: id
                        })
                    })

                    if (response1.ok) {
                        const data = await response1.json();

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
                alert(error.message)
            }
        }
    }

    const emailRemoveHandler = async (emailDetail) => {

        const { emailTo, subject, composeText, check, id } = emailDetail;
        const mailDetails = Object.values(sendMails);
        const currEmails = mailDetails.filter((mail) => {
            return mail.id !== id;
        })
        dispatch(messageActions.allEmails(currEmails))



        try {
            const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                const mailData = Object.values(data).find((mail) => {
                    return mail.id === id;
                })
                const mailId = Object.keys(data).find((key) => data[key] === mailData);

                const response1 = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/sendMail/${mailId}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'applications/json'
                    }
                })

                if (response1.ok) {
                    const data = await response1.json();
                }
                else {
                    const data = await response1.json();
                    let errorMessage = 'Fails!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)

                }

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
            alert(error.message)
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
                                onClick={() => emailRemoveHandler(mail)}
                            ><ion-icon name="trash-outline"></ion-icon></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default Send
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../store/Unread';
import { useNavigate } from 'react-router-dom';
import './InboxMail.css';

const InboxMail = () => {


    const email = localStorage.getItem('email')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const receiveEmail = useSelector(state => state.Unread.receiveMails)




    useEffect(() => {
        const getEmail = async () => {
            console.log('receive')
            try {
                const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    let unreadMessageCount = 0;
                    if (data) {
                        const mailData = Object.values(data);
                        for (let i = 0; i < mailData.length; i++) {
                            if (mailData[i].check) {
                                unreadMessageCount = unreadMessageCount + 1;
                            }
                        }
                        console.log(data)
                        dispatch(messageActions.inboxEmails(mailData))
                        dispatch(messageActions.unreadMessage(unreadMessageCount))
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
        const message = 'inboxMail'
        dispatch(messageActions.visibility())
        const { emailFrom, check, subject, composeText, id } = mailDetail;
        dispatch(messageActions.mailDetail({ emailFrom, check: false, subject, composeText, id, message: message }))
        navigate('/inbox/inboxmessage')
        if (check) {
            try {
                const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail.json`, {
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

                    const response1 = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail/${mailId}.json`, {
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

        const { id } = emailDetail;
        const mailDetails = Object.values(receiveEmail);
        const currEmails = mailDetails.filter((mail) => {
            return mail.id !== id;
        })
        dispatch(messageActions.allEmails(currEmails))



        try {
            const response = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail.json`, {
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

                const response1 = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/${email.replace(/[.@]/g, "")}/receiveEmail/${mailId}.json`, {
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
                    {receiveEmail.map((mail) => (
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
                                onClick={() => emailRemoveHandler(mail)}
                            ><ion-icon name="trash-outline"></ion-icon></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default InboxMail
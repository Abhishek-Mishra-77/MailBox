import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { messageActions } from '../../store/Unread';
import './Inbox.css';
import { useDispatch, useSelector } from 'react-redux';

const Inbox = () => {

    const email = localStorage.getItem('email')
    const dispatch = useDispatch();
    const visible = useSelector(state => state.Unread.visible)
    const messageCount = useSelector(state => state.Unread.messageCount)
    const mailMessage = useSelector(state => state.Unread.mailMessage);
    const receiveEmail = useSelector(state => state.Unread.receiveMails)


    useEffect(() => {
        if (email) {
            const getEmail = async () => {
                try {
                    const response = await fetch('https://mailbox-53339-default-rtdb.firebaseio.com/receiveEmail.json', {
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
                            dispatch(messageActions.allEmails(mailData))
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
        }
    }, [email, mailMessage, messageCount, visible])


    const textDetailsHandler = async (mailDetail) => {
        dispatch(messageActions.visibility())
        const { email, check, subject, composeText } = mailDetail;
        dispatch(messageActions.mailDetail({ email, check: false, subject, composeText }))

        if (check) {
            try {
                const response = await fetch('https://mailbox-53339-default-rtdb.firebaseio.com/receiveEmail.json', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    const mailData = Object.values(data).find((mail) => {
                        return mail.email === email && mail.subject === subject && mail.composeText === composeText
                    })
                    const mailId = Object.keys(data).find((key) => data[key] === mailData);

                    const response1 = await fetch(`https://mailbox-53339-default-rtdb.firebaseio.com/receiveEmail/${mailId}.json`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'applications/json'
                        },
                        body: JSON.stringify({
                            check: false,
                            email: email,
                            subject: subject,
                            composeText: composeText
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



    const onVisibleHandler = () => {
        dispatch(messageActions.visibility())
    }


    return (
        <section className='inbox'>
            <div className='inbox'>
                <div>
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <Link to={'/home'} className="navbar-brand" href="#">BeyondMailbox</Link>
                        </div>
                    </nav>
                </div>
                <div>
                    <div className='b1'>
                        <div className='container1'>
                            <div className="card" style={{ width: '100%' }}>
                                <div className="card-body">
                                    <Link to={'/compose'} className="btn btn-primary btn-lg">Compose</Link>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Inbox
                                        {messageCount > 0 ? <span className='unread'>{messageCount}</span> : ''}
                                    </button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Unread</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Starred</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Drafts</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Send</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Spam</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Deleted Items</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Photo</button>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-info">Documents</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='b2'>
                        <div>
                            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                                <div className="container-fluid section-right">
                                    <a className="navbar-brand" href="#"><ion-icon name="copy-outline"></ion-icon></a>
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link disabled" aria-current="page" href="#"><ion-icon name="archive-outline"></ion-icon>Archieve</a>

                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link disabled" href="#"><ion-icon name="arrow-down-circle-outline"></ion-icon>Move</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link disabled" href="#"><ion-icon name="trash-outline"></ion-icon>Delete</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link disabled" aria-disabled="true"><ion-icon name="backspace-outline"></ion-icon>spam</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link " aria-disabled="true"><ion-icon name="ellipsis-horizontal-outline"></ion-icon></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a className="nav-link active" aria-disabled="true">Sort<ion-icon name="chevron-down-outline"></ion-icon></a>
                                </div>
                            </nav>
                        </div>
                        {/* table */}
                        {!visible && <table className="table">
                            <thead>
                            </thead>
                            <tbody>
                                {receiveEmail.map((mail) => (
                                    <tr
                                        onClick={() => textDetailsHandler(mail)}
                                        key={mail.id}>
                                        <th scope="row"><ion-icon name="chatbox-outline"></ion-icon></th>
                                        <td>
                                            {mail.check && <img className='dotImage' src='https://tse1.mm.bing.net/th?id=OIP.HlXvcAlRI7rCgUl0X6PlOAHaJl&pid=Api&rs=1&c=1&qlt=95&w=94&h=121' alt='image' />}
                                            {mail.subject}
                                        </td>
                                        <td><ion-icon name="send-outline"></ion-icon>{mail.composeText}</td>
                                        <td>{mail.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                        {visible && <div className='inboxMessage'>
                            <div>
                                <h5><ion-icon name="checkmark-circle-outline"></ion-icon> Text message
                                    <button
                                        onClick={onVisibleHandler}
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
                                    <span className='email'>{mailMessage.email}</span>
                                    <hr />
                                    <div className='mt-5 message'>
                                        <span>{mailMessage.composeText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Inbox;



{/* <ion-icon name="checkmark-circle-outline"></ion-icon> */ }
{/* <ion-icon name="checkmark-circle"></ion-icon> */ }
{/* <table className="table">
<thead>

</thead>
<tbody>
    {receiveMails.map((mail) => (
        <tr key={mail.id}>
            <th scope="row"><ion-icon name="chatbox-outline"></ion-icon></th>
            <td>
                {mail.check && <img className='dotImage' src='https://tse1.mm.bing.net/th?id=OIP.HlXvcAlRI7rCgUl0X6PlOAHaJl&pid=Api&rs=1&c=1&qlt=95&w=94&h=121' alt='image' />}
                {mail.subject}
            </td>
            <td><ion-icon name="send-outline"></ion-icon>{mail.composeText}</td>
            <td>{mail.email}</td>
        </tr>
    ))}
</tbody>
</table> */}
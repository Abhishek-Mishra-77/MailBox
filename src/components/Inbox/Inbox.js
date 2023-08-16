import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Inbox.css';

const Inbox = () => {

    const [receiveMails, setReceiveMails] = useState([]);
    const email = localStorage.getItem('email')

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
                        if (data) {
                            const mailData = Object.values(data);
                            setReceiveMails(mailData)
                            console.log(mailData)
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
    }, [email])



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
                                    <button type="button" className="btn btn-outline-info">Inbox</button>
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
                        <table className="table">
                            <thead>

                            </thead>
                            <tbody>
                                {receiveMails.map((mail) => (
                                    <tr key={mail.id}>
                                        <th scope="row"><ion-icon name="chatbox-outline"></ion-icon></th>
                                        <td><ion-icon name="checkmark-circle-outline"></ion-icon>{mail.subject}</td>
                                        <td><ion-icon name="send-outline"></ion-icon>{mail.composeText}</td>
                                        <td>{mail.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Inbox;
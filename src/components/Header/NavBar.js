import React from 'react';
import './NavBar.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

    const messageCount = useSelector(state => state.Unread.messageCount)
    const navigate = useNavigate();


    const onLogoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/auth')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-main">
            <div className="container-fluid">
                <Link to={'/home'} className="navbar-brand" href="#">BeyondMailbox</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'compose'} className="nav-link active" aria-current="page" href="#">Compose</Link>
                        </li>
                        <li className="nav-item">

                            <Link to={'/inbox'} className="nav-link" href="#">Inbox </Link>

                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to={'/auth'} className="nav-link" href="#">Login</Link>
                        </li>
                    </ul>
                    <div>
                        <button onClick={onLogoutHandler} type="button" className="btn btn-outline-danger">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
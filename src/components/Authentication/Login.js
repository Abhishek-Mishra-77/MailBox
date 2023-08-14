import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [misMatch, setMisMatch] = useState(false);
    const navigate = useNavigate();



    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(password, email, confirmPassword)

        try {
            if (isLogin) {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaCVXSzE0kTKrQVuN57BN1iV-xPLA-6Xo', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'applications/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.idToken)
                    localStorage.setItem('email', data.email)
                    navigate('/')
                }
                else {
                    const data = await response.json();
                    let errroMessage = 'Authentication fails!';
                    if (data && data.error && data.error.message) {
                        errroMessage = data.error.message
                    }

                    throw new Error(errroMessage);
                }
            }
            else {

                if (password === confirmPassword) {
                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaCVXSzE0kTKrQVuN57BN1iV-xPLA-6Xo', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            returnSecureToken: true
                        }),
                        headers: {
                            'Content-Type': 'applications/json'
                        }
                    })
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                    }
                    else {
                        const data = await response.json();
                        let errroMessage = 'Authentication fails!';
                        if (data && data.error && data.error.message) {
                            errroMessage = data.error.message
                        }

                        throw new Error(errroMessage);
                    }

                }
                else {
                    setMisMatch(true)
                    setTimeout(() => {
                        setMisMatch(false)
                    }, 3000)
                }
            }
        }
        catch (error) {
            alert(error.message);
            console.log(error.message)
        }




        setPassword('');
        setconfirmPassword('');
    }


    const onLoginHandler = () => {
        setIsLogin((isLogin) => !isLogin)
    }


    return (
        <div> <div className='container auth' style={{ width: '40%' }}>
            <div className='text-center mt-2'>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                {!isLogin ? <h6>{misMatch && 'Password Mismatch!'}</h6> : ''}
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">𝗬𝗼𝘂𝗿 𝗘𝗺𝗮𝗶𝗹:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        className="form-control"
                        id="exampleInputPassword1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label"> 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱
                        :</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                </div>
                {!isLogin && <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Confirm 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱
                        :</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        type="password"
                        required
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                </div>}
                {isLogin && <div className='form-text mt-2' style={{ fontWeight: 'bold' }} id='emailHelp'>
                    <a>Forget password?</a>
                </div>}
                <div className='actions'>
                    {<button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending request....</p>}
                    <button
                        style={{ fontWeight: 'bold', color: 'white' }}
                        onClick={onLoginHandler}
                        type='button'
                        className='toggle'
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>

        </div></div>
    )
}

export default Login
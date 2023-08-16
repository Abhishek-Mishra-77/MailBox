import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react'
import NavBar from '../Header/NavBar';
import './Compose.css';




const Compose = () => {

  const editor = useRef(null)
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [composeText, setcomposeText] = useState('');





  const onSubmitHandler = async (e) => {
    e.preventDefault();


    const message = composeText.replace(/<[^>]*>/g, '');


    try {
      const response = await fetch('https://mailbox-53339-default-rtdb.firebaseio.com/sendMail.json', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          subject: subject,
          composeText: message,
        }),
        headers: {
          'Content-Type': 'applications/json'
        }
      })

      if (response.ok) {
        const data = await response.json();
        alert('Email SuccessFully Send!')
        console.log(data);
      }
      else {
        const data = await response.json();
        let errorMessage = 'Send Email fails!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage)
      }
    }
    catch (error) {
      console.log(error.message);
      alert(error.message)
    }


    try {
      const response = await fetch('https://mailbox-53339-default-rtdb.firebaseio.com/receiveEmail.json', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          subject: subject,
          composeText: message,
          check: true
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
        let errorMessage = 'Receive Email fails!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage)
      }
    }
    catch (error) {
      console.log(error.message);
      alert(error.message)
    }

    setEmail('')
    setSubject('')
    setcomposeText('')

  }




  return (
    <>
      <NavBar />
      <div className='container'>
        <div className='composeMain'>
          <div className='container'>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-5">
                <label htmlFor="exampleFormControlInput1" className="form-label emailHead">To
                </label>
                <span className='user'>
                  <img className='user-image' src='https://tse1.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&rs=1&c=1&qlt=95&w=120&h=120' alt='user' />
                  <span className='userMail'>slowdown07@gmail.com</span>
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control mt-3"
                  id="exampleFormControlInput1"
                  placeholder="Email" />
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  className="form-control mt-3"
                  id="exampleFormControlInput1"
                  placeholder="Subject" />
                <div>
                  <label htmlFor="exampleFormControlTextarea1" className="form-label"></label>
                  <JoditEditor
                    ref={editor}
                    value={composeText}
                    onChange={newContent => setcomposeText(newContent)}
                  />
                  <div className="form-floating mt-0">
                  </div>
                </div>
              </div>
              <hr />
              <div className='container'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                  <button type="submit" className="btn btn-primary">Send</button>
                  <div className="container">

                  </div>
                  <ion-icon name="trash-outline" className='remove'></ion-icon>
                </nav>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Compose
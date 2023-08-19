import React, { useEffect } from 'react';
import { messageActions } from '../../store/Unread';
import { useDispatch } from 'react-redux';

const UseFetch = (URL) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getEmail = async () => {
            try {
                const response = await fetch(URL, {
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
                        if (mailData[0].check === true || mailData[0].check === false) {
                            for (let i = 0; i < mailData.length; i++) {
                                if (mailData[i].check) {
                                    unreadMessageCount = unreadMessageCount + 1;
                                }
                            }
                            dispatch(messageActions.inboxEmails(mailData))
                            dispatch(messageActions.unreadMessage(unreadMessageCount))
                        }
                        else {
                            dispatch(messageActions.sendEmails(mailData))
                        }
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
        const myInterval = setInterval(getEmail, 4000);
    }, [URL])


}

export default UseFetch;
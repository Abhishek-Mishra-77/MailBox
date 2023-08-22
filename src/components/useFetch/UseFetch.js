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
                        const mailId = Object.keys(data)
                        if (mailData.length > 0 && mailData[0].check === true || mailData[0].check === false) {

                            for (let i = 0; i < mailData.length; i++) {
                                if (mailData[i].check) {
                                    unreadMessageCount = unreadMessageCount + 1;
                                }

                                const newObj = {
                                    composeText: mailData[i].composeText,
                                    emailFrom: mailData[i].emailFrom,
                                    subject: mailData[i].subject,
                                    id: mailId[i],
                                    check: mailData[i].check
                                }

                                dispatch(messageActions.inboxEmails(newObj))
                            }
                            dispatch(messageActions.unreadMessage(unreadMessageCount))
                        }
                        else {
                            if (mailData.length > 0) {
                                for (let i = 0; i < mailData.length; i++) {
                                    const newObj = {
                                        composeText: mailData[i].composeText,
                                        emailTo: mailData[i].emailTo,
                                        subject: mailData[i].subject,
                                        id: mailId[i]
                                    }
                                    dispatch(messageActions.sendEmails(newObj))
                                }
                            }
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
            }
        }
        getEmail()
        const myInterval = setInterval(getEmail, 10000);
    }, [URL])


}

export default UseFetch;
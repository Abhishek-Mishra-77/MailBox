import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    receiveMails: [],
    sendMails: [],
    messageCount: 0,
    visible: false,
    mailMessage: {},
    sendMessage: {},
};


const messageSlice = createSlice({
    name: 'unread',
    initialState: initialState,
    reducers: {
        visibility(state) {
            state.visible = !state.visible
        },
        unreadMessage(state, action) {
            state.messageCount = action.payload
        },
        mailDetail(state, action) {
            state.mailMessage = action.payload
        },
        sendDetail(state, action) {
            state.sendMessage = action.payload
        },
        inboxEmails(state, action) {
            const newObj = action.payload
            const existingEmail = state.receiveMails.find((email) => email.id === newObj.id)
            if (!existingEmail) {
                state.receiveMails.push({
                    composeText: newObj.composeText,
                    emailFrom: newObj.emailFrom,
                    subject: newObj.subject,
                    id: newObj.id,
                    check: newObj.check
                })
            }
            else {
                existingEmail.check = newObj.check
            }
        },
        removeInboxMail(state, action) {
            const id = action.payload
            state.receiveMails = state.receiveMails.filter((email) => email.id !== id)

        },
        sendEmails(state, action) {
            const newObj = action.payload
            const existingEmail = state.sendMails.find((email) => email.id === newObj.id)
            if (!existingEmail) {
                state.sendMails.push({
                    composeText: newObj.composeText,
                    emailTo: newObj.emailTo,
                    subject: newObj.subject,
                    id: newObj.id
                })
            }
        },
        removeSendMail(state, action) {
            const id = action.payload
            state.sendMails = state.sendMails.filter((email) => email.id !== id)
        },
    }
})


export const messageActions = messageSlice.actions;

export default messageSlice.reducer;


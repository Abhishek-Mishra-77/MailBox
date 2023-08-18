import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    receiveMails: [],
    sendMails: [],
    messageCount: 0,
    visible: false,
    mailMessage: {},
    sendMessage: {},
    checkForRemovedata: {},
    theme: false
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
            state.receiveMails = action.payload
        },
        sendEmails(state, action) {
            state.sendMails = action.payload
        },
        removeEmailHander(state, action) {
            state.checkForRemovedata = action.payload
        },
        mailTheme(state) {
            state.theme = !state.theme
        }
    }
})


export const messageActions = messageSlice.actions;

export default messageSlice.reducer;


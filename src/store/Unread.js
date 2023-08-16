import { createSlice } from "@reduxjs/toolkit";


const initialState = { receiveMails: [], messageCount: 0, visible: false, mailMessage: {} };

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
        allEmails(state, action) {
            state.receiveMails = action.payload
        }
    }
})


export const messageActions = messageSlice.actions;

export default messageSlice.reducer;


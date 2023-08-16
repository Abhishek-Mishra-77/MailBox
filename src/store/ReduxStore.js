import { configureStore } from '@reduxjs/toolkit';
import Unread from './Unread';


const store = configureStore({
    reducer: { Unread: Unread }
})

export default store;
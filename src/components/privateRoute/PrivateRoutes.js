import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {

    const cartCtx = useContext(ItemProvideContext);
    return cartCtx.isLoggegIn ? <Outlet /> : <Navigate to={'/inbox/inbox'} />

}

export default PrivateRoute
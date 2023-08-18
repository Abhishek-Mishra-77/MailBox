import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {

    const tokenId = localStorage.getItem('token');
    return tokenId ? <Outlet /> : <Navigate to={'/auth'} />

}

export default PrivateRoute
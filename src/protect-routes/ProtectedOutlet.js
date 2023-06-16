import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedOutlet(){
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'?true:false

    if(isLoggedIn){
        return <Outlet />
    }else{    
        return <Navigate to="/" />
    }
}
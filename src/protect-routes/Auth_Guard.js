import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function Auth_Guard(){
    const isToken = localStorage.getItem('token') != null?true:false

    if(isToken){
        return <Navigate to="/dashboard" />
        
    }else{    
        return <Outlet />
    }
}
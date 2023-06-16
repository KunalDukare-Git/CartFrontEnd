import {LOGIN,LOGOUT} from './auth.types'

export const userlogin=(data)=>{
    return {
        type:LOGIN,
        payload:data
    }
}

export const userlogout=()=>{
    return{
        type:LOGOUT,
        payload:null
    }
}
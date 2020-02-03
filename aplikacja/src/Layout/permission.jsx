import React from 'react'
import { Redirect } from 'react-router';

const Permission = props => {

    const currentUser = localStorage.getItem('token')
    const tokenExp = new Date(localStorage.getItem('expirationDate'))

    if(tokenExp <= new Date()){
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('email')
        return <Redirect to='/login' />
    }

    if(currentUser === null){
        return <Redirect to='/login' />
    }

    if(currentUser){
        return <Redirect to='/home'/>
    }

    return null
}

export default Permission
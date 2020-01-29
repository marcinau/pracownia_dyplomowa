import React from 'react'
import { Redirect } from 'react-router';

const Permission = props => {

    const currentUser = localStorage.getItem('token')
    const tokenExp = new Date(localStorage.getItem('expirationDate'))

    if(currentUser === null){
        return <Redirect to='/login' />
    }

    if(currentUser){
        return <Redirect to='/home'/>
    }

    if(tokenExp <= new Date()){
        return <Redirect to='/login' />
    }

    return null
}

export default Permission
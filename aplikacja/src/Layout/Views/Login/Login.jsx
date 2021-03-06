import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TextField} from '@material-ui/core'

import Mail from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock';


import * as authAction from '../../../store/action/auth'

import '../../Style/Login/Login.css'

const Login = props => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    
    const login = async() => {
           await dispatch(authAction.login(email,password))
    }

    if(token){
        props.history.push('/')
    }

    const keyDownHandler = (event) => {
        if (event.keyCode === 13) login();
      };
    
    return (
        <div className="LoginBody">
            <div className="LoginBacgkroundImage">k</div>
            <div className="LoginContainer">
                <div className="LoginTitle">Logowanie</div>
                <div className="LoginContent">
                    <div className='LoginForm'>
                    <div className="LoginInputs"><Mail/><TextField label='email' type='email' className="emailInput" onKeyDown={keyDownHandler} value={email} onChange={event => setEmail(event.target.value)}/></div>
                    <div className="LoginInputs"><LockIcon /><TextField label='password' type='password' className="emailInput" onKeyDown={keyDownHandler} value={password} onChange={event => setPassword(event.target.value)}/></div>
                    </div>
                    <button onClick={login} className='Button1'>Zaloguj</button>
                    <button onClick={()=> props.history.push('/register')} className='Button2'>Załóż konto</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
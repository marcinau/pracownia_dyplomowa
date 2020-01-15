import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TextField} from '@material-ui/core'

import Mail from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock';

import * as authAction from '../../../store/action/auth'

import '../../Style/Login/Login.css'

const Register = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const token = useSelector(state => state.auth.token);
    console.log(token)

    const dispatch = useDispatch();
    const singup = async() => {
        try {
            await dispatch(authAction.singup(email,password))
        }catch(err){
            console.log(err.errorResData)
        }
    }

    if(token){
        props.history.push('/')
    }

    const keyDownHandler = (event) => {
        if (event.keyCode === 13) singup();
      };

    return (
        <div className="LoginBody">
            <div className="LoginBacgkroundImage"></div>
            <div className="LoginContainer">
                <div className="LoginTitle">Rejestracja</div>
                <div className="LoginContent">
                    <div className='LoginForm'>
                    <div className="LoginInputs"><Mail/><TextField label='email' type='email' className="emailInput"  onKeyDown={keyDownHandler} value={email} onChange={event => setEmail(event.target.value)}/></div>
                    <div className="LoginInputs"><LockIcon /><TextField label='password' type='password' className="emailInput" onKeyDown={keyDownHandler} value={password} onChange={event => setPassword(event.target.value)}/></div>
                    </div>
                    <button onClick={singup} className='Button1'>Zarejestruj</button>
                    <button onClick={()=> props.history.push('/login')} className='Button2'>Wróć</button>
                </div>
            </div>
        </div>
    )
}


export default Register;
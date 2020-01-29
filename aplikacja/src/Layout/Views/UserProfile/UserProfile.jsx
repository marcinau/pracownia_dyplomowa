import React , {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import CreateIcon from '@material-ui/icons/Create';

import '../../Style/UserProfile/UserProfile.css'

const UserProfile = (props) => {

    const [user, setUser] = useState('')
    const [changedPassword, setChangedPassword] = useState('') 
    const [changepass, setChangePass] = useState(false)
    const tokenId = localStorage.getItem('token');

    const getUserInfo = async () => {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
        .then(response => {
            setUser(response.data.users[0])
            console.log(response.data.users[0])
        })
    }

    const changePassword = async() => {
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E', {
            idToken: tokenId, 
            password: changedPassword, 
            returnSecureToken: true
        })
        return (
            localStorage.removeItem('token'),
            localStorage.removeItem('expirationDate'),
            localStorage.removeItem('userId')
            //props.history.push('/login')
        )
    }

    useEffect(() => {
        getUserInfo()
    },[])

    let canSave = false
    
    if(changedPassword.length >= 6){
        canSave = true;
    }

    return (
        <div className='UserProfileContent'>
            <div className="UserProfileTitle">Panel Użytkownika</div>
            <div className='UserProfileBox'>
                <div><p>Email</p><div>{user.email}</div></div>
                <div><p>Password</p><div><input placeholder="*********" disabled={!changepass} value={changedPassword} type="password" onChange={event => setChangedPassword(event.target.value)}/><CreateIcon onClick={() => setChangePass(prevState=> !prevState)}/></div></div>
                <div className="UserProfileButton"><button disabled={!canSave} onClick={changePassword}>Zapisz zmiany</button></div>
            </div>
        </div>
    )
}

export default UserProfile
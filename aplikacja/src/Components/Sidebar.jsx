import React, {useEffect,useState} from 'react'
import {NavLink, Redirect, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'

import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountTreeIcon from '@material-ui/icons/AccountTree';



import * as authAction from '../store/action/auth'

import '../Layout/Style/Sidebar/Sidebar.css'

const SideBar = props => {

    const [userEmail, setUserEmail] = useState('')

    const tokenId = localStorage.getItem('token');

    const dispatch = useDispatch();

    const logout = async() => {
        await dispatch(authAction.logout())
        return <Redirect to='/login'/>
 }

 const getUserInfo = async () => {
    await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
    .then(response => {
        setUserEmail(response.data.users[0].email)
    })
}

useEffect(() => {
    getUserInfo()
},[])

let adminPanel;

if(userEmail === 'w@w.pl')
{
    adminPanel = <NavLink to='/admin_panel'><AccountTreeIcon />AdminPanel</NavLink>
}

    return (
        <div className='SideBarBox'>
            <div className="SideBarLogo"><div className="SideBarTitle"><NavLink to='/'>Planiki.pl</NavLink></div>
            <div className="SideBarUserLogoBox"> <div className="SideBarUserLogo">{userEmail.slice(0,1).toUpperCase()}</div><p>{userEmail}<Link to='/profile'><SettingsIcon/></Link></p></div>
            </div>
            <div className='SideBarOptions'>
                        {adminPanel}
                        <NavLink to="/allplans" ><FileCopyRoundedIcon/>Plany</NavLink>
                        <NavLink to="/userplans" ><DescriptionRoundedIcon/>Twoje Plany</NavLink>
                        <NavLink to="/add_plan" ><PostAddRoundedIcon/>Dodaj Plan</NavLink>
                        <NavLink to="/messages" ><EmailRoundedIcon/> Wiadomości</NavLink>
                        <NavLink to="/login" onClick={logout} ><PowerSettingsNewRoundedIcon/>Wyloguj</NavLink>
            </div>
        </div>
    )
}

export default SideBar
import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import * as authAction from '../store/action/auth'

import Search from '@material-ui/icons/Search'
import '../Layout/Style/NavBar/NavBar.css'

const NavBar = props => {

    const dispatch = useDispatch();

    const logout = async() => {
        await dispatch(authAction.logout())
        return <Redirect to='/login'/>
 }

    return (
        <div className='NavBarBox'>
         <DropdownButton title="Dropdown" >
                <Dropdown.Item href="#books">Books</Dropdown.Item>
                <Dropdown.Item href="#podcasts">Podcasts</Dropdown.Item>
                <Dropdown.Item href="#">Tech I Like</Dropdown.Item>
                <Dropdown.Item href="#">About me</Dropdown.Item>
                <Dropdown.Item href="#addBlog">Add a Blog</Dropdown.Item>
    </DropdownButton>
        </div>
    )
}

export default NavBar
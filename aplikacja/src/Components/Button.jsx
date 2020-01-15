import React from 'react'
import {Link} from 'react-router-dom'
import Add from '@material-ui/icons/AddCircleOutline'

import '../Layout/Style/Components/Button.css'

const NewButton = props => {
    return (
        <Link to={props.link}>
        <div className="ButtonContainer">
            <Add/> 
            <div>{props.children}</div>
        </div>
        </Link>
    )
}

export default NewButton
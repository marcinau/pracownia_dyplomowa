import React, {useEffect, useState} from 'react';
import {TextField} from '@material-ui/core'
import axios from 'axios'

import NewButton from '../../../Components/Button'

import '../../Style/NewPlan/NewPlan.css'


const NewPlan = props => {

    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const tokenId = localStorage.getItem('token');

    const getUserInfo = async () => {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
        .then(response => {
            setUserEmail(response.data.users[0].email)
        })
    }

    const sentPlan = async () => {
        console.log(desc)
        await axios.post(`https://rn-complete-guide-34060.firebaseio.com/products.json`, {
            description: desc,
            title: title,
            userId : tokenId,
            email: userEmail
        }).then(res=> {
            console.log(res)
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })
        
    }

    const typy = [
        {
            label: 'trening'
        },
        {
            label: 'dieta'
        }
    ]

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div className="Addnewplan">
            <div>dodaj plan</div>
            <div className="AddPlanForm">
            <div className="InputBox"><TextField label='Tytuł' className="TitleInput" value={title} onChange={event => setTitle(event.target.value)}/></div>
            {/* {<div className="InputBox"><TextField
            className="OptionInput"
            select
            label="Native select"
            helperText="Please select your currency"
        >
            {typy.map(option => (
            <option key={option.label} value={option.label}>
                {option.label}
            </option>
            ))}
        </TextField>} */}
        {/* </div> */}
        <div className="InputBox"><TextField multiline label="costam"  rows='10' className="DescriptionInput" value={desc} onChange={event => setDesc(event.target.value)}/></div>
        <div className="InputBox"><button onClick={sentPlan}>Dodaj plan</button></div>
      </div>
    </div>
    )
}

export default NewPlan;
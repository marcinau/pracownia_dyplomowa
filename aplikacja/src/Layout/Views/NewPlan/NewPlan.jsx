import React, {useEffect, useState} from 'react';
import {TextField} from '@material-ui/core'
import axios from 'axios'

import NewButton from '../../../Components/Button'

import '../../Style/NewPlan/NewPlan.css'


const NewPlan = props => {

    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [planType, setPlanType] = useState('Trening')
    const [userEmail, setUserEmail] = useState('')
    const [uploadImage, setUploadImage] = useState([])

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
            type: planType,
            userId : tokenId,
            email: userEmail,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rn-complete-guide-34060.appspot.com/o/45dff3c89bd8918b637fc214e532f4d4.png?alt=media'
        }).then(res=> {
            console.log(res)
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })
        
    }
    


    useEffect(() => {
        getUserInfo();

    }, [])

    return (
        <div className="Addnewplan">
            <div className="AddnewplanTitle">dodaj plan</div>
            <div className="AddPlanForm">
            <div className="InputBox"><TextField label='Tytuł' className="TitleInput" value={title} onChange={event => setTitle(event.target.value)}/></div>
            <div className="InputBox"> 
                <select  value={planType} onChange={event => setPlanType(event.target.value)}>
                    <option value='Trening'>Trening</option>
                    <option value='Dieta'>Dieta</option>
                </select>
            </div>
        <div className="InputBox"><TextField multiline label="costam"  rows='10' className="DescriptionInput" value={desc} onChange={event => setDesc(event.target.value)}/></div>
        <div className="InputBox InputImageBox">
            <label>+<input type="file" onChange={(event) => setUploadImage([...uploadImage , event.target.files[0]])}/></label>
            <label >+<input type="file" onChange={event => setUploadImage([...uploadImage , event.target.files[0]])}/></label>
            <label>+<input type="file" onChange={event => setUploadImage([...uploadImage ,event.target.files[0]])}/></label></div>
        <div className="InputBox"><button onClick={() => {sentPlan(); props.history.push('/userplans')}}>Dodaj plan</button></div>
      </div>
    </div>
    )
}

export default NewPlan;
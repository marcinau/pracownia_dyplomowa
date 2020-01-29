import React, {useEffect, useState} from 'react';
import {TextField} from '@material-ui/core'
import axios from 'axios'

import '../../Style/NewPlan/NewPlan.css'


const CreateMessages = props => {

    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [recieverEmail, setRecieverEmail] = useState('')
    const [usersEmail, setUsersEmail] = useState([])
    const [userEmail, setUserEmail] = useState('')

    const tokenId = localStorage.getItem('token');

    const getUserInfo = async () => {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
        .then(response => {
            setUserEmail(response.data.users[0].email)
        })
    }

    const getUsersInfo = async str => {
        const response = await axios.get('https://rn-complete-guide-34060.firebaseio.com/users.json?orderBy="user"&startAt="' + str + '"&endAt="' + str + '\uf8ff"')

        let users = []

        for(let key in response.data){
            const id =  key
            const email = response.data[key].user
            users.push({id ,email: email })
        }
        setUsersEmail(users)
    }

    const sentMessage = async () => {
        await axios.post(`https://rn-complete-guide-34060.firebaseio.com/messages.json`, {
            content: desc,
            sender: userEmail,
            reciever: recieverEmail,
            subiect: title
        }).then(res=> {
            console.log(res)
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })
        
    }


    useEffect(() => {
        getUserInfo();
        if(recieverEmail.length === 0){
            setUsersEmail([])
            return
        }
        getUsersInfo(recieverEmail);

    }, [recieverEmail])

    const error = (
    recieverEmail.length > 0 ? (usersEmail.find((item)=> item.email === recieverEmail) ? null : <div>Nie ma takiego mailu</div>) : null
    )

    let send = false
    const emailto = usersEmail.find((item)=> item.email === recieverEmail);
    if(emailto && title && desc)
    {
        send = true
    }


    return (
        <div className="Addnewplan">
            <div className="AddnewplanTitle">Napisz Wiadomość</div>
            <div className="AddNewMessage">
            <div className="InputBox"><TextField label='Tytuł' className="TitleInput" value={title} onChange={event => setTitle(event.target.value)}/></div>
            <div className="InputBox EmailInputBox"><TextField label='Podaj e-mail' className="TitleInput" value={recieverEmail} onChange={event => setRecieverEmail(event.target.value)}/>
            <div className="EmailHintBox">{usersEmail.map(item => <div key={item.email}>{item.email}</div>)}</div>
            {error}
            </div>
            <div className="InputBox"><TextField multiline label="Treść wiasomości"  rows='10' className="DescriptionInput" value={desc} onChange={event => setDesc(event.target.value)}/></div>
        <div className="InputBox"><button onClick={() => {sentMessage(); props.history.push('/')}} disabled={!send}>Wyślij wiadomość</button></div>
      </div>
    </div>
    )
}

export default CreateMessages;
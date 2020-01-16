import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

import '../../Style/Messages/Messages.css'

const Messages = props => {
    const [user, setUser] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [message, setMessage] = useState(0)
    const [loading, setLoading] = useState('load')

    const tokenId = localStorage.getItem('token');

    const getUserInfo =   async() => {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
        .then(response => {
            setUser(response.data.users[0].email)
            console.log(response.data.users[0].email)
            
        })
    }
    
    const getMessages =  useCallback(async () => {
        const response = await axios.get(`https://rn-complete-guide-34060.firebaseio.com/messages.json?orderBy="reciever"&equalTo=` + user)

        console.log(response.data)
        let messages = []

        for(let key in response.data){
            const id =  key
            const reciever = response.data[key].reciever
            const sender = response.data[key].sender
            const content = response.data[key].content;
            messages.push({id ,content: content, sender,reciever })
        }
        setAllMessages(messages)
        console.log(response.data)
},[])

useEffect(() => {
    setLoading('load')
    getUserInfo();
    getMessages().then(() => {setLoading('')})
}, [getMessages])

let msg;

    if(!loading && user){
        msg = allMessages ? <div className='Message'>{allMessages[message].content}</div> : null
    }

    

    return (
        <div className="MessageBox">
            Message box
            <Link to='/create_message'><div>Utwórz nową wiadomość</div></Link>
            <div className='MessageContainer'>
                <div className='AllMessagesBox'>
                    {allMessages.map( (item, index) => (<div className='Messages' key={item.id} onClick={() => setMessage(index)}>
                        <div className='Nickname'>{item.sender}</div>
                        <div className='Subiect'>{item.sender}</div>
                        <div className='Content'>{item.content}</div>
                    </div>))}
                </div>
                {msg}
            </div>
        </div>
    );
}

export default Messages
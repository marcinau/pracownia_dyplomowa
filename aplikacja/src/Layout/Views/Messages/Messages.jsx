import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';



import '../../Style/Messages/Messages.css'

const Messages = props => {
    const [allMessages, setAllMessages] = useState([])
    const [message, setMessage] = useState(0)
    const [loading, setLoading] = useState('load')

    const email = localStorage.getItem('email');

    
    const getMessages =  useCallback(async () => {
        const response = await axios.get(`https://rn-complete-guide-34060.firebaseio.com/messages.json?orderBy="reciever"&equalTo="${email}"`)

        console.log(response.data)
        let messages = []

        for(let key in response.data){
            const id =  key
            const reciever = response.data[key].reciever
            const sender = response.data[key].sender
            const content = response.data[key].content;
            const title = response.data[key].subiect
            messages.push({id ,content: content, sender,reciever,title })
        }
        setAllMessages(messages)
        console.log(response.data)
},[])

useEffect(() => {
    setLoading('load')
    getMessages().then(() => {setLoading('')})
}, [getMessages])

console.log(allMessages)


    

    return (
        <div className="MessageBox">
            <p>Message box</p>
            <Link to='/create_message'><div>Utwórz nową wiadomość</div></Link>
            <div className='MessageContainer'>
                <div className='AllMessagesBox'>
                    {allMessages.map( (item, index) => (<div className='Messages' key={item.id} onClick={() => setMessage(index)}>
                        <div className='Nickname'>{item.sender}</div>
                        <div className='Subiect'>{item.title}</div>
                        <div className='Content'>{item.content}</div>
                    </div>))}
                </div>
                { allMessages[message] ?
                 (<div className="UserMessageBox">
                <div>
                <div className="Messageusernickname">
                <p>{allMessages[message].sender}</p>
                <div className='Message'>{allMessages[message].content}</div>
                </div>
                <div className="Pomoc">
                <div className="MessageusernicknameYour">
                <p>w@w.pl</p>
                <div className='MessageYour'>Oczywiście prosze powiedzieć czego pan używa</div>
                </div>
                </div>
                </div>
                <div className="Replymessage"><input type="text" placeholder="Odpowiedz"/><div className="SendMail"><SendIcon/></div></div>
                </div>):
                
                null
                }
            </div>
        </div>
    );
}

export default Messages
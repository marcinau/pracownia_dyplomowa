import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';



import '../../Style/Messages/Messages.css'

const Messages = props => {
    const [allMessages, setAllMessages] = useState([])
    const [message, setMessage] = useState(0)
    const [desc, setDesc] = useState('')

    const email = localStorage.getItem('email');

    
    const getMessages =  async () => {
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
}

const getYorMessages =  async () => {
    const response = await axios.get(`https://rn-complete-guide-34060.firebaseio.com/messages.json?orderBy="sender"&equalTo="${email}"`)

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
    await getMessages()
    setAllMessages(...allMessages, messages)
}

const sendReplay = async (id) => {
    await axios.post(`https://rn-complete-guide-34060.firebaseio.com/messages/${id}/content/response.json`, {
                desc,
                sender: email
            })
}


useEffect(() => {
    getYorMessages()
}, [])

console.log(allMessages)
const odp = allMessages.length == 0 ? [] : Object.keys(allMessages[message].content.response || {}).map(key => allMessages[message].content.response[key])  



    return (
        <div className="MessageBox">
            <p>Message box</p>
            <Link to='/create_message'><div>Utwórz nową wiadomość</div></Link>
            <div className='MessageContainer'>
                <div className='AllMessagesBox'>
                    {allMessages.map( (item, index) => (<div className='Messages' key={item.id} onClick={() => setMessage(index)}>
                        <div className='Nickname'>{item.sender}</div>
                        <div className='Subiect'>{item.title}</div>
                        <div className='Content'>{item.content.desc}</div>
                    </div>))}
                </div>
                { allMessages[message] ?
                 (<div className="UserMessageBox">
                <div className="Wszystkiewiadomosci">
                {allMessages[message].content.sender !== email ?   (<div className="Messageusernickname">
                            <p>{allMessages[message].content.sender}</p>
                            <div className='Message'>{allMessages[message].content.desc}</div>
                        </div>):
                    (<div className="Pomoc">
                        <div className="MessageusernicknameYour">
                        <p>
                            {allMessages[message].content.sender}
                        </p>
                        <div className='MessageYour'>{allMessages[message].content.desc}</div>
                        </div>
                        </div>)}
                {odp.map(item =>
                item.sender === email ? 
                (<div className="Pomoc">
                <div className="MessageusernicknameYour">
                <p>
                    {item.sender}
                </p>
                <div className='MessageYour'>{item.desc}</div>
                </div>
                </div>): <div className="Messageusernickname">
                <p>{item.sender}</p>
                <div className='Message'>{item.desc}</div>
                </div>)}
                </div>
                <div className="Replymessage"><input type="text" placeholder="Odpowiedz" value={desc} onChange={event => setDesc(event.target.value)} /><div className="SendMail"><SendIcon onClick={() => {sendReplay(allMessages[message].id);  window.location.assign(true)}}/></div></div>
                </div>):
                
                null
                }
            </div>
        </div>
    );
}

export default Messages
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

import '../../Style/Messages/Messages.css'

const Messages = props => {
    const [plans, setPlans] = useState([])
    const [message, setMessage] = useState(0)
    const [loading, setLoading] = useState('load')


    
const getPlan =  useCallback(async () => {
    const response = await axios.get('https://rn-complete-guide-34060.firebaseio.com/products.json')


        let plan = []

        for(let key in response.data){
            const id =  key
            const desc = response.data[key].description
            const price = response.data[key].price
            const name = response.data[key].title;
            plan.push({id ,description: desc, price: price, name: name })
        }
        setPlans(plan)
        console.log(response.data)
        console.log(plan)
},[])

useEffect(() => {
    setLoading('load')
    getPlan().then(() => {setLoading('')})
}, [getPlan])

let msg;


    if(!loading){
        msg = <div className='Message'>{plans[message].description}</div>
    }
    

    return (
        <div className="MessageBox">
            Message box
            <Link to='/create_message'><div>Utwórz nową wiadomość</div></Link>
            <div className='MessageContainer'>
                <div className='AllMessagesBox'>
                    {plans.map( (item, index) => (<div className='Messages' key={item.id} onClick={() => setMessage(index)}>
                        <div className='Nickname'>{item.name}</div>
                        <div className='Subiect'>{item.name}</div>
                        <div className='Content'>{item.description}</div>
                    </div>))}
                </div>
                {msg}
            </div>
        </div>
    );
}

export default Messages
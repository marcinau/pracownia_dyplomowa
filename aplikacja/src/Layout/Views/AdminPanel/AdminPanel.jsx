import React, {useState, useEffect} from 'react';
import { Tabs, Tab } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios'

import '../../Style/AdminPanel/AdminPanel.css'

const AdminPanel = props => {
    
    const [usersEmail, setUsersEmail] = useState([])
    const [plans, setPlans] = useState([])
    const [option, setOption] = useState(true)


    
    const getPlan = async () => {
        const response = await axios.get('https://rn-complete-guide-34060.firebaseio.com/products.json')
    
            let plan = []
    
            for(let key in response.data){
                const id =  key
                const desc = response.data[key].description
                const price = response.data[key].price
                const name = response.data[key].title;
                const type = response.data[key].type;
                const image = response.data[key].imageUrl;
                plan.push({id ,description: desc, price: price, name: name, type, image})
            }
            setPlans(plan)
            console.log(response.data)
    }
        
    
    const getUserInfo = async () => {
        const response = await axios.get('https://rn-complete-guide-34060.firebaseio.com/users.json')
        let users = []

        for(let key in response.data){
            const email = response.data[key].user
            const userId = response.data[key].userToken
            users.push({userId ,email })
        }
        setUsersEmail(users)
    }

    const deleteUser = async (userId) => {
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E', {idToken: userId})
    }

    useEffect(() => {
        getPlan();
        getUserInfo(); 
    },[])

    return (
        <div className="AdminPanelBox">
        <div className="AdminPanelTitle">Panel Administracyjny</div>
        <div className="TabsForPanelAdmin"><div className={option ? 'activeTab' : null} onClick={() => setOption(true)}>Użytkownicy</div><div className={!option ? 'activeTab' : null} onClick={() => setOption(false)}>Plany</div></div>
        <div className="AdminPanelContent">
        {option ? usersEmail.map(item => <div key={item.email} className='AdminPanelUsersMap' ><div className="UserEmail">{item.email}</div><div className="DeleteUser"><DeleteForeverIcon onClick={() => {deleteUser(item.userId)}}/></div></div>) 
        : 
        plans.map(item => <div key={item.id}>{item.name}</div>)}
        </div>
        </div>
    )
}

export default AdminPanel;
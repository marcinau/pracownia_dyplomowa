import React , {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

import '../../Style/AllPlans/AllPlans.css'
import { display } from '@material-ui/system';


const UserPlans = () => {
    const [desc, setDesc] = useState('')
    // const [price, setPrice] = useState('')
    const [title, setTitle] = useState('')
    const [plans, setPlans] = useState([])

    const tokenId = localStorage.getItem('token');
    
const getPlan = async () => {
    const response = await axios.get(`https://rn-complete-guide-34060.firebaseio.com/products.json?orderBy="userId"&equalTo="${tokenId}"`)

        let plan = []

        for(let key in response.data){
            const id =  key
            const desc = response.data[key].description
            const price = response.data[key].price
            const name = response.data[key].title;
            const userId = response.data[key].userId;
            plan.push({id ,description: desc, price: price, name: name, userId })
        }
        setPlans(plan)
        console.log(response.data)
}

useEffect(() => {
    getPlan()
}, [])



return (
    <div className="AllPlansContainer">
        <div className='AllPlansBox'>
            <p>Wszystkie plany</p>
            {plans.map(item =>  
                <Link key={item.id} to={`/plan/${item.id}`}> 
                    <div key={item.id} className='SinglePlan' >
                        <div className="AllPlansTitle">{item.name}</div> 
                        <div className="AllPlansType">typ: {item.name}</div>
                        <div className="AllPlansDesc">{item.description}</div> 
                    </div>
                </Link>)}
        </div>
    </div>
 )
}

export default UserPlans;
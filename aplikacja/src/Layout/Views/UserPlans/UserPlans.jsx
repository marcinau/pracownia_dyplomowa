import React , {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SearchIcon from '@material-ui/icons/Search';

import '../../Style/AllPlans/AllPlans.css'
import { display } from '@material-ui/system';


const UserPlans = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState('load')
    const [searchPlan, setSearchPlan] = useState([])

    const email = localStorage.getItem('email');

    
const getPlan = useCallback(async () => {
    const response = await axios.get(`https://rn-complete-guide-34060.firebaseio.com/plans.json?orderBy="email"&equalTo="${email}"`)

        let plan = []

        for(let key in response.data){
            const id =  key
            const desc = response.data[key].description
            const price = response.data[key].price
            const name = response.data[key].title;
            const userId = response.data[key].userId;
            const type = response.data[key].type;
            const image = response.data[key].imageUrl;
            plan.push({id ,description: desc, price: price, name: name, userId, type, image })
        }
        setPlans(plan)
        console.log(response.data)
        console.log(plan)
},[])

useEffect(() => {
    setLoading('load')
    getPlan().then((() => {setLoading('')}))
}, [getPlan])

let filterPlan = plans.filter(item => {return item.name.toLowerCase().indexOf(searchPlan) !== -1} )



return (
    <div className="AllPlansContainer">
    <div className='AllPlansBox'>
    <p>Twoje plany</p>
    <div className="AllPlansSearchBox"><input type='text' placeholder="Wyszukaj planu" value={searchPlan} onChange={event => setSearchPlan(event.target.value)}/><div className="SearchButton"><SearchIcon/></div></div>
    {searchPlan.length === 0 ?  plans.map(item =>  
        <Link key={item.id} to={`/plan/${item.id}`}> 
            <div key={item.id} className='SinglePlan' >
                <div className="AllPlansTitle">{item.name} <DeleteForeverIcon/></div> 
                <div className="AllPlansType">typ: {item.type}</div>
                <div className="AllPlansImage"><img src={item.image} alt="image"/></div>
                <div className="AllPlansDesc">{item.description}</div> 
            </div>
        </Link>) : 
        filterPlan.map(item =>  
        <Link key={item.id} to={`/plan/${item.id}`}> 
            <div key={item.id} className='SinglePlan' >
                <div className="AllPlansTitle">{item.name} <DeleteForeverIcon/></div> 
                <div className="AllPlansType">typ: {item.type}</div>
                <div className="AllPlansImage"><img src={item.image} alt="image"/></div>
                <div className="AllPlansDesc">{item.description}</div> 
            </div>
        </Link>)}
    </div>
    </div>
 )
}

export default UserPlans;
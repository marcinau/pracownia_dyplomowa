import React , {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';



import '../../Style/AllPlans/AllPlans.css'


const AllPlans = () => {
    const [plans, setPlans] = useState([])
    const [searchPlan, setSearchPlan] = useState([])


    
const getPlan = async () => {
    const response = await axios.get('https://pracainz-473cb.firebaseio.com/plans.json')

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

useEffect(() => {
    getPlan()

}, [])

let filterPlan = plans.filter(item => {return item.name.toLowerCase().indexOf(searchPlan) !== -1} )


return (
    <div className="AllPlansContainer">
        <div className='AllPlansBox'>
            <p>Wszystkie plany</p>
            <div className="AllPlansSearchBox"><input type='text' placeholder="Wyszukaj planu" value={searchPlan} onChange={event => setSearchPlan(event.target.value)}/><div className="SearchButton"><SearchIcon/></div></div>
            {searchPlan.length === 0 ? plans.map(item => 
                    <div key={item.id} className='SinglePlan'>
                        <div className="AllPlansTitle">{item.name}</div>
                        <Link key={item.id} to={`/plan/${item.id}`}> 
                        <div className="AllPlansType">typ: {item.type}</div>
                        <div className="AllPlansImage"><img src={item.image} alt="image"/></div>
                        <div className="AllPlansDesc">{item.description}</div> 
                        </Link>
                    </div>):
                filterPlan.map(item => 
                        <div key={item.id} className='SinglePlan'>
                            <div className="AllPlansTitle">{item.name}</div> 
                            <Link key={item.id} to={`/plan/${item.id}`}> 
                            <div className="AllPlansType">typ: {item.type}</div>
                            <div className="AllPlansImage"><img src={item.image} alt="image"/></div>
                            <div className="AllPlansDesc">{item.description}</div> 
                            </Link>
                        </div> )
            }
        </div>
    </div>
 )
}

export default AllPlans;
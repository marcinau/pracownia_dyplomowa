import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';

import * as plancActions from '../../../store/action/plans' 

import '../../Style/MainPage/MainPage.css'
import NewButton from '../../../Components/Button'
 

const MainPage = () => {

    const [desc, setDesc] = useState('')
    // const [price, setPrice] = useState('')
    const [title, setTitle] = useState('')
    const [plans, setPlans] = useState([])
    const [cos, setCos] = useState([])

    const dispatch = useDispatch();
    const plany = useSelector(state => state.allplans.availablePlans);



    const getInfo = async () => {
        const response = await axios.get('https://rn-complete-guide-34060.firebaseio.com/products.json')

            let plan = []

            for(let key in response.data){
                const id =  key
                const desc = response.data[key].description
                const price = response.data[key].price
                const name = response.data[key].title
                plan.push({id ,description: desc, price: price, name: name })
            }
            setPlans(plan)
            console.log(response.data)
    }

    const sentPlan = async () => {
        console.log(desc)
        await axios.post(`https://rn-complete-guide-34060.firebaseio.com/products.json`, {
            description: desc,
            title: title
        }).then(res=> {
            console.log(res)
            console.log(res.data)
        })
        
    }

    const sentComent = async (id) => {
        const response = await axios.post(`https://rn-complete-guide-34060.firebaseio.com/products/${id}/comments.json`, {
            coment: 'elko'
        })
        console.log(id)
        console.log(response.data)

    }

    const DeletePlanHandler =useCallback (async (id) => {
        await axios.delete(`https://rn-complete-guide-34060.firebaseio.com/products/${id}.json`)
        
    },[])

    const costam = () => {
        console.log(cos)
    }



    useEffect(() => {
        getInfo()
        DeletePlanHandler()
    }, [])

    return (
        <div className="MainPageContent">
            <div className="MainPageCardContainer">
                <Link to="/allplans"><div className="MainPageCards"><FileCopyRoundedIcon/><p>Plany</p></div></Link>
                <Link to="/userplans"><div className="MainPageCards"><DescriptionRoundedIcon/><p>Twoje Plany</p></div></Link>
            </div>
            <div className="MainPageCardContainer">
                <Link to="/add_plan" ><div className="MainPageCards"><PostAddRoundedIcon/><p>Dodaj Plan</p></div></Link>
                <Link to="/messages"><div className="MainPageCards"><EmailRoundedIcon/><p>Wiadomosci</p></div></Link>
            </div>
        </div>
    )
}


{/* <div className='NavigationContainer'>
Navigation
</div>
<div className='PlansContainer'>
<div className='AllPlansContainer'>
{plans.map(item => <Link key={item.id} to={`/plan/${item.id}`}> <div key={item.id} className='SinglePlan'>{item.id} {item.description}, {item.price}, {item.name}</div></Link>)}
</div>
<div className="YourPlansContainer">
    <div className='FavPlansContainer'>
        FavPlans
    </div>
    <div className='AddPlansContainer'>
        <div>Add Plans</div>
        <div className="AddButton"><NewButton link="/add_plan" onClick={() => (console.log('siema'))}>Dodaj Plan</NewButton></div>
    </div> 
</div>
</div>     */}
// {plans.map(item => <div key={item.id} onClick={() => sentComent(item.id)}>{item.id} {item.description}, {item.price}, {item.name} <span style= {{cursor: 'pointer'}}onClick={() => DeletePlanHandler(item.id)}>X</span></div>)}
            
//             <input type="text" name='title' placeholder="contetnt" vlaue={title} onChange={event => setTitle(event.target.value)}/>
//             <input type="text" name='description' placeholder="contetnt" vlaue={desc} onChange={event => setDesc(event.target.value)}/>
//             <button onClick={sentPlan}>kliknij</button> 

// onClick={() => sentComent(item.id)}

export default MainPage;
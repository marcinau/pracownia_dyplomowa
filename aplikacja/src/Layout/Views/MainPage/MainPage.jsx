import React, {useState, useEffect} from 'react';
import axios from 'axios'

const MainPage = () => {

    // const [desc, setDesc] = useState('')
    // const [price, setPrice] = useState('')
    // const [name, setName] = useState('')
    const [plans, setPlans] = useState([])

    const getInfo = async () => {
        const result = await axios.get('https://rn-complete-guide-34060.firebaseio.com/products.json')

            let plan = []

            for(let key in result.data){
                const desc = result.data[key].description
                const price = result.data[key].price
                const name = result.data[key].title
                plan.push({description: desc, price: price, name: name })
            }

            setPlans(plan)

    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <div>

            {plans.map(item => <div key={item.name}>{item.description}, {item.price}, {item.name}</div>)}
        </div>
    )
}

export default MainPage;
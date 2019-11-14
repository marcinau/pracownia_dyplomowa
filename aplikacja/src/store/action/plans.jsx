import Plans from '../../models/plans'
import axios from 'axios'

export const GET_PLANS = 'GET_PLANS'

export const fetchPlans = () => {
    return async dispatch => {
        const result = await axios.get('https://rn-complete-guide-34060.firebaseio.com/products.json')
        const resData = await result.json();
        const loadedPlans = []

        for(let key in result.data){
            loadedPlans.push(new Plans(key, resData[key].description, resData[key].price, resData[key].title))
        }

        dispatch({type: GET_PLANS, plans: loadedPlans})
    }
}


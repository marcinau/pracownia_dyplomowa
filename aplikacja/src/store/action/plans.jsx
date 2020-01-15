import Plans from '../../models/plans'
import axios from 'axios'

export const GET_PLANS = 'GET_PLANS'

export const fetchPlans = () => {
    return async dispatch => {
        axios.get('https://rn-complete-guide-34060.firebaseio.com/products.json')
        .then(resData => {
        let loadedPlans = []
        for(let key in resData.data){
            loadedPlans.push(new Plans(key, resData.data[key].description, resData.data[key].price, resData.data[key].title))
        }
        dispatch({type: GET_PLANS, allplans: loadedPlans})
        })

    }
}




import Plans from '../../models/plans'
import { GET_PLANS } from '../action/plans';

const initialState = {
    availablePlans: {}
}

const reducer =  (state = initialState, action) => {
    switch(action.type){
      case GET_PLANS:
      return{
            availablePlans: action.allplans
      }  
    }
    return state;
}

export default reducer;
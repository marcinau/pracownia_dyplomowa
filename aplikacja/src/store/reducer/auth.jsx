
import {AUTH_SUCCESS, AUTH_LOGOUT} from '../action/auth'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authSuccess = (state, action) => {
    return {
        ...state,  
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    } 
};

const authLogout = (state, action) => {
    return {...state,  token: null, userId: null }
};

const reducer =  (state = initialState, action) => {
    switch(action.type){
         case AUTH_SUCCESS: return authSuccess(state, action);
         case AUTH_LOGOUT: return authLogout(state, action);
         default:
            return state;   
    }
}


export default reducer;
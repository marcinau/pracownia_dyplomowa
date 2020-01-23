import axios from 'axios'

export const SINGUP = 'SINGUP'
export const AUTH_FAIL='AUTH_FAIL'
export const LOGIN = "LOGIN"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const authFail = (error) => {
    return{
        type: AUTH_FAIL,
        error: error
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};

export const singup = (email, password) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
            };

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E', authData)
        .then(response => {
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            axios.post('https://rn-complete-guide-34060.firebaseio.com/users.json', {
                user: response.data.email,
                userToken: response.data.idToken
            })
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(error => {
            console.log(error)
            const errorResData = error.response.data.error.message;
            alert(errorResData)
        })
        
    }
}

export const login = (email, password, props)=> {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
            };

       axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E', authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(error => {
            const errorResData = error.response.data.error.message;
            alert(errorResData)
        })
        
    }
}

export const getUserInfo = (tokenId) => {
    return async dispatch => {
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
    .then(response => {
        console.log(response)
    })
}
}

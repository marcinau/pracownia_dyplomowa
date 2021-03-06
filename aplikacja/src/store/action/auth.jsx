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

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email')
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

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJlos2uT5xr25sp6nO23lmMqomy5D_wUI', authData)
        .then(response => {
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            axios.post('https://pracainz-473cb.firebaseio.com/users.json', {
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

       axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJlos2uT5xr25sp6nO23lmMqomy5D_wUI', authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('email', response.data.email)
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
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBJlos2uT5xr25sp6nO23lmMqomy5D_wUI`, {idToken: tokenId})
    .then(response => {
        console.log(response)
    })
}
}

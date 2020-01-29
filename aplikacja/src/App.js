import React from 'react';
import './App.css';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import {useDispatch, useSelector} from 'react-redux'

import Login from './Layout/Views/Login/Login'
import Register from './Layout/Views/Register/Register'
import Layout from './Layout/Layout';
import Permission from './Layout/permission'

import plansReducer from './store/reducer/plans'
import authReducer from './store/reducer/auth'


const rootReducer = combineReducers({
  allplans: plansReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

function App() {

  
  return (
    <div className="App">
    <Provider store = {store} >
    <Permission />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login'  component={Login} />
        <Route path='/' component={Layout} />
      </Switch>
      </Provider>
    </div>
  )
}

export default App;

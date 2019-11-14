import React from 'react';
import './App.css';
import {createStore, combineReducers} from 'react'
import { Provider } from 'react-redux'

import Login from './Layout/Views/Login/Login'
import MainPage from './Layout/Views/MainPage/MainPage'

import plansReducer from './store/reducer/plans'

// const rootReducer = combineReducers({
//   plans: plansReducer
// })

// const store = createStore(rootReducer)

function App() {
  return (
    <div className="App">
      <MainPage/>
    </div>

  );
}

export default App;

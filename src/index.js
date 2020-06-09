import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

// spotify 
let initialSpotify = {
  spotifyList: []
}

let spotifyReducer = (state = initialSpotify, action) => {
  switch (action.type) {
    case "SET_SPOTIFY": return {spotifyList: action.payload}
    default: return state
  }
}

// user


let initialUserState = {
  id: 0,
  name: "",
  status: "",
  image: "",
  token: "",
  activities: []
}

let userReducer = (state = initialUserState, action) => {
  switch(action.type) {
    case "SET_USER_INFO":
      // console.log(state)
      return {
      ...state,
      id: action.payload.user.id,
      name: action.payload.user.name,
      status: action.payload.user.status,
      image: action.payload.user.image,
      token: action.payload.token,
      activities: action.payload.user.activities
    }
    default: return state
  }
}

let combinedReducers = {
  spotifyInfo: spotifyReducer,
  userInformation: userReducer
}

let rootReducer = combineReducers(combinedReducers)

let storeObj = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={storeObj}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>

  ,document.getElementById('root')
);






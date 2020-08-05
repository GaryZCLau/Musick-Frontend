import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

// spotify 
let initialSpotifyState = {
  spotifyList: [],
  currentPlaying: [
  {track: {
            album: {images: [{}, {height: 0, url: "", width: 0}, ]}, name: "", preview_url: "", artists: [{name: ""}]
          }
  }
  ]
}

let spotifyReducer = (state = initialSpotifyState, action) => {
  switch (action.type) {
    case "SET_SPOTIFY": 
      return {...state, spotifyList: action.payload}

    case "SET_RANDOM_SONGS": 
    function shuffle(o){ 
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;}
    let randomSongList = shuffle([...state.spotifyList])
    .slice(0,8)
    // let randomSongList = state.spotifyList.slice(0,5)
    // logic for random amont of song ^
      return {...state, currentPlaying: randomSongList}

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

    case "DELETE_ACT":
      return {
        ...state, activities: state.activities.filter((singleAct) => {
          return singleAct.id !== action.payload.id
        })
      }

    case "ADD_ACT":
      return {
        ...state, activities: [...state.activities, action.payload]
      }

      case "UPDATE_IMG":
        return {
          ...state, image: action.payload.image
        }

      case "UPDATE_STATUS": 
        return {
          ...state, status: action.payload.status
        }

      case "SIGN_OUT":
        return {
          ...state, 
          id: 0,
          name: "",
          status: "",
          image: "",
          token: "",
          activities: []
        }

    default: return state
  }
}

let combinedReducers = {
  spotify: spotifyReducer,
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






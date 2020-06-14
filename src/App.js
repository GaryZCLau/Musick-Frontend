import React from 'react'
import './App.css'
import NavBar from './NavBar'
// import Sound from 'react-sound'
import Home from './Home'
import Profile from './Profile'
import GameContainer from './GameContainer.jsx'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class App extends React.Component {

  componentDidMount(){
   
    if (localStorage.token) {
      fetch("http://localhost:3000/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }

    fetch('https://api.spotify.com/v1/playlists/08Lsn1W8n4HgJK5HsLZVlz/tracks', {
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer BQALA7zHQpNtnJmrMJlHHRj80cm6fuH5rTExQDoTPAEBeJkgA74ZO14EGZ2M5RPCZZOfsPuSsssj5LuVwCeqmElhMg8ZNlgaHfim_f-IAvDbhtrHm7gkRfmDkLoR31oxbI-Op9q9LQLRiXNlx9HPsIs3MQCWPw0Y&refresh_token=AQA2dLD4w0oK7Ja7vsjI6ZkrXb8630AJZku3RC4pK8SIDBewPtZ5Nj8caTOME415nD-fJgxfZ3mkVbnBdZDBuZaHuI9-N11NAT5bB0HnT3Po5Tqn3abylPZMMSE_wpmtULI"
      }
    }).then(r=>r.json()).then((playlistObj) => {
      this.props.setSpotify(playlistObj.items)
      // console.log(playlistObj.items)
    })
  }

  handleLogin = (loginState) => {
    console.log("Login form has been submitted")
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(loginState)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }


  handleRegister = (registerState) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: registerState.name,
        password: registerState.password,
        image: "https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png",
        status: "Update your status!"
      })
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleResponse = (resp) => {
    localStorage.token = resp.token
    this.props.setUserInfo(resp)
    // console.log(resp)
    this.props.history.push("/profile")
  }

  renderProfile = (routerProps) => {
    if (this.props.token) {
      return <Profile deleteActivity={this.deleteActivity}/>
    } else {
      this.props.history.push("/home")
    }
  }

  deleteActivity = (actId) => {
    fetch(`http://localhost:3000/activities/${actId}`, {
      method: "DELETE"
    }).then(r => r.json())
    .then((deletedAct) => {
      this.props.deleteAct(deletedAct)
    })
  }

  renderHome = () => {
    if (this.props.token) {
      this.props.history.push("/profile")
    } else {
      return <Home handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
    }
  }

  renderGame = () => {
    if (this.props.token) {
      return <GameContainer handleActSubmit={this.handleActSubmit}/>
    } else {
      this.props.history.push("/home")
    }
  }

  handleActSubmit = (songTitle) => {
    let userId = this.props.id
    fetch("http://localhost:3000/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: songTitle,
        user_id: userId
      })
    }).then(r=>r.json())
    .then((newAct) => {
      this.props.newAct(newAct)
    })
  }

  render(){
    // this.url = "https://p.scdn.co/mp3-preview/4d48b1d0d39b2710df6893c6a994013e9f8eee37?cid=8fcacfb4144f4d239cd08a0ad79df707";
    // this.audio = new Audio(this.url)
    // this.audio.play()
    // console.log(this.props)
    return (
      <div className="App">
        <NavBar/>
        {/* <Sound url="https://p.scdn.co/mp3-preview/4d48b1d0d39b2710df6893c6a994013e9f8eee37?cid=8fcacfb4144f4d239cd08a0ad79df707" volume="10" playStatus="PLAYING"/> */}
        {/* <iframe src="https://p.scdn.co/mp3-preview/4d48b1d0d39b2710df6893c6a994013e9f8eee37?cid=8fcacfb4144f4d239cd08a0ad79df707" title="song"></iframe> */}
        <Switch>
          <Route path="/home" render={this.renderHome}/>
          <Route path="/game" render={this.renderGame}/>
          <Route path="/profile" render = {this.renderProfile}/>
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    )
  }
}

let setUserInfo = (resp) => {
  return {
    type: "SET_USER_INFO",
    payload: resp
  }
}

let setSpotify = (resp) => {
  return {
    type: "SET_SPOTIFY",
    payload: resp
  }
}

let deleteAct = (deletedAct) => {
  return {
    type: "DELETE_ACT",
    payload: deletedAct
  }
}

let newAct = (createdAct) => {
  return {
    type: "ADD_ACT",
    payload: createdAct
  }
}

let mapStateToProps = (globalState) => {
  return {
    token: globalState.userInformation.token,
    id: globalState.userInformation.id
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo,
  setSpotify: setSpotify,
  deleteAct: deleteAct,
  newAct: newAct
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

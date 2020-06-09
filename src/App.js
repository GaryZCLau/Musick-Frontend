import React from 'react'
import './App.css'
import NavBar from './NavBar'
import Sound from 'react-sound'
import Home from './Home'
import Profile from './Profile'
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
        "Authorization": "Bearer BQBJrUVyo-tZcBUYT058qrqRl-_PesefYNJVsM5cDLoRg28R-Mrk8FG0VUEtwN8U-z0OzMEQjyZ0WdKuGhCULkaTpNPmweyQrEe0j2RczKKpqaiAO7te_NQI81cWuF5YdxOGKtln7IznKXGtkRKqdCzxFDaNW2JN&refresh_token=AQBDMSL1caw1fKOvYFikknKOQKE-_ZsaR2cVJ9E6m29-VSRzlvN7qvJKS3kwKZzrtRCoqDb80pfC8dtaBLopuvtn4XgDjAiKQu54VGscl3ftrZ_gy6d3ScWH2Y0kA0kUgao"
      }
    }).then(r=>r.json()).then((playlistObj) => {
      console.log(playlistObj.items[0].track)
      // .items.map((obj) => {console.log(obj.track)})
      // console.log(playlistObj.items)
      // console.log(playlistObj.items[0].track)
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
        image: "",
        status: ""
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
      return <Profile />
    } else {
      this.props.history.push("/home")
    }
  }

  render(){
    // this.url = "https://p.scdn.co/mp3-preview/4d48b1d0d39b2710df6893c6a994013e9f8eee37?cid=8fcacfb4144f4d239cd08a0ad79df707";
    // this.audio = new Audio(this.url)
    // this.audio.play()
    return (
      <div className="App">
        <NavBar/>
        {/* <Sound url="https://p.scdn.co/mp3-preview/4d48b1d0d39b2710df6893c6a994013e9f8eee37?cid=8fcacfb4144f4d239cd08a0ad79df707" volume="10" playStatus="PLAYING"/> */}
        {/* <iframe src="https://p.scdn.co/mp3-preview/4d48b1d0d39b2710df6893c6a994013e9f8eee37?cid=8fcacfb4144f4d239cd08a0ad79df707" title="song"></iframe> */}
        <Switch>
          <Route path="/home" render={ () => <Home handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>}/>
          <Route path="/profile" render = { this.renderProfile}/>
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

let mapStateToProps = (globalState) => {
  return {
    token: globalState.userInformation.token
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

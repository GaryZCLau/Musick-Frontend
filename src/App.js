import React from 'react'
import './App.css'
import {Switch, Route, withRouter} from 'react-router-dom'
import Form from './Form'
import NavBar from './NavBar'
import Sound from 'react-sound'

class App extends React.Component {

  componentDidMount(){
   
    fetch('https://api.spotify.com/v1/playlists/08Lsn1W8n4HgJK5HsLZVlz/tracks', {
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer BQBMz8P7Px9mpNU4zrZlGuA9tYoE7Ir6Bx__X7JPwmRxDmvccVPtyV4Brb6Jmzdvg3ykEOwEO0gvwcSPKQzVJHXy06LeiO7svc1Z89iZBn1s3vEx5ICrtaPrjDCQnBr07wNhvG-8GFe0-5cDz3AK5YFxA7aUP8NN&refresh_token=AQCfc4BkZQaQa0ow0MsztLYqjl_YsAxMKeHak5MW12sXjOaG4xoWHrTGhUr-kgW9yg6N4Vphew_Jda8Ccfux9M39-0bcxumLz-x0Yo_UgdYdBPgjMvskaUDz3zN_Qdp-DCE"
      }
    }).then(r=>r.json()).then((playlistObj) => {
      console.log(playlistObj.items[0].track)
      // .items.map((obj) => {console.log(obj.track)})
      // console.log(playlistObj.items)
      // console.log(playlistObj.items[0].track)
    })
  }

  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }


  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }


  handleResponse = (resp) => {
    if (resp.id) {
      this.setState({
        user: resp
      })
    } else {
      alert(resp.message)
    }
  }


  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form
        formName="Login Form"
        handleSubmit={this.handleLoginSubmit}
      />
    } else if (routerProps.location.pathname === "/register") {
      return <Form
        formName="Register Form"
        handleSubmit={this.handleRegisterSubmit}
      />
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
          <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } />
          <Route path="/profile" render={}/>
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    )
  }
}

export default App;

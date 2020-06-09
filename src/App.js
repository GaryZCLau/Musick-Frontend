import React from 'react'
import './App.css'
import {Switch, Route, withRouter} from 'react-router-dom'
import Form from './Form'
import NavBar from './NavBar'
import Sound from 'react-sound'
import Home from './Home'
import Profile from './Profile'

class App extends React.Component {

  componentDidMount(){
   
    fetch('https://api.spotify.com/v1/playlists/08Lsn1W8n4HgJK5HsLZVlz/tracks', {
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "Bearer BQAWGaC50KfuT9ng0rM7ZgymcCdSvvjmCZ-hIHiV7AJ4voPBR7CD3PuiJnLczFZaVNNTUvVH1Yxm0rSdGchHEpHZWQLX2dS9kpo-IBw4xda-hgQaw7F-BZfCMrAjPemXlcgdiWRVxe7qDUTQnogXaoYdKrE0ebXz&refresh_token=AQBMtdeOYxPzqgepH4i4p-dx6BA_VmyGc14tRjDbAixxEnz4DKt6pNtYk0EbZY2XbRvKuvi5RnZLVDF8R02wVqbvckrFyN6MZpj8KlZ-EX3JQSKb0-elaSufIz6vn9IDkdQ"
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
          <Route path="/home" render={ () => <Home handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>}/>
          {/* <Route path="/login" render={ this.renderForm } />
          <Route path="/register" render={ this.renderForm } /> */}
          <Route path="/profile" render = { () => <Profile /> }/>
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    )
  }
}

export default App;

import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Home extends React.Component {

    state = {
        formLogin: true,
    }

    handleLogin = () => {
        this.setState({
            formLogin: true
        })
    }

    handleRegister = () => {
        this.setState({
            formLogin: true
        })
    }

    render(){


        

        return(
            <div>
                <h1>Game Title</h1>
                <button className="loginP" onClick={this.handleLogin}>Login</button>
                <button className="registerP" onClick={this.handleRegister}>Register</button>
                {this.state.formLogin ? 
                    <LoginForm handleLogin={this.props.handleLogin}/>
                    :
                    <RegisterForm handleRegister={this.props.handleRegister}/>
                }
            </div>
        )
    }
}

export default Home
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
            formLogin: false
        })
    }

    render(){


        

        return(
            <div className="homediv">
                <h1 className="gametitle">Musik</h1>

                <div className="logindiv">
                <button className="loginbutton" onClick={this.handleLogin}>Login</button>
                {this.state.formLogin ? <LoginForm handleLogin={this.props.handleLogin}/> : null}
                </div>

                <div className="registerdiv">
                <button className="registerbutton" onClick={this.handleRegister}>Register</button>
                {this.state.formLogin ? null : <RegisterForm handleRegister={this.props.handleRegister}/>}
                </div>

            </div>
        )
    }
}

export default Home
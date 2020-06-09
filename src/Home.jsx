import React from 'react'

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
            <div>
                <h1>Game Title</h1>
                <p className="loginP" onClick={this.handleLogin}>Login</p>
                <p className="registerP" onClick={this.handleRegister}>Register</p>
                {this.state.formLogin ? 
                    <form onSubmit={this.handleSubmit}>
                      <label htmlFor="name">Name:</label>
                      <input type="text" autoComplete="off" name="name" value={name} onChange={this.handleChange}/>
                      <label htmlFor="password">Password:</label>
                      <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
                      <input type="submit" value="Submit"/>
                    </form>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" autoComplete="off" name="name" value={name} onChange={this.handleChange}/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
                        <input type="submit" value="Submit"/>
                    </form>
                }
            </div>
        )
    }
}

import React from 'react'

class LoginForm extends React.Component {

    state = {
        name: "",
        password: ""
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleLogin(this.state)
        // console.log(this.state)
    }

    render(){

        return(
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" autoComplete="off" name="name" className="formname" value={this.state.name} onChange={this.handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" autoComplete="off" name="password" className="formpassword" value={this.state.password} onChange={this.handleChange}/>
            <input type="submit" value="Submit" className="formsubmit"/>
        </form>
        )
    }
}

export default LoginForm
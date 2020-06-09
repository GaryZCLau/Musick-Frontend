import React from 'react'

class RegisterForm extends React.Component {

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
        this.props.handleRegister(this.state)
    }



    render(){



        return(

        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" autoComplete="off" name="name" value={this.state.name} onChange={this.handleChange}/>
            <label htmlFor="password">Password:</label>
            <input type="password" autoComplete="off" name="password" value={this.state.password} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
        </form>



        )
    }
}

export default RegisterForm
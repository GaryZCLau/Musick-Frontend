import React from 'react'

class Game extends React.Component {

    state = {
        title: ""
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }


    render(){



        return(
        
            <div>
                <img src={this.props.trackObj.track.album.images[1].url} alt={this.props.trackObj.track.album.name}/>
                <h3>{this.props.trackObj.track.name}</h3>
                <p>{this.props.trackObj.track.artists[0].name}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Guess:</label>
                    <input type="text" autoComplete="off" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>

        )
    }
}

export default Game
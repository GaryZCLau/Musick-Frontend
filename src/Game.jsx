import React from 'react'
import Sound from 'react-sound'

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

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.title.toLowerCase === (this.props.trackObj.track.name).toLowerCase) {
            this.props.handleActSubmit(this.props.trackObj.track.name)
        }
    }

    render(){



        return(
        
            <div>
                {/* <Sound url={this.props.trackObj.track.preview_url} volume="5" playStatus="PLAYING"/> */}
                <img src={this.props.trackObj.track.album.images[1].url} alt={this.props.trackObj.track.album.name}/>
                <p>{this.props.trackObj.track.name}</p>
                <p>by: {this.props.trackObj.track.artists[0].name}</p>
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
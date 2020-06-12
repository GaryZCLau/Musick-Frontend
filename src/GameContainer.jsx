import React from 'react'
import Song from './Song.jsx'
import Sound from 'react-sound'
import {connect} from 'react-redux'

class GameContainer extends React.Component {

    // state for counter, hardcode [0], [1] each individual song

    state = {
        trackCounter: 0,
        title: ""
    }

    componentDidMount(){
        this.props.setRandomSongs()
    }

    handleTrackCounter = () => {
        this.setState({
            trackCounter: this.state.trackCounter + 1
        })
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.title.toLowerCase() === this.props.spotifyList[this.state.trackCounter].track.name.toLowerCase()) {
            this.props.handleActSubmit(this.props.spotifyList[this.state.trackCounter].track.name)
        }
    }

    render(){

        // let spotifyArray = this.props.spotifyList.map((singleTrackObj) => {
        //     return <Game 
        //         trackObj={singleTrackObj}
        //         key={singleTrackObj.track.name}
        //         handleActSubmit={this.props.handleActSubmit}
        //     />
        // })

        let spotifySong = this.props.spotifyList[this.state.trackCounter]

        console.log(this.props.spotifyList[this.state.trackCounter])
        console.log(this.props.spotifyList)

        // let randomSong = this.props.spotifyList[Math.floor(this.props.spotifyList.length * Math.random())]

        return(
            <div>
                {/* {spotifyArray} */}
                <Sound url={this.props.spotifyList[this.state.trackCounter].track.preview_url} volume="10" playStatus="PLAYING"/>
                <Song trackObj={spotifySong} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Guess:</label>
                    <input type="text" autoComplete="off" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
                <button onClick={this.handleTrackCounter}>Next Song</button>
            </div>
        )
    }
}

let mapStateToProps = (globalState) => {
    return {
        spotifyList: globalState.spotify.currentPlaying
    }
  }

let mapDispatchToProps = {setRandomSongs: () => {
    return {type: "SET_RANDOM_SONGS"}
}}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
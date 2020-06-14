import React from 'react'
import Song from './Song.jsx'
import Sound from 'react-sound'
import {connect} from 'react-redux'

class GameContainer extends React.Component {

    // state for counter, hardcode [0], [1] each individual song

    state = {
        gameDisplay: false,
        trackCounter: 0,
        title: "",
        songDisplay: false
    }

    componentDidMount(){
        // compartmentalizes spotify playlist
        this.props.setRandomSongs()
    }

    // song counter
    handleTrackCounter = () => {
        this.setState({
            trackCounter: this.state.trackCounter + 1
        })
    }

    // form change
    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    // song display
    handleSongDisplay = () => {
        this.setState({
            songDisplay: !this.state.songDisplay
        })
    }

    // submit song guess
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.title.toLowerCase() === this.props.spotifyList[this.state.trackCounter].track.name.toLowerCase()) {
            this.props.handleActSubmit(this.props.spotifyList[this.state.trackCounter].track.name)
            this.handleSongDisplay()
            this.setState({
                title: ""
            })
        }
    }

    // handles song display and counter
    handleSong = () => {
        if (this.state.songDisplay)(
            this.handleSongDisplay()
        )
        this.handleTrackCounter()
    }

    handleGameDisplay = () => {
        this.setState({
            gameDisplay: !this.state.gameDisplay
        })
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

        // console.log(this.props.spotifyList[this.state.trackCounter])
        // console.log(this.props.spotifyList)

        // let randomSong = this.props.spotifyList[Math.floor(this.props.spotifyList.length * Math.random())]

        return(
            <div>
                {/* {spotifyArray} */}
                {this.state.gameDisplay ? 
                    <div>
                        <Sound url={this.props.spotifyList[this.state.trackCounter].track.preview_url} volume="20" playStatus="PLAYING"/>
                        {this.state.songDisplay? <Song trackObj={spotifySong} /> : null}
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="title">Guess:</label>
                            <input type="text" autoComplete="off" name="title" value={this.state.title} onChange={this.handleChange}/>
                            <input type="submit" value="Submit"/>
                        </form>
                        <button onClick={this.handleSong}>Next Song</button>
                    </div>
                :
                    <button className="startButton" onClick={this.handleGameDisplay}>Start Game</button>
                }
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
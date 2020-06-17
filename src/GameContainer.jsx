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
        songDisplay: false,
        songsGuessed: 0,
        gameEnd: false
    }

    componentDidMount(){
        // compartmentalizes spotify playlist
        this.props.setRandomSongs()
    }

    // song counter
    handleTrackCounter = () => {
        if (this.state.trackCounter < this.props.spotifyList.length - 1){
            this.setState({
                trackCounter: this.state.trackCounter + 1
            })
        } else {
            this.handleEnd()
            this.setState({
                trackCounter: 0
            })
        }
        
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
                title: "",
                songsGuessed: this.state.songsGuessed + 1
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

    // handles game display after start button
    handleGameDisplay = () => {
        this.setState({
            gameDisplay: !this.state.gameDisplay,
            songsGuessed: 0
        })
    }

    // handles after last song guess
    handleEnd = () => {
        this.setState({
            gameEnd: !this.state.gameEnd
        })
    }
    handleEnd2 = () => {
        this.setState({
            gameEnd: !this.state.gameEnd,
            songsGuessed: 0
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

        // console.log(this.props.spotifyList.length)

        let spotifySong = this.props.spotifyList[this.state.trackCounter]
        // console.log(this.state.trackCounter)

        // let spotifySong = () => {
        //     if (this.state.trackCounter < 7) {
        //         return this.props.spotifyList[this.state.trackCounter]
        //     } else {
        //         this.setState({
        //             trackCounter: 0
        //         })
        //         this.handleEnd()
        //         return this.props.spotifyList[this.state.trackCounter]
        //     }
        // }

        // console.log(this.props.spotifyList[this.state.trackCounter])
        // console.log(this.props.spotifyList)

        // let randomSong = this.props.spotifyList[Math.floor(this.props.spotifyList.length * Math.random())]

        let nextSongButton = this.state.trackCounter === 6 ? "Last Song" : "Next Song"

        return(
            <div className="gamediv">
                {/* {spotifyArray} */}
                {this.state.gameEnd ?
                    <div>
                        <h1>The End</h1>
                        <p>Guessed: {this.state.songsGuessed}/8</p>
                        <button onClick={this.handleEnd2}>Play Again?</button>
                    </div>
                :
                    <div>
                    {this.state.gameDisplay ? 
                        <div>
                            <Sound url={this.props.spotifyList[this.state.trackCounter].track.preview_url} volume="1" playStatus="PLAYING"/>
                            {this.state.songDisplay? <Song trackObj={spotifySong} /> : null}
                            <form className="gamesubmit" onSubmit={this.handleSubmit}>
                                <label htmlFor="title">Guess:</label>
                                <input type="text" autoComplete="off" name="title" value={this.state.title} onChange={this.handleChange}/>
                                <input type="submit" value="Submit"/>
                            </form>
                            <button onClick={this.handleSong}>
                            { this.state.trackCounter === 7 ? 
                                "End"
                            :
                                nextSongButton
                            }
                            </button>
                            <p>{this.state.songsGuessed}/8</p>
                        </div>
                    :
                        <div>
                        <h1 className="gametitle">Musik</h1>
                        <button className="startButton" onClick={this.handleGameDisplay}>Start Game</button>
                        </div>
                    }
                    </div>
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
import React from 'react'
import Game from './Game.jsx'
import {connect} from 'react-redux'

class GameContainer extends React.Component {

    // state for counter, hardcode [0], [1] each individual song

    componentDidMount(){
        console.log("hello")
        this.props.setRandomSongs()
    }

    render(){
        // console.log("gamecontainer")
        // console.log(this.props.spotifyList)
        // console.log(this.props.spotifyList[0])

        let spotifyArray = this.props.spotifyList.map((singleTrackObj) => {
            return <Game 
                trackObj={singleTrackObj}
                key={singleTrackObj.track.name}
                handleActSubmit={this.props.handleActSubmit}
            />
        })

        // let randomSong = this.props.spotifyList[Math.floor(this.props.spotifyList.length * Math.random())]

        return(
            <div>
                {spotifyArray}
                {/* <Game trackObj={randomSong} handleActSubmit={this.props.handleActSubmit}/> */}
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
import React from 'react'
import Game from './Game.jsx'
import {connect} from 'react-redux'

class GameContainer extends React.Component {

    render(){
        // console.log("gamecontainer")
        // console.log(this.props.spotifyList)
        // console.log(this.props.spotifyList[0])

        let spotifyArray = this.props.spotifyList.map((singleTrackObj) => {
            return <Game 
                trackObj={singleTrackObj}
                key={singleTrackObj.track.name}
            />
        })

        return(
            <div>
                {spotifyArray}
            </div>
        )
    }
}

let mapStateToProps = (globalState) => {
    return {
        spotifyList: globalState.spotify.spotifyList
    }
  }

export default connect(mapStateToProps)(GameContainer)
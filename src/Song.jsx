import React from 'react'

class Song extends React.Component {

    render(){



        return(
        
            <div>
                <img src={this.props.trackObj.track.album.images[1].url} alt={this.props.trackObj.track.album.name}/>
                <p>{this.props.trackObj.track.name}</p>
                <p>by: {this.props.trackObj.track.artists[0].name}</p>
            </div>

        )
    }
}

export default Song
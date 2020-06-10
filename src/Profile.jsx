import React, { Component } from 'react';
import {connect} from 'react-redux'
import Activities from './Activities'


class Profile extends Component {

handleDelete = () => {

}

  render() {

    let arrayOfAct = this.props.activities.map((singleActObj) => {
        return <Activities 
            actObj={singleActObj}
            key={singleActObj.id}
            deleteActivity={this.props.deleteActivity}
        />
        // <li>Guessed song: {actObj.title} <button onClick={this.handleDelete}>X</button></li>
    })
    // console.log(this.props.activities)

    return (
      <div>
        <img src={this.props.image} alt={this.props.name}/>
        <h2>{this.props.name}</h2>
        <p>{this.props.status}</p>
        <ul>
            {arrayOfAct}
        </ul>
      </div>
    );
  }

}


let mapStateToProps = (globalState) => {
  return {
    name: globalState.userInformation.name,
    status: globalState.userInformation.status,
    image: globalState.userInformation.image,
    activities: globalState.userInformation.activities
  }
}

export default connect(mapStateToProps)(Profile);

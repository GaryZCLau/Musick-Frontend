import React, { Component } from 'react';
import {connect} from 'react-redux'
class Profile extends Component {

  render() {
    return (
      <div>
        <p>
          {this.props.name} is logged in!
        </p>
      </div>
    );
  }

}


let mapStateToProps = (globalState) => {
  return {
    name: globalState.userInformation.name
  }
}

export default connect(mapStateToProps)(Profile);

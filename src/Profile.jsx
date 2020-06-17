import React, { Component } from 'react';
import {connect} from 'react-redux'
import Activities from './Activities'


class Profile extends Component {

  state = {
    edit: false,
    image: "",
    status: ""
  }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
        [name]: value
    })
  }

  handleUpdateImage = (e) => {
    e.preventDefault()
    this.props.handleUpdateImage(this.state.image)
    this.setState({
      image: ""
    })
  }

  handleUpdateStatus = (e) => {
    e.preventDefault()
    this.props.handleUpdateStatus(this.state.status)
    this.setState({
      status: ""
    })
  }

  render() {

    let arrayOfAct = this.props.activities.map((singleActObj) => {
        return <Activities 
            actObj={singleActObj}
            key={singleActObj.id}
            deleteActivity={this.props.deleteActivity}
            editStatus={this.state.edit}
        />
        // <li>Guessed song: {actObj.title} <button onClick={this.handleDelete}>X</button></li>
    })
    // console.log(this.props.activities)

    return (
      <div className="profilebody">

        <button className="edit" onClick={this.handleEdit}>Settings</button>

        <div className="imgdiv">
        <img src={this.props.image} alt={this.props.name}/>
          {this.state.edit ? 
          <form className="imgform" onSubmit={this.handleUpdateImage}>
            <label htmlFor="image">URL: </label>
            <input type="text" autoComplete="off" name="image" value={this.state.image} onChange={this.handleChange}/>
            <input type="submit" input="" value="Update"/>
          </form>
          :
          null
          }
        </div>

        <div className="namediv">
        <span className="name">{this.props.name}</span>
        <p>{this.props.status}</p>
          {this.state.edit ? 
          <form onSubmit={this.handleUpdateStatus}>
            <input type="text" autoComplete="off" name="status" value={this.state.status} onChange={this.handleChange}/>
            <input type="submit" input="" value="Update"/>
          </form>
          :
          null
          }
        </div>
        


        
        <div className="activity">
        <h2>Recent Activity</h2>
        <ul className="activityul">
            {arrayOfAct}
        </ul>
        </div>
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

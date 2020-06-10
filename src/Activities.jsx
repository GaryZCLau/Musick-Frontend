import React from 'react'

class Activities extends React.Component {


    handleDelete = () => {
        this.props.deleteActivity(this.props.actObj.id)
    }

    render(){
    
        // console.log(this.props.actObj)

        return(
            <li>
                Guessed song: {this.props.actObj.title}  
                <button onClick={this.handleDelete}>X</button>
            </li>



        )


    }



}

export default Activities
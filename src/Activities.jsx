import React from 'react'

class Activities extends React.Component {


    handleDelete = () => {
        this.props.deleteActivity(this.props.actObj.id)
    }

    render(){
    
        // console.log(this.props.actObj)

        return(
            <li>
                Guessed: {this.props.actObj.title}
                {this.props.editStatus? 
                    <button onClick={this.handleDelete}>X</button>
                : 
                    null
                }
            </li>



        )


    }



}

export default Activities
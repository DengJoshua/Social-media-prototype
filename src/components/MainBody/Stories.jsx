import React, { Component } from 'react'
class Stories extends Component {

    render() {
        const {user} = this.props;
        return (
            <div className="stories mb-2">
                <div className="story">
                <div className="img-container" id="you" >
                    <div className="overlay" >
                    <h4 className="plus" >+</h4>
                    </div>  
                    <img src={user.profile.profilePic}  alt="my pic"/>
                    </div>
                    <p>You</p>
                </div>
                <React.Fragment>
                    {user.friends.map(friend => 
                        <div className="story" key={friend._id} >
                        <div className="img-container" >
                            <img src={friend.profilePic} alt={friend.username}/>
                            </div>
                            <p>{friend.username}</p>
                        </div>
                    )}
                </React.Fragment>
                </div>
        )
    }
    
}

export default Stories
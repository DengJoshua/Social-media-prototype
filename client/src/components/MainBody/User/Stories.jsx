import React, { Component } from 'react'
class Stories extends Component {

    render() {
        const { user } = this.props;
        return (
            <div className="stories mb-2">
                <div className="story">
                    <div className="img-container">
                        <div className="overlay" >
                            <h3 className="plus" >+</h3>
                            <img src={user.profile.profilePic} alt="my pic" />
                        </div>
                    </div>
                    <p>You</p>
                </div>
                <React.Fragment>
                    {user.friends.map(friend =>
                        <div className="story" key={friend._id} >
                            <div className="img-container" >
                                <img src={friend.profilePic} alt={friend.username} />
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
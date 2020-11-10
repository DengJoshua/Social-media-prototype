import React, { Component } from 'react'

class Notifications extends Component {
    hideNotifications = () => {
        document.getElementById('notifications').setAttribute("className", "not-shown")
        document.getElementById('notifications').removeAttribute("style")
    }
    
    
    render() {
        const {  user } = this.props

        return (
            <div className="notifications" id="notifications" style={{display:'none'}}  >
                <button className="notBtn"
                onClick={this.hideNotifications}
                >Close</button>
                {
                user.notifications.length === 0 ? <p className="text-primary pl-1">You have no notifications yet.</p> :
                user.notifications.map(notification => (
                    <div className="notification" key={notification._id} >
                        <div className="img-border">
                        <img src={user.profile.profilePic}  alt=""/>
                        </div>                        
                        <p>{notification.content}</p>
                        <span style={{color:"#fff"}} >{this.formatDate(notification.createdAt)}</span>
                    </div>
                ))
                }
            </div>
        )
    }
    formatDate(input) {
        const createdAt = new Date(input)
        const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]        
        
        let date = createdAt.getDate() + "";
        date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear()
        return date
        }
}

export default Notifications;
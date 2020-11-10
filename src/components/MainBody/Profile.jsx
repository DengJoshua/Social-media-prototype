import React, { Component } from 'react'
import { getCurrentUser } from '../../services/authService'
import { getUserProps } from '../../services/userService'

export default class Profile extends Component {
    state = {
        user:""
    }

    async componentDidMount() {
        const result = getCurrentUser()
        const { data: user } = await  getUserProps(result._id)
        this.setState({ user })
    }
    

    render() {
        const { user } = this.state;
        return (
            <div>
                <h5>{user.username}</h5>
            </div>
        )
    }
}

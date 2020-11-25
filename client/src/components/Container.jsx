import React, { Component } from 'react'
import MainBody from './MainBody/MainBody'
import NavBar from './NavBar'
import { getCurrentUser } from '../services/authService';
import { getUserProps } from '../services/userService';
import { Loader } from 'rsuite';

class Container extends Component {
    state = {
        user: '',
        isLoading: true
    }
    async componentDidMount() {
        // get current user
        const result = getCurrentUser()
        const { data } = await getUserProps(result._id)
        this.setState({ user: data })
        this.setState({ isLoading: false })
    }

    render() {

        return isLoading ? <Loader size="md" center />
            : (
                <div className="main" >
                    <div className="d-flex h-100" >
                        <NavBar user={user} />
                        <MainBody user={user} />
                    </div>
                </div>
            )
    }
}
export default Container;
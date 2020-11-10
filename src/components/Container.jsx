import React, { useState, useEffect } from 'react'
import MainBody from './MainBody/MainBody'
import NavBar from './NavBar'
import { getCurrentUser } from '../services/authService';
import { getUserProps } from '../services/userService';
import Spinner from './common/Spinner';

const Container = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const result = getCurrentUser()
        async function fetchData() {
            const { data } = await getUserProps(result._id)
            setUser(data)
            setIsLoading(false)
        }
        fetchData()
    }, [user])

    return isLoading ? <Spinner />
        : (
            <div className="main" >
                <NavBar user={user} />
                <MainBody user={user} />
            </div>
        )
}

export default Container;
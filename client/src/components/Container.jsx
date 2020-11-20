import React, { useState, useEffect } from 'react'
import MainBody from './MainBody/MainBody'
import NavBar from './NavBar'
import { getCurrentUser } from '../services/authService';
import { getUserProps } from '../services/userService';
import { Loader } from 'rsuite';

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
export default Container;
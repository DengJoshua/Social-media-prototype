import http  from './httpService'
import jwtDecode from 'jwt-decode'
import axios from 'axios'


const apiEndPoint = "http://localhost:5000/api/auth"


export async function login(user) {
    return await axios.post(apiEndPoint, { 
        email:  user.email,
        password: user.password
    })
}

export function logout() {
    sessionStorage.removeItem("token")
}

http.setJwt(getJwt())


export function loginWithJwt(jwt){
    return sessionStorage.setItem("token", jwt)
}


export function getCurrentUser(){
    try {
        const jwt = sessionStorage.getItem("token")
        return jwtDecode(jwt)
    } catch (ex) {
        return null
    }
}

export function getJwt() {
    return sessionStorage.getItem("token")
}

import axios from 'axios'

const apiEndPoint = "http://localhost:5000/api/friends"

export function getFriends(id) {
    return axios.get(apiEndPoint + "/" + id)
}

export function sendFriendRequest(myId, reqId) {
    return axios.post(apiEndPoint + "/sendFriendRequest", {
        myId,
        reqId
    })
}

export function cancelFriendRequest(myId, reqId) {
    return axios.post(apiEndPoint + "/cancel", {
        myId,
        reqId
    })
}

export function acceptFriendRequest(myId, reqId) {
    return axios.post(apiEndPoint + "/acceptFriendRequest", {
        myId,
        reqId
    })
}

export function declineFriendRequest(myId, reqId) {
    return axios.post(apiEndPoint + "/decline", {
        myId,
        reqId
    })
}

export function unFriendUser(myId, reqId) {
    return axios.post(apiEndPoint + "/unfriend", {
        myId,
        reqId
    })
}

export function SendMessage(myId, friendId, message) {
    return axios.post(apiEndPoint + "/sendMessage", {
        myId,
        friendId,
        message
    })
}




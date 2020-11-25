import http from './httpService'

// api endpoint
const apiEndPoint = "http://localhost:5000/api/friends"

// get user friends
export function getFriends(id) {
    return http.get(apiEndPoint + "/" + id)
}

// send a friend reqeust
export function sendFriendRequest(myId, reqId) {
    return http.post(apiEndPoint + "/sendFriendRequest", {
        myId,
        reqId
    })
}

// cancel a friend request
export function cancelFriendRequest(myId, reqId) {
    return http.post(apiEndPoint + "/cancel", {
        myId,
        reqId
    })
}

// accept a friend request
export function acceptFriendRequest(myId, reqId) {
    return http.post(apiEndPoint + "/acceptFriendRequest", {
        myId,
        reqId
    })
}

// decline a friend request
export function declineFriendRequest(myId, reqId) {
    return http.post(apiEndPoint + "/decline", {
        myId,
        reqId
    })
}

// unfriend a user
export function unFriendUser(myId, reqId) {
    return http.post(apiEndPoint + "/unfriend", {
        myId,
        reqId
    })
}

// get user's and friend chats
export function getMessages(userId, friendId) {
    return http.post(apiEndPoint + "/getMessages/" + friendId, {
        userId
    })
}


// send text message
export function SendText(myId, friendId, message) {
    return http.post(apiEndPoint + "/sendMessage", {
        myId,
        friendId,
        message
    })
}

// connect user socket
export function connectsocket(userId) {
    return http.post(apiEndPoint + "/connectSocket", { userId })
}

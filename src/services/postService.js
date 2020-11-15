import http from './httpService'

const apiEndPoint = "http://localhost:5000/api/posts"

export function getPosts() {
    return http.get(apiEndPoint)
}

export function getPost(id) {
    return http.get(apiEndPoint + "/" + id)
}




export function getUserPosts(userId) {
    return http.post(apiEndPoint + "/myPosts", {userId})
}


export function savePost(text, image, video, userId) {
    return http.post(apiEndPoint + "/" + userId, {
        text,
        image,
        video 
    })
}

export function likePost(userId, postId) {
    return http.post(apiEndPoint + '/likePost', {
        userId,
        postId
    })
}

export function unlikePost(userId, postId) {
    return http.post(apiEndPoint + '/unlikePost', {
        userId,
        postId
    })
}

export function saveComment(userId, postId, comment){
    return http.post(apiEndPoint + "/comment", {
        userId,
        postId,
        comment
    })
}
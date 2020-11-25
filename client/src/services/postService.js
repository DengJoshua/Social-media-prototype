import http from './httpService'

// api endpoint
const apiEndPoint = "http://localhost:5000/api/posts"

// get all posts
export function getPosts() {
    return http.get(apiEndPoint)
}

// get a specific post
export function getPost(id) {
    return http.get(apiEndPoint + "/" + id)
}

// get a user's posts
export function getUserPosts(userId) {
    return http.post(apiEndPoint + "/myPosts", {userId})
}

// save a post and create a post
export function savePost(text, image, video, userId) {
    return http.post(apiEndPoint + "/" + userId, {
        text,
        image,
        video 
    })
}

// like a post
export function likePost(userId, postId) {
    return http.post(apiEndPoint + '/likePost', {
        userId,
        postId
    })
}

// unlike a post
export function unlikePost(userId, postId) {
    return http.post(apiEndPoint + '/unlikePost', {
        userId,
        postId
    })
}

// save a post's comment
export function saveComment(userId, postId, comment){
    return http.post(apiEndPoint + "/comment", {
        userId,
        postId,
        comment
    })
}
import http from './httpService'

const apiEndPoint = "http://localhost:5000/api/users"


// sign up and register
export function register(user) {
    return http.post(apiEndPoint, { 
        email: user.email,
        username: user.username,
        password: user.password  
    })
}

// update user profile
export function updateProfile(data, profilePic) {
    return http.post(apiEndPoint + "/updateProfile/" + data._id, {
        profilePic: profilePic,
        country: data.country,
        gender: data.gender,
        story: data.story   
    })
}

// save user changes
export function saveUser(user, profilePic){
    if (user._id) {
        const body = { ...user };
        delete body._id;
        return http.post(apiEndPoint + "/updateProfile/" + user._id, body, profilePic)
    } 
      return http.post(apiEndPoint, user);
}

// get user properties
export function getUserProps(id) {
    return http.get(apiEndPoint + "/" + id)
}

// search users
export function searchUsers(query) {
    return http.post('http://localhost:5000/api/search/user', { query })
}
import http from './httpService'

const apiEndPoint = "http://localhost:5000/api/users"


export function register(user) {
    return http.post(apiEndPoint, { 
        email: user.email,
        username: user.username,
        password: user.password  
    })
}

export function updateProfile(data, profilePic) {
    return http.post(apiEndPoint + "/updateProfile/" + data._id, {
        profilePic: profilePic,
        country: data.country,
        gender: data.gender,
        story: data.story   
    })
}

export function saveUser(user, profilePic){
    if (user._id) {
        const body = { ...user };
        delete body._id;
        return http.post(apiEndPoint + "/updateProfile/" + user._id, body, profilePic)
    } 
      return http.post(apiEndPoint, user);
}

export function getUserProps(id) {
    return http.get(apiEndPoint + "/" + id)
}

export function searchUsers(query) {
    return http.post('http://localhost:5000/api/search/user', { query })
}
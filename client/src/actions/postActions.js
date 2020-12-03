import http from '../services/httpService'
import { GET_POSTS, MAKE_POST } from './types'

export const fetchPosts = async dispatch => {
    const { data } = await http.get('http://localhost:5000/api/posts')
    dispatch({
        type: GET_POSTS,
        payload: data
    })
}

export const makePost = ( post, id ) => async dispatch => {
    const { data } = await http.post('http://localhost:5000/api/posts/' + id, { 
        text: post.text,
        video: post.vidUrl,
        image: post.imgUrl
    })
    dispatch({
        type: MAKE_POST,
        payload: data
    })
} 
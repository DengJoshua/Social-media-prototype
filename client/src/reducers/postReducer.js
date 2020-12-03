import { GET_POSTS, LIKE_POST, MAKE_POST  } from '../actions/types'

const initialState = {
    posts: [],
    post: {},
    comment: {},
    isLoading: true
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case MAKE_POST:
            return {
                ...state,
                post: action.payload,
                posts: [ action.payload, ...state.posts ]
            };
        case LIKE_POST:
            return {
                
            }



        default:
            return state
    }
}
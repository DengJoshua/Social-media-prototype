import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom'
import Profile from './User/Profile';
import Search from './Search';
import Chat from '../Chat/Chat';
import FriendRequests from './User/FriendRequests';
import Friends from './User/Friends';
import NewsFeed from './Posts/NewsFeed';
import SpecPost from './Posts/specPost'
import { likePost, unlikePost, saveComment, getPosts } from '../../services/postService'
import ProtectedRoute from '../common/protectedRoute'


const RightBody = ({ user }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const { data } = await getPosts()
            setPosts(data)
        }
        fetchPosts()
    }, [posts, user])

    const LikePost = async (id) => {
        await likePost(user._id, id)
    }

    const unLikePost = async (id) => {
        await unlikePost(user._id, id)
    }

    const postComment = async (id, comment) => {
        await saveComment(user._id, id, comment)
        document.getElementById(id).value = ""
    }

    return (
        <div className="right-side" >
            <Switch >
                <ProtectedRoute exact path="/me/home" render={props => <NewsFeed {...props} user={user}
                    unlikePost={unLikePost}
                    likePost={LikePost}
                    posts={posts}
                />}
                />
                <ProtectedRoute path="/me/search/" render={props => <Search {...props} user={user} />} />
                <ProtectedRoute path="/me/profile" render={props => <Profile {...props} user={user} />} />
                <ProtectedRoute path="/me/chats" render={props => <Chat {...props} user={user} />} />
                <ProtectedRoute path="/me/friends" render={props => <Friends {...props} user={user} />} />
                <ProtectedRoute path="/me/friend-requests" render={props => <FriendRequests {...props} user={user} />} />
                <ProtectedRoute path="/me/home/posts/:id" render={props => <SpecPost {...props} postComment={postComment}
                    likePost={LikePost}
                    unlikePost={unLikePost}
                    user={user}
                />}
                />
            </Switch>
        </div>
    );
}

export default RightBody;

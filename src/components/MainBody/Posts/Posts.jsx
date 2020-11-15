import React from 'react'
import Post from './Post';


const Posts = ({ user, likePost, unlikePost, posts }) => {
    return (
        posts.length === 0 ? <p>No posts on your activity.</p> :
            <div className="posts">
                {
                    posts.map(post => (
                        <Post post={post}
                            unlikePost={unlikePost} likePost={likePost}
                            user={user}
                            key={post._id}
                        />
                    ))
                }
                <p>No more posts to show.</p>
            </div>
    )
}


export default Posts

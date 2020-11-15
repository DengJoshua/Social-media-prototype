import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'rsuite';

const Post = ({ post, user, likePost, unlikePost }) => {
    return (
        <div className="section mb-3" key={post._id} >
            <header>
                <main style={{ display: "flex" }} >
                    <img src={post.user.profilePic} className="profile-pic mr-2" alt={post.user.username} />
                    <section>
                        <p className="username text-primary" >{post.user.username}</p>
                        <p className="date" >{formatDate(post.createdAt)}</p>
                    </section>
                </main>
                {checkIsMine(post)}
            </header>
            <section className="post-text mb-1" >
                <p>{post.text}</p>
            </section>
            <br />
            {post.image !== "" ? <section className="post-media mb-1">
                <img src={post.image} alt="Post" />
            </section> : ""
            }
            {post.video !== "" ? <section className="post-media mb-1">
                <video src={post.video} controls alt="Video"></video>
            </section> : ""
            }
            <footer className="post-stats" >
                {getLikeClasses(post)}
                <i className={getCommentClasses(post)}><Link to={`/me/home/posts/${post._id}`}> {post.comments.length}</Link></i>
                <i className="fa fa-share" > {post.shares.length}</i>
                <Link to={`/me/home/posts/${post._id}`} className="float-right">Go to post.</Link>
            </footer>
        </div>
    );

    function getLikeClasses(post) {
        const postlen = post.likes.length;
        for (let i = 0; i < postlen; i++) {
            let liker = post.likes[i];
            if (liker._id.toString() === user._id.toString()) {
                return (
                    <i className="fa fa-thumbs-o-up text-danger"
                        onClick={() => unlikePost(post._id)}
                    > {post.likes.length}</i>
                )
            }
        }
        return (
            <i className="fa fa-thumbs-o-up"
                onClick={() => likePost(post._id)}
            > {post.likes.length}</i>
        )
    }

    function getCommentClasses(post) {
        const commentlen = post.comments.length
        let classes = "fa fa-comments goback";
        for (let i = 0; i < commentlen; i++) {
            let commenter = post.comments[i];
            if (commenter.user._id.toString() === user._id.toString()) {
                classes += " text-primary"
                return classes
            }
        }
        return classes
    }

    function formatDate(input) {
        const createdAt = new Date(input)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let date = createdAt.getDate() + "";
        date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear()
        return date
    }

    function checkIsMine(post) {
        if (user._id.toString() === post.user._id.toString()) {
            return <Icon icon="ellipsis-h" style={{ fontSize: "30px" }} className="h-0" />
        }
        return ''
    }

}

export default Post;
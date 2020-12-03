import React, { useState, useEffect } from 'react'
import { Loader } from 'rsuite'
import { getPost } from '../../../services/postService'
import Comment from './Comment'
import { Button, Icon } from 'rsuite'


const SpecPost = ({ match, history, postComment, likePost, unlikePost, user }) => {
    const [post, setPost] = useState('')
    const [isLoading, setIsloading] = useState(true)
    const [comment, setComment] = useState('')

    useEffect(() => {
        const postId = match.params.id
        async function fetchData() {
            const { data } = await getPost(postId)
            setPost(data)
            setIsloading(false)
        }
        fetchData()
    }, [match.params])

    return isLoading ? <Loader size="md" center /> : (
        <div style={{ padding: '10px' }} >
            <i className="fa fa-arrow-left goback" onClick={() => history.goBack()}> Go back </i>
            <div className="section mb-3" key={post._id} style={{ padding: "10px" }} >
                <header>
                    <main style={{ display: "flex" }} >
                        <img src={post.user.profilePic} className="profile-pic mr-2" alt={post.user.username} />
                        <section>
                            <p className="username text-primary" >{post.user.username}</p>
                            <p className="date" >{formatDate(post.createdAt)}</p>
                        </section>
                    </main>
                    {
                        checkIsMine(post)
                    }
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
                    <i className={getCommentClasses(post)}> {post.comments.length}</i>
                    <i className="fa fa-share" > {post.shares.length}</i>
                </footer>
                <div>
                    <h6>Comments.</h6>
                    <section className="comments" id="comments" >
                        {
                            post.comments.length === 0 ? <p>This post has no comments.</p> :
                                post.comments.map(comment => (
                                    <Comment comment={comment} formatDate={formatDate} key={comment._id} />
                                ))
                        }
                    </section>
                    <section className="mt-2 d-flex" >
                        <input type="text" className="myInput mr-1" id={post._id}
                            onChange={(e) => setComment(e.target.value)} />
                        <Button color="blue" appearance="ghost"
                            onClick={() => postComment(post._id, comment)}
                        >Comment</Button>
                    </section>
                </div>
            </div>
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
        let classes = "fa fa-comments";
        for (let i = 0; i < commentlen; i++) {
            let commenter = post.comments[i];
            if (commenter.user._id.toString() === user._id.toString()) {
                classes += " text-primary"
                return classes
            }
        }
        return classes
    }


    function checkIsMine(post) {
        if (user._id.toString() === post.user._id.toString()) {
            return <Icon icon="ellipsis-h" style={{ fontSize: "30px" }} className="h-0" />
        }
        return ''
    }

    function formatDate(input) {
        const createdAt = new Date(input)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let date = createdAt.getDate() + "";
        date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear()
        return date
    }

}

export default SpecPost 
import React, { Component } from 'react'
import Comment from './Comment'
import { Button, Icon, Loader } from 'rsuite'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchPost } from '../../../actions/postActions'


class SpecPost extends Component {
    state = {
        comment: ''
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    render() {
        const { history, postComment, post, isLoading } = this.props
        const { comment } = this.state

        return isLoading ? <Loader center size="md" /> : (
            <div style={{ padding: '10px' }} >
                <i className="fa fa-arrow-left goback" onClick={() => history.goBack()}> Go back </i>
                <div className="section mb-3" key={post._id} style={{ padding: "10px" }} >
                    <header>
                        <main style={{ display: "flex" }} >
                            <img src={post.user.profilePic} className="profile-pic mr-2" alt={post.user.username} />
                            <section>
                                <p className="username text-primary" >{post.user.username}</p>
                                <p className="date" >{this.formatDate(post.createdAt)}</p>
                            </section>
                        </main>
                        {
                            this.checkIsMine(post)
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
                        {this.getLikeClasses(post)}
                        <i className={this.getCommentClasses(post)}> {post.comments.length}</i>
                        <i className="fa fa-share" > {post.shares.length}</i>
                    </footer>
                    <div>
                        <h6>Comments.</h6>
                        <section className="comments" id="comments" >
                            {
                                post.comments.length === 0 ? <p>This post has no comments.</p> :
                                    post.comments.map(comment => (
                                        <Comment comment={comment} formatDate={this.formatDate} key={comment._id} />
                                    ))
                            }
                        </section>
                        <section className="mt-2 d-flex" >
                            <input type="text" className="myInput mr-1" id={post._id}
                                onChange={(e) => this.setState({ comment: e.target.value })} />
                            <Button color="blue" appearance="ghost"
                                onClick={() => postComment(post._id, comment)}
                            >Comment</Button>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    getLikeClasses(post) {
        const { user, unlikePost, likePost } = this.props
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

    getCommentClasses(post) {
        const { user } = this.props
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


    checkIsMine(post) {
        const { user } = this.props
        if (user._id.toString() === post.user._id.toString()) {
            return <Icon icon="ellipsis-h" style={{ fontSize: "30px" }} className="h-0" />
        }
        return ''
    }

    formatDate(input) {
        const createdAt = new Date(input)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let date = createdAt.getDate() + "";
        date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear()
        return date
    }

}

SpecPost.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    post: state.posts.post,
    isLoading: state.posts.isLoading
})


export default connect(mapStateToProps, { fetchPost })(SpecPost)
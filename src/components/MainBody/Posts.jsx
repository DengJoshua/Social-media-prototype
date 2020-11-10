import React, { Component } from 'react'
import { Icon, Button } from 'rsuite'


class Posts extends Component {
    state = {
        comment: ""
    }

    render() {
        const { posts } = this.props
        return (
            <div className="posts">
            {
            posts.length === 0 ? (<p>No posts on your activity.</p>) : posts.map(post => (
                <div className="section mb-3" key={post._id} > 
            <header>
                <main style={{display:"flex"}} >
                <img src={post.user.profilePic} className="profile-pic mr-2" alt={post.user.username} />
                <section>
                  <h4 className="text-primary" >{post.user.username}</h4> 
                  <p>{this.formatDate(post.createdAt)}</p>  
               </section>
               </main>
               {
                this.checkIsMine(post)
               }
            </header>
            <section className="post-text mb-1" >
            <p>{post.text}</p>
            </section>
            <br/>
            {post.image !== "" ? <section className="post-media mb-1">
            <img src={post.image} alt="Post"/>     
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
            post.comments.map(comment =>  (
                <div className="comment" key={comment._id} >
                <section style={{display:"flex"}} >
                <img src={comment.user.profilePic} className="profile-pic" alt={comment.user.username}/>
                <section className="ml-2">
                <h6 >{comment.user.username}</h6>
                <p>{this.formatDate(comment.createdAt)}</p>
                </section>
                </section>
                <p className='ml-5' >{comment.comment}</p>
                </div>
            ))
            }
            </section>
            <section className="mt-2 d-flex" >
            <input type="text" className="myInput mr-1" id={post._id}
            onChange={(e) => this.setState({ comment: e.target.value})}/>
            <Button color="blue" appearance="ghost" 
            onClick={this.props.postComment.bind(this, post._id, this.state.comment)}                
            >Comment</Button>
            </section>
            </div> 
           </div>
            )) 
        }
        <p>No more posts to show.</p>
        </div>   
        )
    }
    
    formatDate(input) {
    const createdAt = new Date(input)
    const months = ["Janaury", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]        
    
    let date = createdAt.getDate() + "";
    date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear()
    return date
    }
    
    getLikeClasses(post) {
        const { user } = this.props;
        const postlen = post.likes.length;
        for (let i = 0; i < postlen; i++) {
          let liker = post.likes[i];
          if(liker._id.toString() === user._id.toString()) {
            return (
            <i className="fa fa-thumbs-o-up text-danger"
            onClick={this.props.unlikePost.bind(this, post._id)}
            > {post.likes.length}</i>
            )
        }}
        return (
            <i className="fa fa-thumbs-o-up"
            onClick={this.props.likePost.bind(this, post._id)}
            > {post.likes.length}</i>
        )
    }
    
    getCommentClasses(post) {
    const { user } = this.props
    const commentlen = post.comments.length
    let classes = "fa fa-comments";
    for (let i = 0; i < commentlen; i++) {
      let commenter = post.comments[i];
      if(commenter.user._id.toString() === user._id.toString()) {
        classes += " text-primary"
        return classes
    }}
    return classes
    }


    checkIsMine(post) {
        const { user } = this.props
        if(user._id.toString() === post.user._id.toString()){
            return <Icon icon="ellipsis-h" style={{fontSize:"30px"}} className="h-0" />
        }
        return ''
    }


}

export default Posts

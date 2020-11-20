import React, { Component } from 'react'
import { Icon, Button, Loader } from 'rsuite'
import Notifications from './User/Notifications';
import { Link } from 'react-router-dom';
import Footer from '../MainBody/Footer';



export default class LeftBody extends Component {
    state = {
        query: ''
    }

    render() {
        const { user } = this.props;
        const { query } = this.state;

        return (
            <div className="left-body"  >
                <Notifications user={user} />
                <header className="notification-bar">
                    <input type="text" placeholder="Search" id="search" onChange={e => this.setState({ query: e.target.value })} />
                    <Link onClick={e => (query === '') ? e.preventDefault() : document.getElementById('search').value = ""} to={`/me/search/?query=${query}`}
                    ><i className="fa fa-search search-btn" style={{ fontSize: '25px' }} /></Link>
                    <Button appearance="ghost" className="rounded-circle" style={{ height: "50px", width: "50px" }}
                        onClick={() => document.getElementById('notifications').style.display = "block"}>
                        <Icon icon="bell" style={{ fontSize: "25px" }} />
                    </Button>
                    <Link to="/me/chats" style={{ color: "#fff" }} >
                        <Button appearance="primary" className="rounded-circle" style={{ height: "50px", width: "50px" }}
                            componentClass="button"
                        >
                            <i className="fa fa-paper-plane" style={{ fontSize: "25px" }} />
                        </Button>
                    </Link>
                </header>
                <br />
                <div className="suggestions">
                    <header>
                        <h5>Suggestions for you</h5>
                        <h5 style={{ color: "purple" }} >See all</h5>
                    </header>
                    <br />
                    <div>
                        <div className="suggestion mb-3 " >
                            <main>
                                <img src={require('../../images/profile_girl.jpg')} className="profile-pic" alt="" />
                                <section className="ml-2" >
                                    <h6>Sarah Tranco</h6>
                                    <p>@dr. sarah</p>
                                </section>
                            </main>
                            <Button color="violet" className="h-50">Follow</Button>
                        </div>
                        <div className="suggestion mb-3" >
                            <main>
                                <img src={require('../../images/chef.jpg')} className="profile-pic" alt="" />
                                <section className="ml-2" >
                                    <h6>Chef Johnson</h6>
                                    <p>@chefjonny</p>
                                </section>
                            </main>
                            <Button appearance="ghost" color="blue" className="h-50" >Followed</Button>
                        </div>
                        <div className="suggestion" >
                            <main>
                                <img src={require('../../images/people1.jpg')} className="profile-pic" alt="" />
                                <section className="ml-2" >
                                    <h6>Christina Merphy</h6>
                                    <p>@christinaM</p>
                                </section>
                            </main>
                            <Button color="violet" className="h-50" >Follow</Button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="advert">
                    {
                        !user ? <Loader size="md" center /> : user.recent ? (
                            <React.Fragment>
                                <h6>Latest post activity.</h6>
                                <div className="post">
                                    <div className="post-content">
                                        <div className="w-50">
                                            {user.recent.image && <img src={user.recent.image} alt="" />}
                                            {user.recent.video && <video src={user.recent.video} controls></video>}
                                            {user.recent.text && <p className="post-text" >{user.recent.text}</p>}
                                        </div>
                                        <div className="ratings" >
                                            <p className="date" >Published: {this.formatDate(user.recent.createdAt)}</p>
                                            <section>
                                                <Icon icon="commenting-o p-2" className={this.getCommentClasses(user.recent)} > {user.recent.comments.length}</Icon>
                                                {this.getLikeClasses(user.recent)}
                                                <Icon icon="share p-2" > {user.recent.shares.length}</Icon>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/me/home">More posts.</Link>
                            </React.Fragment>
                        ) : <h6>No recent post activity. </h6>
                    }
                </div>
                <Footer />
            </div>
        )
    }

    getLikeClasses(post) {
        const { user } = this.props
        const postlen = post.likes.length;
        for (let i = 0; i < postlen; i++) {
            let liker = post.likes[i];
            if (liker._id.toString() === user._id.toString()) {
                return (
                    <i className="fa fa-thumbs-o-up text-danger"
                    > {post.likes.length}</i>
                )
            }
        }
        return (
            <i className="fa fa-thumbs-o-up"
            > {post.likes.length}</i>
        )
    }

    getCommentClasses(post) {
        const { user } = this.props
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

    formatDate(input) {
        const createdAt = new Date(input)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let date = createdAt.getDate() + "";
        date = date.padStart(2, "0") + " " + months[createdAt.getMonth()] + ", " + createdAt.getFullYear()
        return date
    }
}

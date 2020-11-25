import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import Profile from './User/Profile';
import Search from './Search';
import Chat from '../Chat/Chat';
import FriendRequests from './User/FriendRequests';
import Friends from './User/Friends';
import NewsFeed from './Posts/NewsFeed';
import SpecPost from './Posts/specPost'
import { likePost, unlikePost, saveComment, getPosts, savePost } from '../../services/postService'
import { acceptFriendRequest, declineFriendRequest, unFriendUser, cancelFriendRequest, sendFriendRequest } from '../../services/friendsService'
import ProtectedRoute from '../common/protectedRoute'
import { storage } from '../../firebase'
import { getUserProps } from '../../services/userService';
import { getCurrentUser } from '../../services/authService';
import { Loader } from 'rsuite';


class RightBody extends Component {
    state = {
        vidUrl: "",
        text: "",
        file: "",
        imgUrl: "",
        uploading: false,
        posts: [],
        user: '',
        isLoading: true
    }

    async componentDidMount() {
        //get current user's token
        const result = getCurrentUser()

        // get posts from database
        const { data } = await getPosts()
        this.setState({ posts: data })

        // get user details

        const { data: user } = await getUserProps(result._id)
        this.setState({ user })
        this.setState({ isLoading: false })
    }

    // set the file in the state
    setFile = (file) => {
        this.setState({ file })
    }

    // set the text in the state
    setText = (text) => {
        this.setState({ text })
    }

    // like a post
    LikePost = async (id) => {
        await likePost(this.state.user._id, id)
        const { data } = await getPosts()
        this.setState({ posts: data })
    }

    // unlike a post
    unLikePost = async (id) => {
        await unlikePost(this.state.user._id, id)
        const { data } = await getPosts()
        this.setState({ posts: data })
    }

    // post a comment on a post
    postComment = async (id, comment) => {
        await saveComment(this.state.user._id, id, comment)
        document.getElementById(id).value = ""
        const { data } = await getPosts()
        this.setState({ posts: data })
    }

    //upload video or image post
    handleUpload = (e) => {
        e.preventDefault()
        const { file } = this.state
        this.setState({ uploading: true })
        if (file === "") {
            this.createPost()
            this.setState({ uploading: false })
        } else {
            // allowed image types
            const imageTypes = ["image/webp", "image/png", "image/jpeg", "image/jpg", "image/gif"]

            // upload the video or image
            const uploadTask = storage.ref(`uploads/${file.name}`).put(file)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref("uploads")
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {

                            // check whether upload is image or video
                            if (imageTypes.includes(file.type)) {
                                // set the imgUrl in the state
                                this.setState({ imgUrl: url })
                                this.createPost()
                            } else {
                                // set the vidUrl in the state 
                                this.setState({ vidUrl: url })
                                this.createPost()
                            }
                        })
                })
        }
    }

    //delete preview of image
    delImgPreview = () => {
        this.setState({ file: "" })
        document.getElementById('previews').style.display = "none"
        document.getElementById("image").style.display = "none";
        document.getElementById("img-preview").style.display = "none"
        document.getElementById("img-preview").setAttribute("src", "")
        document.getElementById("img-preview").removeAttribute("src")
    }

    //delete preview of video
    delVidPreview = () => {
        this.setState({ file: "" })
        document.getElementById('previews').style.display = "none"
        document.getElementById("video").style.display = " none";
        document.getElementById('video-preview').style.display = "none"
        document.getElementById('video-preview').setAttribute("src", "")
        document.getElementById('video-preview').removeAttribute("src")
    }


    //preview an image
    previewImg = (e) => {
        let file = e.target.files
        if (file.length > 0) {
            let fileReader = new FileReader()
            fileReader.onload = function (event) {
                document.getElementById("previews").style.display = "";
                document.getElementById("image").style.display = "";
                document.getElementById("img-preview").style.display = "";
                document.getElementById("img-preview").setAttribute("src", event.target.result)
            };
            fileReader.readAsDataURL(file[0])
            this.setState({ file: file[0] })
        }
    }

    //preview a video
    previewVideo = (e) => {
        let file = e.target.files
        if (file.length > 0) {
            let fileReader = new FileReader()
            fileReader.onload = function (event) {
                document.getElementById("previews").style.display = "";
                document.getElementById("video").style.display = "";
                document.getElementById("video-preview").style.display = "";
                document.getElementById("video-preview").setAttribute("src", event.target.result)
            };
            fileReader.readAsDataURL(file[0])
            this.setState({ file: file[0] })
        }
    }

    //create a post
    createPost = async () => {
        // get state 
        const { text, imgUrl, vidUrl } = this.state
        await savePost(text, imgUrl, vidUrl, this.state.user._id)

        //clear state after creating post
        this.setState({ text: "" })
        this.setState({ imgUrl: "" })
        this.setState({ vidUrl: "" })

        //delete previews of post's image and video
        this.delImgPreview()
        this.delVidPreview()
        document.getElementById('post').value = ""

        //get updated data from server and set the state
        const { data: posts } = await getPosts()
        this.setState({ posts })
        this.setState({ uploading: false })
    }

    // send friend request
    sendfriendRequest = async (myId, reqId) => {
        await sendFriendRequest(myId, reqId)
        const { data } = await getUserProps(myId);
        this.setState({ user: data })
    }


    // cancel sent friend requets
    cancelfriendRequest = async (myId, reqId) => {
        await cancelFriendRequest(myId, reqId);
        const { data } = await getUserProps(myId);
        this.setState({ user: data })
    }

    // accept a friend request
    acceptfriendRequest = async (myId, reqId) => {
        await acceptFriendRequest(myId, reqId);
        const { data } = await getUserProps(myId)
        this.setState({ user: data })
    };

    // decline a friend request
    declinefriendRequest = async (myId, reqId) => {
        await declineFriendRequest(myId, reqId);
        const { data } = await getUserProps(myId)
        this.setState({ user: data })
    };

    // unfriend a friend
    unfriend = async (myId, reqId) => {
        await unFriendUser(myId, reqId);
        const { data } = await getUserProps(myId);
        this.setState({ user: data })
    };


    render() {
        const { posts, text, uploading, user, isLoading } = this.state

        return isLoading ? <Loader size="md" center /> : (
            <div className="right-side" >
                {/* Creating paths to different routes */}
                <Switch >
                    {/* Posts' route and path */}
                    <ProtectedRoute exact path="/me/home" render={props => <NewsFeed {...props} user={user}
                        // setting props to posts route
                        unlikePost={this.unLikePost} likePost={this.LikePost}
                        posts={posts} uploading={uploading}
                        text={text} createPost={this.createPost}
                        handleUpload={this.handleUpload} setText={this.setText}
                        previewImg={this.previewImg} previewVideo={this.previewVideo}
                        delImgPreview={this.delImgPreview} delVidPreview={this.delVidPreview}
                    />}
                    />

                    {/* Searching route */}
                    <ProtectedRoute path="/me/search/" render={props => <Search {...props} user={user}
                        acceptfriendRequest={this.acceptfriendRequest}
                        declinefriendRequest={this.declinefriendRequest}
                        unfriend={this.unfriend}
                        cancelfriendRequest={this.cancelfriendRequest}
                        sendfriendRequest={this.sendfriendRequest}
                    />
                    }
                    />

                    {/* Profile route */}
                    <ProtectedRoute path="/me/profile" render={props => <Profile {...props} user={user} />} />

                    {/* Chatting route  */}
                    <ProtectedRoute path="/me/chats" render={props => <Chat {...props} user={user} />} />

                    {/*  Friends route and path */}
                    <ProtectedRoute path="/me/friends" render={props => <Friends {...props}
                        user={user} unfriend={this.unfriend}
                        cancelfriendRequest={this.cancelfriendRequest}
                    />
                    }

                    />

                    {/* Friend Requests path */}
                    <ProtectedRoute path="/me/friend-requests" render={props => <FriendRequests {...props} user={user}
                        acceptfriendRequest={this.acceptfriendRequest}
                        declinefriendRequest={this.declinefriendRequest}
                    />} />

                    {/* Specific post route */}
                    <ProtectedRoute path="/me/home/posts/:id" render={props => <SpecPost {...props} postComment={this.postComment}
                        likePost={this.LikePost}
                        unlikePost={this.unLikePost}
                        user={user}
                    />}
                    />
                </Switch>
            </div>
        );
    }
}

export default RightBody;

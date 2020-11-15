import React, { Component } from 'react';
import { Button, Icon, Loader } from 'rsuite';
import Input from '@material-ui/core/Input'
import Stories from '../User/Stories';
import Posts from './Posts';
import { getPosts, savePost } from '../../../services/postService'
import { storage } from '../../../firebase/index'

class NewsFeed extends Component {
    state = {
        vidUrl: "",
        text: "",
        file: "",
        imgUrl: ""
    }

    handleUpload = (e) => {
        e.preventDefault()
        const { file } = this.state
        if (file.length > 0) {
            const imageTypes = ["image/webp", "image/png", "image/jpeg", "image/jpg", "image/gif"]

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
                            if (imageTypes.includes(file.type)) {
                                this.setState({ imgUrl: url })
                                this.createPost()
                            } else {
                                this.setState({ vidUrl: url })
                                this.createPost()
                            }
                        })
                })
        }
        this.createPost()
    }

    previewImg = (e) => {
        let file = e.target.files
        if (file.length > 0) {
            let fileReader = new FileReader()
            fileReader.onload = function (event) {
                document.getElementById("img-preview").style.display = "";
                document.getElementById("previews").style.display = "";
                document.getElementById("img-preview").setAttribute("src", event.target.result)
            };
            fileReader.readAsDataURL(file[0])
            this.setState({ file: file[0] })
        }
    }

    previewVideo = (e) => {
        let file = e.target.files
        if (file.length > 0) {
            let fileReader = new FileReader()
            fileReader.onload = function (event) {
                document.getElementById("video-preview").style.display = "";
                document.getElementById("previews").style.display = ""
                document.getElementById("video-preview").setAttribute("src", event.target.result)
            };
            fileReader.readAsDataURL(file[0])
            this.setState({ file: file[0] })
        }
    }

    createPost = async () => {
        const { text, imgUrl, vidUrl } = this.state
        await savePost(text, imgUrl, vidUrl, this.props.user._id)
        this.setState({ text: "" })
        this.setState({ imgUrl: "" })
        this.setState({ vidUrl: "" })
        document.getElementById('img-preview').style.display = "none"
        document.getElementById('img-preview').removeAttribute("src")
        document.getElementById('post').value = ""
        const { data: posts } = await getPosts()
        this.setState({ posts })
    }

    render() {
        const { user, likePost, unlikePost, posts } = this.props;
        return (
            <div >
                <Stories user={user} />
                <hr />
                <div className="section">
                    <form>
                        <img src={user.profile.profilePic} className="profile-pic mr-2" alt={user.username} />
                        <Input placeholder={`What's on your mind, ${user.username}`} id="post" className="header-input"
                            onChange={e => this.setState({ text: e.target.value })}
                            required
                        />
                        <Button color="blue" className="h-50 mt-2"
                            onClick={this.handleUpload}
                        >Post</Button>
                    </form>
                    <div className="previews" id="previews" style={{ display: "none" }}  >
                        <Loader size="md" center />
                        <img alt="" style={{ display: "none" }} id="img-preview" />
                        <video id="video-preview" controls style={{ display: "none" }} ></video>
                    </div>
                    <br />
                    <footer className="make-post">
                        <section>
                            <label>
                                <input type="file" onChange={(e) => this.previewImg(e)} />
                                <i className="fa fa-photo uploadButton text-primary" componentclass="i" /></label>
                            <label>
                                <input type="file" onChange={(e) => this.previewVideo(e)} />
                                <i className="fa fa-video-camera uploadButton text-secondary" componentclass="i" /></label> Video/ Photo
                    </section>
                        <section>
                            <Icon icon="user" className="text-warning mr-2" componentclass="i" /> Tag Friends
                    </section>
                        <section>
                            <Icon icon="smile-o" className="text-warning mr-2" componentclass="i" /> Feeling / Activity
                    </section>
                        <Icon icon="ellipsis-h" componentclass="i" />
                    </footer>
                </div>
                <br />
                <Posts likePost={likePost} unlikePost={unlikePost} user={user} posts={posts} />
            </div>
        )
    }

}

export default NewsFeed;

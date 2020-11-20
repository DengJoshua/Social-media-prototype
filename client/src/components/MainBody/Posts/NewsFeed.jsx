import React, { Component } from 'react';
import { Icon } from 'rsuite';
import Input from '@material-ui/core/Input'
import Stories from '../User/Stories';
import Posts from './Posts';
import { getPosts, savePost } from '../../../services/postService'
import { storage } from '../../../firebase/index'
import Spinner from '../../common/Spinner';

class NewsFeed extends Component {
    state = {
        vidUrl: "",
        text: "",
        file: "",
        imgUrl: "",
        uploading: false
    }

    handleUpload = (e) => {
        e.preventDefault()
        const { file } = this.state
        this.setState({ uploading: true })
        if (file === "") {
            this.createPost()
            this.setState({ uploading: false })
        } else {
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
    }

    delImgPreview = () => {
        this.setState({ file: "" })
        document.getElementById('previews').style.display = "none"
        document.getElementById("image").style.display = "none";
        document.getElementById("img-preview").style.display = "none"
        document.getElementById("img-preview").setAttribute("src", "")
        document.getElementById("img-preview").removeAttribute("src")
    }

    delVidPreview = () => {
        this.setState({ file: "" })
        document.getElementById('previews').style.display = "none"
        document.getElementById("video").style.display = " none";
        document.getElementById('video-preview').style.display = "none"
        document.getElementById('video-preview').setAttribute("src", "")
        document.getElementById('video-preview').removeAttribute("src")
    }


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

    createPost = async () => {
        const { text, imgUrl, vidUrl } = this.state
        await savePost(text, imgUrl, vidUrl, this.props.user._id)
        this.setState({ text: "" })
        this.setState({ imgUrl: "" })
        this.setState({ vidUrl: "" })
        this.delImgPreview()
        this.delVidPreview()
        document.getElementById('post').value = ""
        const { data: posts } = await getPosts()
        this.setState({ posts })
        this.setState({ uploading: false })
    }

    render() {
        const { user, likePost, unlikePost, posts } = this.props;
        const { uploading } = this.state
        return (
            <React.Fragment>
                {uploading ? <Spinner /> : ""}
                <div style={{ padding: "10px" }} >
                    <Stories user={user} />
                    <hr />
                    <div className="section">
                        <form>
                            <img src={user.profile.profilePic} className="profile-pic mr-2" alt={user.username} />
                            <Input placeholder={`What's on your mind, ${user.username}`} id="post" className="header-input"
                                onChange={e => this.setState({ text: e.target.value })}
                                required
                            />
                            <button className="btn btn-primary h-50 mt-2"
                                onClick={this.handleUpload}
                            >Post</button>
                        </form>
                        <div className="previews" id="previews" style={{ display: "none" }}  >
                            <div id="image" style={{ display: "none" }} >
                                <button onClick={() => this.delImgPreview()} className="btn btn-danger">x</button>
                                <img alt="" style={{ display: "none" }} id="img-preview" />
                            </div>
                            <div id="video" style={{ display: 'none' }} >
                                <video id="video-preview" controls style={{ display: "none" }} ></video>
                                <button onClick={() => this.delVidPreview()} className="btn btn-danger">x</button>
                            </div>
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
            </React.Fragment>
        )
    }

}

export default NewsFeed;

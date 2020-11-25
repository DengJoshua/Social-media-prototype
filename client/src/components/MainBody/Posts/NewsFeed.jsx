import React, { Component } from 'react';
import { Icon } from 'rsuite';
import Input from '@material-ui/core/Input'
import Stories from '../User/Stories';
import Posts from './Posts';
import Spinner from '../../common/Spinner';

class NewsFeed extends Component {
    render() {
        const {
            user,
            likePost,
            unlikePost, posts, text,
            handleUpload,
            setText,
            uploading,
            previewImg,
            previewVideo,
            delImgPreview,
            delVidPreview
        } = this.props;

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
                                onChange={e => setText(e.target.value)}
                                required
                                value={text}
                            />
                            <button className="btn btn-primary h-50 mt-2"
                                onClick={handleUpload}
                            >Post</button>
                        </form>
                        <div className="previews" id="previews" style={{ display: "none" }}  >
                            <div id="image" style={{ display: "none" }} >
                                <button onClick={() => delImgPreview()} className="btn btn-danger">x</button>
                                <img alt="" style={{ display: "none" }} id="img-preview" />
                            </div>
                            <div id="video" style={{ display: 'none' }} >
                                <video id="video-preview" controls style={{ display: "none" }} ></video>
                                <button onClick={() => delVidPreview()} className="btn btn-danger">x</button>
                            </div>
                        </div>
                        <br />
                        <footer className="make-post">
                            <section>
                                <label>
                                    <input type="file" onChange={(e) => previewImg(e)} />
                                    <i className="fa fa-photo uploadButton text-primary" componentclass="i" /></label>
                                <label>
                                    <input type="file" onChange={(e) => previewVideo(e)} />
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

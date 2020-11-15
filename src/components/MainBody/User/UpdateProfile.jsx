import Joi from 'joi-browser';
import React from 'react'
import { getCurrentUser } from '../../../services/authService';
import { updateProfile } from '../../../services/userService';
import Form from '../../common/form';
import { Instagram } from '@material-ui/icons';
import { storage } from '../../../firebase/index';


class UpdateProfile extends Form {
    state = {
        profilePic: "",
        file: "",
        uploading: false,
        data: { _id: "", gender: "", country: "", story: "" },
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        gender: Joi.string().required().label("Gender"),
        country: Joi.string().required().label("Country"),
        story: Joi.string().label("Story")
    }

    componentDidMount() {
        const user = getCurrentUser()
        this.setState({ data: this.mapToViewModel(user._id) })
    }

    previewImg = (e) => {
        let file = e.target.files
        if (file.length > 0) {
            let fileReader = new FileReader()
            fileReader.onload = function (event) {
                document.getElementById("img-preview").setAttribute("src", event.target.result)
            };
            fileReader.readAsDataURL(file[0])
            this.setState({ file: file[0] })
        }
    }


    handleUpload = (e) => {
        e.preventDefault()
        const { file } = this.state
        if (file === '') {
            this.setState({ profilePic: "http://localhost:3000/static/media/avatar1.cec4ccb3.png" })
            this.doSubmit()
        } else {
            this.setState({ uploading: true })

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
                            this.setState({ profilePic: url })
                            this.doSubmit()
                            this.setState({ uploading: false })
                        })
                })
        }
    }

    mapToViewModel(id) {
        return {
            _id: id,
            gender: "",
            country: "",
            story: ""
        }
    }


    doSubmit = async () => {
        const { data, profilePic } = this.state
        try {
            await updateProfile(data, profilePic)
            window.location = "/me/home"
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
        console.log('works')
    }

    render() {
        return (
            <div className="home-page" >
                <div className="lefter">
                    <h1><Instagram /></h1>
                    <h4>TWEETFLASH</h4>
                </div>
                <div className="forms">
                    <form onSubmit={this.handleUpload} id="sign-up"   >
                        <h6>Update your profile</h6>
                        <img src={require('../../../images/avatar1.png')} id="img-preview" style={{ width: "150px", height: "150px" }} alt="" className="rounded-circle" />
                        <br />
                        <label>
                            <input type="file" onChange={(e) => this.previewImg(e)} />
                            <i className="fa fa-photo uploadButton text-secondary" />
                        </label> Change
                        {this.createInput("story", "Create story")}
                        {this.createInput("country", "Enter Country")}
                        {this.createInput("gender", "Enter Gender")}
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdateProfile;
import React, { Component } from 'react'
import { Icon, Button } from 'rsuite'
import Footer from './Footer'
import Notifications from './Notifications';
import { Link } from 'react-router-dom';


export default class LeftBody extends Component {
    state = {
        query:''
    }

    handleSearch = () => {
        const {  query } = this.state
        window.location = `/me/search/?query=${query}`
    }
    
    render() {
        const { user } = this.props;
        const { query } = this.state;

        return (
            <div className="left-body mt-3 " >
                <Notifications user={user} />
            <header className="notification-bar">
                <input type="text" placeholder="Search" id="search" onChange={e => this.setState({ query: e.target.value }) } /> 
                <Link to={`/me/search/?query=${query}`}  
                onClick={() => document.getElementById('search').value = ""}
                ><i className="fa fa-search search-btn" style={{fontSize:'25px'}}  /></Link>
                <Button appearance="ghost" className="rounded-circle" style={{ height:"50px",width:"50px"}}
                onClick={() => document.getElementById('notifications').style.display ="block"}>
                <Icon icon="bell" style={{fontSize:"25px"}} />
                </Button>
                <Button appearance="primary" className="rounded-circle" style={{ height:"50px",width:"50px",position:"unset"}}
                componentClass="button"
                >
                <i className="fa fa-paper-plane" style={{fontSize:"25px"}} ></i>             
                </Button>
            </header> 
            
           <br/>
           <div className="suggestions">
               <header>
                   <h5>Suggestions for you</h5>
                    <h5 style={{color:"purple"}} >See all</h5>
               </header>
               <br/>
               <div>
                   <div className="suggestion mb-3 " >
                   <main>
                       <img src={require('../../images/profile_girl.jpg')} className="profile-pic" alt=""/>
                       <section className="ml-2" >
                          <h6>Sarah Tranco</h6> 
                          <p>@dr. sarah</p> 
                       </section>
                   </main>
                   <Button color="violet" className="h-50">Follow</Button>
                   </div>
                   <div className="suggestion mb-3" >
                   <main>
                       <img src={require('../../images/chef.jpg')} className="profile-pic" alt=""/>
                       <section className="ml-2" >
                          <h6>Chef Johnson</h6> 
                          <p>@chefjonny</p> 
                       </section>
                   </main>
                   <Button appearance="ghost" color="blue" className="h-50" componentClass="button" style={{position:'unset'}} >Followed</Button>
                   </div>
                   <div className="suggestion" >
                   <main>
                       <img src={require('../../images/people1.jpg')} className="profile-pic" alt=""/>
                       <section className="ml-2" >
                          <h6>Christina Merphy</h6> 
                          <p>@christinaM</p> 
                       </section>
                   </main>
                   <Button color="violet" className="h-50" componentClass="button" style={{position:'unset'}} >Follow</Button>
                   </div>
               </div>
           </div>
           <hr/>
            <div className="advert">
                <h5>Latest post activity.</h5>
                <br/>
                <div className="post">
                    <img src={require('../../images/gondol.jpg')} alt=""/>
                    <div className="ratings" >
                    <h6>Snow Boarding</h6>
                    <section>
                        <Icon icon="commenting-o p-2" className="text-primary" > 12</Icon>
                        <Icon icon="heart p-2" className="text-danger" > 244</Icon>
                        <Icon icon="share p-2" > 12</Icon>
                    </section>
                   </div>
                </div> 
                <br/>
                <h5 className="text-center">See all posts.</h5>
           </div>
            <Footer />
        </div>
        )
    }
}

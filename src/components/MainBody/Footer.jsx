import React, { Component } from 'react'
import { Icon } from 'rsuite'


class Footer extends Component {
    render() {
        return (
            <div className="footer">
               <h6><Icon icon="copyright" /> Copyright {new Date().getFullYear()}</h6>
               Powered by <a href="/">Tweetflash.co</a>
           </div>
        )
    }
}

export default Footer;
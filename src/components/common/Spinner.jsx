import React, { Component } from 'react'

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={require('../../images/spinner.gif')}
                style={{width:"80px"}}
                className="spinner"
                alt=""/>
            </div>
        )
    }
}

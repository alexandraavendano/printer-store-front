import React from "react";
import './Banner.css'

class Banner extends React.Component {
    render () {
        const image = require(`../images/${this.props.image}.png`).default;

        return (
            <div className="image-text">
                <div>
                    <h1>{this.props.message}</h1>
                    <h2>{this.props.submessage}</h2>
                </div>
                <img src={image} className="App-logo" alt="logo2" />
            </div>
        )
    }
}

export default Banner;
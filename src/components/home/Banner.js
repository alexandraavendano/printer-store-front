import React from "react";
import './Banner.css'

function Banner(props) {
    const image = require(`../../images/${props.image}`).default;
    return (
        <div className="image-text">
            <div>
                <h1>{props.message}</h1>
                <h2>{props.submessage}</h2>
            </div>
            <img src={image} className="App-logo" alt="logo2"/>
        </div>
    )
}

export default Banner;
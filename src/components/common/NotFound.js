import './NotFound.css';

function NotFound() {
    const image = require(`../images/404.gif`).default;
    return (
        <div>
            <img src={image} className={"center_content"} alt={404}/>
        </div>
    )
}

export default NotFound;
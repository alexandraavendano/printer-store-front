import './notFound.css';

function NotFound() {
    const image = require(`../../images/not_found_page.gif`).default;
    return (
        <div>
            <img src={image} className={"center_content"} alt={404}/>
        </div>
    )
}

export default NotFound;
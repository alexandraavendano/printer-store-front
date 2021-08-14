import {Link} from "react-router-dom";

function ErrorAlert(props) {
    return (
        <div className="alert alert-danger" role="alert">
            This is a danger alert—check it out!
        </div>
    )
}

function SuccessAlert(props) {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                User created ! To access out application please follow the nex link: <Link to="/login">Log
                in</Link>
            </div>
        </div>
    )
}

function NoneAlert(props) {
    return (
        <div></div>
    )
}

function CustomAlert(props) {
    if(props.error == null){
        return <NoneAlert/>
    } else if (!props.error) {
        return <SuccessAlert message={""}/>
    } else {
        return  <ErrorAlert message={""}/>
    }
}

export default CustomAlert;
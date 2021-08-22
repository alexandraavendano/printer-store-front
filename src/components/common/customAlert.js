function ErrorAlert(props) {
    return (
        <div className="alert alert-danger" role="alert">
            <span>{props.message}</span>
        </div>
    )
}

function SuccessAlert(props) {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                <span>{props.message} &nbsp;
                <a href={`${props.link.url}`} className="alert-link">{props.link.title}</a></span>
            </div>
        </div>
    )
}

function NoneAlert() {
    return (
        <div/>
    )
}

function CustomAlert(props) {
    if(props.isError == null){
        return <NoneAlert/>
    } else if (!props.isError) {
        return <SuccessAlert message={props.successMessage} link={props.link}/>
    } else {
        return  <ErrorAlert message={props.errorMessage}/>
    }
}

export default CustomAlert;
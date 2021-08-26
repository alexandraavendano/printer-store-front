import React, {useState} from "react";
import {saveEmployee} from "../../helpers/externalCalls";
import {Button, Modal} from "react-bootstrap";
import CustomAlert from "../../common/customAlert";
import {FloatingInput, FloatingInputPassword} from "../../helpers/formHelper";

export function CreateEmployeeModal(props) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [isSuccess, setIsSuccess] = useState("empty");

    const onSubmit = (e) => {
        const employee = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            jobTitle: jobTitle,
        }

        saveEmployee(setIsSuccess, employee);
    }

    const clean = () => {
        setFirstName("");
        setLastName("");
        setJobTitle("");
        setPassword("");
        setEmail("");
        setIsSuccess("empty");
        props.handleClose();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    {isSuccess === "true"
                        ? <CustomAlert isError={false} successMessage={"Employee created!"}
                                       link={{"url": "/employees", "title": ""}}/>
                        : <div/>
                    }
                    <div className="row">
                        <div className="col">
                            <FloatingInput title={"First Name"} value={firstName} handleChange={setFirstName}
                                           id={"firstName"} maxLength={"25"}/>
                        </div>
                        <div className="col">
                            <FloatingInput title={"Last Name"} value={lastName} handleChange={setLastName}
                                           id={"lastName"} maxLength={"25"}/>
                        </div>
                    </div>
                    <FloatingInput title={"Email"} value={email} handleChange={setEmail} id={"email"} maxLength={"25"}/>
                    <FloatingInputPassword title={"Password"} value={password} handleChange={setPassword}
                                           id={"password"} maxLength={"15"}/>
                    <FloatingInput title={"Job Title"} value={jobTitle} handleChange={setJobTitle} id={"jobTitle"}
                                   maxLength={"25"}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={clean}> Close </Button>
                    {isSuccess === "true"
                        ? <div/>
                        : <Button variant="primary" onClick={(e) => onSubmit(e)}>Save Changes </Button>
                    }
                </Modal.Footer>
            </form>
        </Modal>
    )
}
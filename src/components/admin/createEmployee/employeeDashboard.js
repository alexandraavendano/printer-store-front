import {BsSearch} from "react-icons/all";
import React, {useEffect, useState} from "react";
import './employeeDashboard.css';

function getData(setEmployees) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }

    fetch("http://localhost:8080/employees", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setEmployees(result);
            }, (error) => {
                console.log(error);
            }
        )
}


//TODO: Add functionality search button. Create add, edit and delete button.
export default function EmployeeDashboard() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getData(setEmployees);
    }, [])

    return (
        <div>
            <div className="input-group">
                <div className="input-group rounded">
                    <input type="search"
                           className="form-control rounded"
                           placeholder="Search"
                           aria-label="Search"
                           aria-describedby="search-addon"/>
                    <span className="input-group-text border-0" id="search-addon">
                    <BsSearch size={15}/>
                </span>
                </div>
            </div>
            <div className={"table-container"}>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee =>
                        <tr key={employee.email}>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role.name}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div>
                <button type="button" className="btn btn-secondary btn-sm">Add employee</button>
            </div>
        </div>
    )
}
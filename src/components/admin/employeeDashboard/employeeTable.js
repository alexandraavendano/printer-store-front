import {getUserName} from "../../helpers/dtos";
import React from "react";

export function EmployeeTable(props) {
    const employees = props.employees;

    return (
        <div className={"table-container"}>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee =>
                    <tr key={employee.email}>
                        <td>{employee.email === getUserName()
                            ? <div/>
                            : <input className="form-check-input" type="checkbox" value={employee.email}
                                     id="flexCheckDefault" onClick={(e) => props.setSelectedEmployees(e)}/>
                        }
                        </td>
                        <td>{employee.firstName} {employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.jobTitle}</td>
                        <td>{employee.role.name}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}
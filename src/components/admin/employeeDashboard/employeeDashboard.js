import React, {useEffect, useState} from "react";
import './employeeDashboard.css';
import {Spinner} from "react-bootstrap";
import {deleteEmployee, getEmployees} from "../../helpers/externalCalls";
import {SearchBar} from "../../common/searchBar";
import {EmployeeTable} from "./employeeTable";
import {CreateEmployeeModal} from "./employeeModal";

//TODO:
// Add search button functionality OK
// Create add OK
// Edit
// Delete button. OK
export default function EmployeeDashboard() {
    const [employees, setEmployees] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => setRefresh(!refresh);
    const handleClose = () => {
        handleRefresh();
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleSelectedEmployees = (e) => {
        const employeeId = e.target.value;
        selectedEmployees.has(employeeId) ? selectedEmployees.delete(employeeId) : selectedEmployees.add(employeeId);
        setSelectedEmployees(selectedEmployees);
    }

    const handleDelete = () => {
        for (let employee of selectedEmployees) {
            deleteEmployee(handleRefresh, employee)
        }
    }

    useEffect(() => {
        const url = "http://localhost:8080/employees";
        const urlQuery = query !== "" ? url + `?query=${query}` : url
        getEmployees(urlQuery, setEmployees);
    }, [refresh, query])

    if (employees === null) {
        return (<Spinner animation="border"/>)
    } else {
        return (
            <div>
                <SearchBar query={query} setQuery={setQuery}/>
                <EmployeeTable employees={employees} setSelectedEmployees={handleSelectedEmployees}/>
                <div>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleShow}>Add employee
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleDelete}
                            style={{marginLeft: 15}}>Delete
                    </button>
                </div>
                <CreateEmployeeModal show={show} handleClose={handleClose}/>
            </div>
        )
    }
}
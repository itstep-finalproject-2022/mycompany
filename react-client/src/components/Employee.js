import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { EditEmployeeModal } from "./EditEmployeeModal";


export class Employee extends Component{

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'employee/')
            .then(response => response.json())
            .then(data => {
                this.setState({employees: data});
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empid) {
        if (window.confirm('Are u sure?')) {
            fetch(process.env.REACT_APP_API + 'employee/' + empid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } 
            });
        }
    }


    render() {
        const {employees, empid, empname, empdep, empdate, empphoto} = this.state;
        const addModalClose = () => this.setState({addModalShow: false});
        const editModalClose = () => this.setState({editModalClose: false});

        return(
            <div>
                <Table className="mt-4"  striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Date of joining</th>
                            <th>Photo</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(emp => (
                                <tr key={emp.EmployeeId}>
                                    <td>{emp.EmployeeId}</td>
                                    <td>{emp.EmployeeName}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.DateOfJoining}</td>
                                    <td>{emp.PhotoFileName}</td>
                                    <td>
                                    <ButtonToolbar>
                                            <Button 
                                            className="mr-2"
                                            style={{width: '100px'}} 
                                            variant="success"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                empid: emp.EmployeeId,
                                                empname: emp.EmployeeName,
                                                empdep: emp.Department,
                                                empdate: emp.DateOfJoining,
                                                empphoto: emp.PhotoFileName
                                            })}
                                        >
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button 
                                            className="mr-2" 
                                            style={{width: '100px'}} 
                                            variant="danger"
                                            onClick={() => this.deleteEmp(emp.EmployeeId)}
                                        >
                                                Delete
                                            </Button>
                                            <EditEmployeeModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                empid={empid}
                                                empname={empname}
                                                empdep={empdep}
                                                empdate={empdate}
                                                empphoto={empphoto}
                                            />
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <br/>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({addModalShow: true})}>
                        Add employee
                    </Button>
                    <AddEmployeeModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        );
    }

}

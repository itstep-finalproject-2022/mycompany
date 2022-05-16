import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";


export class EditEmployeeModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let empId = event.target.EmployeeId.value;
        fetch(process.env.REACT_APP_API + 'employee/', + empId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: event.target.EmployeeId.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                DateOfJoining: event.target.DateOfJoining.value,
                PhotoFileName: event.target.PhotoFileName.value
            })
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
        })
        .catch((error) => {
            alert('Failed operation -> ' + error);
        });
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeId">
                                        <Form.Label>EmployeeId</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="EmployeeId" 
                                            placeholder="Employee Id" 
                                            defaultValue={this.props.empid}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="EmployeeName" 
                                            placeholder="Employee Name" 
                                            defaultValue={this.props.empname}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="Department" 
                                            placeholder="Department" 
                                            defaultValue={this.props.empdep}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>Date of joining</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="DateOfJoining" 
                                            placeholder="DateOfJoining" 
                                            defaultValue={this.props.empdate}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="PhotoFileName">
                                        <Form.Label>PhotoFileName</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="PhotoFileName" 
                                            placeholder="Photo" 
                                            defaultValue={this.props.empphoto}
                                            required
                                        />
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                                <br/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

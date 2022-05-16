import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";


export class AddEmployeeModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: null,
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
        .error(() => {
            alert('Failed operation');
        });
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Employee name</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" placeholder="Employee Name" required/>
                                        <br/>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control type="text" name="Department" placeholder="Department" required/>
                                        <br/>
                                        <Form.Label>Date of joining</Form.Label>
                                        <Form.Control type="date" name="DateOfJoining" placeholder="Date of joining" required/>
                                        <br/>
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control type="text" name="PhotoFileName" placeholder="Photo" required/>
                                        <br/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add employee
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
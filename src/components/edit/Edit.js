import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Edit(props) {
    //func for submit button / done button
    function submit() {
        if (!props.input || props.input && !props.input.prob) alert("type your problem")
        else {
            let ind = JSON.parse(sessionStorage.getItem("key"))
            props.setform((prev) => {
                prev.splice(ind, 1, props.input)
                return [...prev]
            })
            props.setinput()
            props.setshowedit(false)

        }
    }
    function cancel() {
        props.setinput()
        props.setshowedit(false)
    }


    return (
        <>
            <Modal
                dialogClassName="modal-90w"
                show={true}
                onHide={cancel}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>update form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='px-5'>
                        <Row className='heading px-2 justify-content-center'>
                            <Col className='p-1' md={5} xs={9}>
                                <div style={{ margin: "auto", textAlign: "center" }}>
                                    <h2 style={{ color: 'dodgerblue', marginBottom: "-0.5%" }}>
                                        Pain & Functional Description
                                    </h2>
                                    <span>
                                        The description of the current situation gives your Optimum Trainer a picture of and clues to the underlying causes of your problem
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className='formBox mt-3 justify-content-center'>
                            <Col className='p-1' md={9} xs={"auto"}>
                                <Form >
                                    <div className='prob_txtarea'>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                If you have problem/aches, stiffness,
                                                weakness/functional problems, describe this/these
                                                below(list the symptoms with the descending order with the
                                                most troublesome first.)</Form.Label>
                                            <Form.Control
                                                as={"textarea"}
                                                placeholder='type here'
                                                name="prob"
                                                onChange={props.handlechange}
                                                value={props.input.prob ? props.input.prob : ''}
                                                rows={3} />
                                        </Form.Group>
                                    </div>
                                    <div className='opt1'>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ marginRight: "5%" }}>
                                                Have you been diagnosed with this problem?
                                            </Form.Label>
                                            {props.comopt.map((e, i) => {
                                                return (
                                                    <Form.Check
                                                        key={i}
                                                        inline
                                                        label={e.label}
                                                        name="opt1"
                                                        type={'radio'}
                                                        value={e.value}
                                                        checked={props.input.opt1 ? props.input.opt1 == e.value
                                                            : ""}
                                                        id={`default-${e.value}-opt1`}
                                                        onChange={props.handlechange}
                                                    />
                                                )
                                            })}
                                        </Form.Group>
                                    </div>
                                    <div className='opt2'>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ marginRight: "5%" }}>
                                                Did the problem start after a physical trauma?
                                            </Form.Label>
                                            {props.comopt.map((e, i) => {
                                                return (
                                                    <Form.Check
                                                        key={i}
                                                        inline
                                                        label={e.label}
                                                        name="opt2"
                                                        type={'radio'}
                                                        value={e.value}
                                                        checked={props.input.opt2 ? props.input.opt2 == e.value
                                                            : ""}
                                                        onChange={props.handlechange}
                                                        id={`default-${e.value}-opt2`}
                                                    />
                                                )
                                            })}
                                        </Form.Group>
                                    </div>
                                    <div className='opt3'>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ marginRight: "5%" }}>
                                                Did the problem start after a mental trauma?
                                            </Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                {props.comopt.map((e, i) => {
                                                    return (
                                                        <Form.Check
                                                            key={i}
                                                            inline
                                                            label={e.label}
                                                            name="opt3"
                                                            type={'radio'}
                                                            value={e.value}
                                                            checked={props.input.opt3 ? props.input.opt3 == e.value
                                                                : ""}
                                                            onChange={props.handlechange}
                                                            id={`default-${e.value}-opt3`}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className='opt4'>
                                        <Form.Group className="mb-3" onChange={props.handlechange}>
                                            <Form.Label>
                                                How often do you experience the problem?
                                            </Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                {props.opt4.map((e, i) => {
                                                    return (
                                                        <Form.Check
                                                            key={i}
                                                            inline
                                                            label={e.label}
                                                            name="opt4"
                                                            type={'radio'}
                                                            value={e.value}
                                                            defaultChecked={props.input.opt4 ? props.input.opt4 == e.value
                                                                : ""}
                                                            id={`default-${e.value}-4`}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className='opt5'>
                                        <Form.Group className="mb-3" onChange={props.handlechange}>
                                            <div className='label'>
                                                <Form.Label>
                                                    When do you experience the problem?
                                                </Form.Label>
                                            </div>
                                            <div className='opt mb-3' key={`inline-checkbox`} style={{ verticalAlign: "middle", display: "inline-block", width: "30%" }}>
                                                {props.opt5.map((e, i) => {
                                                    const val = props.input.opt5.find((x) => {
                                                        return (
                                                            e.value == x
                                                        )
                                                    })
                                                    return (
                                                        <Form.Check
                                                            key={i}
                                                            label={e.label}
                                                            name="opt5"
                                                            type={'checkbox'}
                                                            value={e.value}
                                                            defaultChecked={props.input.opt5 ? val && val.length > 0
                                                                : ""}
                                                            id={`default-${e.value}-5`}
                                                        />
                                                    )
                                                })}
                                            </div>
                                            <div className='txtarea' style={{ display: "inline-block", width: "60%", verticalAlign: "middle" }}>
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder='Other? For example in rotations , side bends , wing stairs , when working with the arm above the head'
                                                    name="exp"
                                                    rows={3}
                                                    defaultValue={props.input.exp ? props.input.exp : ''}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className='opt6'>
                                        <Form.Group className="mb-3" onChange={props.handlechange}>
                                            <Form.Label>
                                                How intense is the experience of the problem on average on a 0-10 scale?
                                            </Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                {props.arr.map((e, i) => {
                                                    return (
                                                        <Form.Check
                                                            key={i}
                                                            inline
                                                            label={e}
                                                            name="opt6"
                                                            type={'radio'}
                                                            value={e}
                                                            defaultChecked={props.input.opt6 ? props.input.opt6 == e
                                                                : ""}
                                                            id={`default-${e}-6`}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </Form.Group>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mt-4'>
                            <hr></hr>
                            <Col
                                md={2}
                                xs={"auto"}
                            >
                                <Button onClick={cancel}>cancel</Button>
                            </Col>

                            <Col
                                md={2}
                                xs={"auto"} >
                                <Button onClick={submit}>done</Button>
                            </Col>
                        </Row>
                    </Container >
                </Modal.Body>
            </Modal>
        </>
    )
}
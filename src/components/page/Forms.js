import { useState } from "react"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Forms({ form, comOpt, opt4, opt5, arr, edi }) {
    // console.log(props)

    return (
        <>
            {form && form.map((ele, ind) => {
                if (!ele) return ''
                else
                    return (
                        <Container key={ind} className='px-5'>
                            <Row className='heading mt-3 justify-content-end'>
                                <Col md={2} xs={"auto"}>
                                    <Button variant='secondary' onClick={() => edi(ind)}>
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='heading px-2 mt-3 justify-content-center'>
                                <Col className='p-1' xs={"8"} md={5}>
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
                                <Col className='p-1' xs={"auto"} md={9}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>If you have problem/aches,stiffness,weakness/functional problems,describe this/these below(list the symptoms with the descending order with the most troublesome first.)</Form.Label>
                                            <Form.Control as={"textarea"} placeholder='type here' name="prob" rows={3} readOnly value={ele.prob} />
                                        </Form.Group>
                                        <Form.Group className="opt1 mb-3">
                                            <Form.Label style={{ marginRight: "5%" }}>
                                                Have you been diagnosed with this problem?
                                            </Form.Label>
                                            {comOpt.map((e, i) => {
                                                return (
                                                    <Form.Check
                                                        key={i}
                                                        disabled={ele.opt1 != e.value}
                                                        inline
                                                        label={e.label}
                                                        name="opt1"
                                                        type={'radio'}
                                                        checked={ele.opt1 == e.value}
                                                        readOnly
                                                    />
                                                )
                                            })}
                                        </Form.Group>
                                        <Form.Group className="opt2 mb-3" aria-readonly>
                                            <Form.Label style={{ marginRight: "5%" }}>
                                                Did the problem start after a physical trauma?
                                            </Form.Label>
                                            {comOpt.map((e, i) => {
                                                return (
                                                    <Form.Check
                                                        key={i}
                                                        disabled={ele.opt2 != e.value}
                                                        inline
                                                        label={e.label}
                                                        name="opt2"
                                                        type={'radio'}
                                                        checked={ele.opt2 == e.value}
                                                        readOnly
                                                    />
                                                )
                                            })}
                                        </Form.Group>
                                        <Form.Group className="opt3 mb-3" aria-readonly>
                                            <Form.Label style={{ marginRight: "5%" }}>
                                                Did the problem start after a mental trauma?
                                            </Form.Label>
                                            {comOpt.map((e, i) => {
                                                return (
                                                    <Form.Check
                                                        key={i}
                                                        disabled={ele.opt3 != e.value}
                                                        inline
                                                        label={e.label}
                                                        name="opt3"
                                                        type={'radio'}
                                                        checked={ele.opt3 == e.value}
                                                        readOnly
                                                    />
                                                )
                                            })}
                                        </Form.Group>
                                        <Form.Group className="opt4 mb-3" aria-readonly>
                                            <Form.Label>
                                                How often do you experience the problem?
                                            </Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                {opt4.map((e, i) => {
                                                    return (
                                                        <Form.Check
                                                            key={i}
                                                            disabled={ele.opt4 != e.value}
                                                            inline
                                                            label={e.label}
                                                            name="opt4"
                                                            type={'radio'}
                                                            checked={ele.opt4 == e.value}
                                                            readOnly
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="opt5 mb-3" aria-readonly>
                                            <div className='label'>
                                                <Form.Label>
                                                    When do you experience the problem?
                                                </Form.Label>
                                            </div>
                                            <div className='opt mb-3' key={`inline-checkbox`} style={{ verticalAlign: "middle", display: "inline-block", width: "30%" }}>
                                                {opt5.map((e, i) => {
                                                    const val = ele.opt5.find((x) => {
                                                        return (
                                                            e.value == x
                                                        )
                                                    })
                                                    const a = <Form.Check
                                                        key={i}
                                                        disabled={val && e.value != val}
                                                        label={e.label}
                                                        type={'checkbox'}
                                                        name='opt5'
                                                        defaultChecked={val && val.length > 0}
                                                        readOnly
                                                    />
                                                    const b = <Form.Check
                                                        key={i}
                                                        disabled={true}
                                                        label={e.label}
                                                        name='opt5'
                                                        type={'checkbox'}
                                                    />
                                                    return (ele.opt5.length > 0 ? a : b)
                                                })}
                                            </div>
                                            <div className='textarea' style={{ display: "inline-block", width: "60%", verticalAlign: "middle" }}>
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder='Other? For example in rotations , side bends , wing stairs , when working with the arm above the head'
                                                    name="exp"
                                                    rows={3}
                                                    readOnly
                                                    value={ele.exp}
                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="opt6 mb-3" aria-readonly>
                                            <Form.Label>
                                                How intense is the experience of the problem on average on a 0-10 scale?
                                            </Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                {arr.map((e, i) => {
                                                    return (
                                                        <Form.Check
                                                            key={i}
                                                            disabled={ele.opt6 != e}
                                                            inline
                                                            label={e}
                                                            name="opt6"
                                                            type={'radio'}
                                                            checked={ele.opt6 == e}
                                                            readOnly
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <hr></hr>
                        </Container >
                    )
            })}
        </>
    )

}
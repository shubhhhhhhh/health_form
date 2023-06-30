import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function InputBox({ comOpt, opt4, opt5, arr,input,handleChange,submit }){
    
    return(
        <Container className='my-4 px-5 form'>
                <Row className='heading px-2 mt-3 justify-content-center'>
                    <Col className='p-1' md={5} xs={"8"}>
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
                    <Col className='p-1 px-2' xs={"auto"} md={9} >
                        <Form>
                            <div className='prob_txtarea'>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>
                                        If you have problem / aches, stiffness, weakness / functional problems,
                                        describe this / these below(list the symptoms with the descending order
                                        with the most troublesome first.)
                                    </Form.Label>
                                    <Form.Control
                                        as={"textarea"}
                                        placeholder='type here'
                                        name="prob"
                                        onChange={handleChange}
                                        rows={3}
                                        value={(input && input.prob) ?? ''}
                                    />
                                </Form.Group>
                            </div>
                            <div className='opt1'>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginRight: "5%" }}>
                                        Have you been diagnosed with this problem?
                                    </Form.Label>
                                    {comOpt.map((e, i) => {
                                        return (
                                            <Form.Check
                                                key={i}
                                                inline
                                                label={e.label}
                                                name="opt1"
                                                type={'radio'}
                                                id={`default-${e.value}-opt1`}
                                                value={e.value}
                                                checked={(input && input.opt1 == e.value) ?? false}
                                                onChange={handleChange}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </div>
                            <div className='opt2'>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginRight: "5%" }}>
                                        Did the problem start after a physical trauma?
                                    </Form.Label>
                                    {comOpt.map((e, i) => {
                                        return (
                                            <Form.Check
                                                key={i}
                                                inline
                                                label={e.label}
                                                name="opt2"
                                                type={'radio'}
                                                value={e.value}
                                                id={`default-${e.value}-opt2`}
                                                checked={(input && input.opt2 == e.value) ?? false}
                                                onChange={handleChange}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </div>
                            <div className='opt3'>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ marginRight: "5%" }}>
                                        Did the problem start after a mental trauma?
                                    </Form.Label>
                                    {comOpt.map((e, i) => {
                                        return (
                                            <Form.Check
                                                key={i}
                                                inline
                                                label={e.label}
                                                name="opt3"
                                                type={'radio'}
                                                value={e.value}
                                                id={`default-${e.value}-opt3`}
                                                checked={(input && input.opt3 == e.value) ?? false}
                                                onChange={handleChange}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </div>
                            <div className='opt4'>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        How often do you experience the problem?
                                    </Form.Label>
                                    <div key={`inline-radio`} className="mb-3">
                                        {opt4.map((e, i) => {
                                            return (
                                                <Form.Check
                                                    key={i}
                                                    inline
                                                    label={e.label}
                                                    name="opt4"
                                                    type={'radio'}
                                                    value={e.value}
                                                    id={`default-${e.value}-opt4`}
                                                    checked={(input && input.opt4 == e.value) ?? false}
                                                    onChange={handleChange}
                                                />
                                            )
                                        })}
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='opt5'>
                                <Form.Group className="mb-3">
                                    <div className='label'>
                                        <Form.Label>
                                            When do you experience the problem?
                                        </Form.Label>
                                    </div>
                                    <div className='opt mb-3' key={`inline-checkbox`} style={{ verticalAlign: "middle", display: "inline-block", width: "30%" }}>
                                        {opt5.map((e, i) => {
                                            const val = input && input.opt5.find((x) => {
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
                                                    id={`default-${e.value}-opt5`}
                                                    checked={(val && val.length > 0) ?? false}
                                                    onChange={handleChange}
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
                                            value={(input && input.exp) ?? ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='opt6'>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        How intense is the experience of the problem on average on a 0-10 scale?
                                    </Form.Label>
                                    <div key={`inline-radio`} className="mb-3">
                                        {arr.map((e, i) => {
                                            return (
                                                <Form.Check
                                                    key={i}
                                                    inline
                                                    label={e}
                                                    name="opt6"
                                                    type={'radio'}
                                                    value={e}
                                                    id={`default-${e}-opt6`}
                                                    checked={(input && input.opt6 == e) ?? false}
                                                    onChange={handleChange}
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
                    <Col md={5} xs={4} style={{ padding: ".5% 0" }}><hr></hr></Col>
                    <Col md={1} xs={2} style={{ padding: "0.5%", display: "flex", justifyContent: "center" }}>
                        <Button className='addbtn' onClick={submit}>+</Button>
                    </Col>
                    <Col md={5} xs={4} style={{ padding: "0.5% 0" }}><hr></hr></Col>
                </Row>
            </Container >
    )
}
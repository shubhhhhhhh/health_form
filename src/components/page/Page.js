import { useEffect, useRef, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MainContext } from '../../context/Context';
import { useNavigate } from 'react-router';
import Edit from '../edit/Edit';

export default function Page() {
    const { datas, setDat } = useContext(MainContext);

    const [form, setForm] = useState();     //state for form data
    const [input, setInput] = useState();   //state for formBox

    useEffect(() => {
        if (datas) {
            setForm(datas)
        }
    }, [])

    // useEffect(() => {
    //     console.log(input)
    // }, [input])

    //arrays for dynamic fields in form inputs
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let opt5 = [{ label: "Not relevant", value: "nr" }, { label: "When lying down", value: "wld" }, { label: "When sitting", value: "ws" }, { label: "Under Standing", value: "us" }, { label: "In Walking", value: "in" }]
    let comOpt = [{ label: "Not relevant", value: "nr" }, { label: "Yes", value: "yes" }, { label: "No", value: "no" }]
    let opt4 = [{ label: "Not relevant", value: "nr" }, { label: "Daily", value: "d" }, { label: "Several times/week", value: "st/w" }, { label: "A few times/month", value: "aft/m" }, { label: "A few times/year", value: "aft/y" }]

    function handleChange(event) {
        if (event.target.type == 'radio' || event.target.type == 'textarea') {
            if (!input || input && !input.opt5)
                setInput({ ...input, [event.target.name]: event.target.value, opt5: [] })
            else setInput({ ...input, [event.target.name]: event.target.value })
        }
        else {
            //logic for opt5
            if (!input || input && !input.opt5) {
                let arr = [event.target.value]
                setInput({ ...input, [event.target.name]: arr })
            }
            else {
                if (event.target.checked) {
                    let arr = [...input.opt5, event.target.value]
                    setInput({ ...input, [event.target.name]: arr })
                }
                else {
                    let arr = [...input.opt5.filter(e => e != event.target.value)]
                    setInput({ ...input, [event.target.name]: arr })
                }
            }
        }
    }

    //  if form has data then set it to context
    useEffect(() => {
        // console.log(form)
        setDat(form)
    }, [form])

    //for reset formBox
    const formRef = useRef(null)

    //func for submit button / + button
    function submit() {
        if (!input || input && !input.prob) alert("type your problem")
        else {
            if (!form) setForm([input])
            else setForm([...form, input])
            setInput()
            formRef.current.reset()
        }
    }

    //func for next button
    const navigate = useNavigate()
    function next() {
        if (input) {
            submit()
            setTimeout(() => {
                navigate("/summary")
            }, 100)
        }
        else
            if (form) {
                setTimeout(() => {
                    navigate("/summary")
                }, 100)
            }
            else alert("there is no form")
    }

    const [showEdit, setShowEdit] = useState(false);
    const viewEdit = showEdit ?
        <Edit
            formref={formRef}
            setshowedit={setShowEdit}
            form={form}
            setform={setForm}
            handlechange={handleChange}
            input={input}
            setinput={setInput}
            comopt={comOpt}
            opt4={opt4}
            opt5={opt5}
            arr={arr}
        /> : " "

    function edi(index) {
        setInput(form[index])
        setShowEdit(true);
        sessionStorage.setItem("key", JSON.stringify(index))
    }

    return (
        <>
            <Container className='my-5 '>
                <Row className='heading mt-3 justify-content-center'>
                    <Col className='p-1' md={5} xs={"auto"}>
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
                        <Form ref={formRef}>
                            <div className='prob_txtarea'>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>
                                        If you have problem/aches,stiffness,weakness/functional problems,describe this/these below(list the symptoms with the descending order with the most troublesome first.)
                                    </Form.Label>
                                    <Form.Control as={"textarea"} placeholder='type here' name="prob" onChange={handleChange} rows={3}  />
                                </Form.Group>
                            </div>
                            <div className='opt1'>
                                <Form.Group className="mb-3" onChange={handleChange}>
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
                                                id={`default-${e.value}-1`}
                                                value={e.value}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </div>
                            <div className='opt2'>
                                <Form.Group className="mb-3" onChange={handleChange}>
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
                                                id={`default-${e.value}-2`}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </div>
                            <div className='opt3'>
                                <Form.Group className="mb-3" onChange={handleChange}>
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
                                                id={`default-${e.value}-3`}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </div>
                            <div className='opt4'>
                                <Form.Group className="mb-3" onChange={handleChange}>
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
                                                    id={`default-${e.value}`}
                                                />
                                            )
                                        })}
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='opt5'>
                                <Form.Group className="mb-3" onChange={handleChange}>
                                    <div className='label'>
                                        <Form.Label>
                                            When do you experience the problem?
                                        </Form.Label>
                                    </div>
                                    <div className='opt mb-3' key={`inline-checkbox`} style={{ verticalAlign: "middle", display: "inline-block", width: "30%" }}>
                                        {opt5.map((e, i) => {
                                            return (
                                                <Form.Check
                                                    key={i}
                                                    label={e.label}
                                                    name="opt5"
                                                    type={'checkbox'}
                                                    value={e.value}
                                                    id={`default-${e.value}`}
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
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='opt6'>
                                <Form.Group className="mb-3" onChange={handleChange}>
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
                                                    id={`default-${e}`}
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
                    <Col md={12} xs={"auto"}>
                        <div style={{ width: "47.5%", display: 'inline-block', verticalAlign: 'middle' }}><hr></hr></div>
                        <div style={{ width: "5%", display: 'inline-block', verticalAlign: 'middle' }}>
                            <Button onClick={submit}>+</Button>
                        </div>
                        <div style={{ width: "47.5%", display: 'inline-block', verticalAlign: 'middle' }}><hr></hr></div>
                    </Col>
                </Row>
            </Container >
            {form && form.map((ele, ind) => {
                if (!ele) return ''
                else
                    return (
                        <Container key={ind}>
                            <Row className='heading mt-3 justify-content-end'>
                                <Col md={2} xs={"auto"}>
                                    <Button variant='secondary' onClick={() => edi(ind)}>
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='heading mt-3 justify-content-center'>
                                <Col className='p-1' xs={"auto"} md={5}>
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
                                            <div className='opt mb-3' key={`inline-checkbox`} style={{ verticalAlign: "middle", display: "inline-block", width: "20%" }}>
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
                                                        defaultChecked={val && val.length > 0 }
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
                                                    defaultValue={ele.exp}
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
            <Container>
                <Row className='justify-content-center mt-3 mb-5'>
                    <Col xs={"auto"} md={12} style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <Button onClick={next} style={{ width: '8rem' }}>next</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            {viewEdit}
        </>
    )
}
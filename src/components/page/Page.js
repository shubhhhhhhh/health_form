import { useEffect, useRef, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MainContext } from '../../context/Context';
import { useNavigate } from 'react-router';
import Edit from '../edit/Edit';
import './page.css';
import Forms from './Forms';

export default function Page() {
    const { datas, setDat } = useContext(MainContext);      //accessing state context 
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
        setDat(form)
    }, [form])

    //func for submit button / + button
    function submit() {
        if (!input || input && !input.prob) alert("type your problem")
        else {
            if (!form) setForm([input])
            else setForm([...form, input])
            setInput()
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
    function edi(index) {
        setInput(form[index])
        setShowEdit(true);
        sessionStorage.setItem("key", JSON.stringify(index))
    }

    const props = {
        form: form,
        comOpt: comOpt,
        opt4: opt4,
        opt5: opt5,
        arr: arr,
        edi: edi
    }

    return (
        <>
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

            <Forms {...props} />

            <Container className='nextButton px-5'>
                <Row className='justify-content-center mt-3 mb-5'>
                    <Col xs={"auto"} md={12} style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <Button onClick={next} style={{ width: '8rem' }}>next</Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {showEdit ?
                <Edit
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
                /> : " "}
        </>
    )
}
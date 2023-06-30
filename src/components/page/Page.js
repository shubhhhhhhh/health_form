import { useEffect, useRef, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MainContext } from '../../context/Context';
import { useNavigate } from 'react-router';
import './page.css';
import Forms from './Forms';
import InputBox from './InputBox';
import EditBox from '../edit/EditBox';

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
        edi: edi,
        input:input,
        handleChange:handleChange,
        submit:submit
    }

    return (
        <>
            <InputBox {...props}/>

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
                <EditBox
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
import React from "react";
import { MainContext } from "../../context/Context";
import { useContext } from "react"
import { Col, Container, Navbar, Table, Row, Button, } from "react-bootstrap";
import { useNavigate } from "react-router";
import './summary.css'

export default function Summary() {
    const { datas } = useContext(MainContext)
    // console.log(datas)

    const navigate = useNavigate()

    function back() {
        navigate('/')
    }

    return (
        <>
            <Container className="my-3">
                <Row className="justify-content-center my-2 headng">
                    <Col xs={"auto"} md={4} style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <h1>
                                Summary
                            </h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="Table" style={{ width: "100%", marginBottom: "0.5rem" }}>
                        {datas && datas.map((ele, ind) => {
                            let exp
                            if (ele.exp && ele.opt5.length > 0) {
                                exp = " and " + ele.exp
                            }
                            else exp = ele.exp
                            // console.log(ind+"-table")
                            return (
                                <React.Fragment key={ind} >
                                    <Table
                                        striped
                                        bordered
                                        variant="light"
                                        hover
                                        style={{ margin: "5% 0" }}
                                    >
                                        <tbody >
                                            <tr className="d-flex">
                                                <th className="col-9" >
                                                    If you have problem/aches, stiffness, weakness/functional problems, describe this/these below(list the symptoms with the descending order with the most troublesome first.)
                                                </th>
                                                <td className="col-3">
                                                    {ele.prob}
                                                </td>
                                            </tr>
                                            <tr className="d-flex">
                                                <th className="col-9">
                                                    Have you been diagnosed with this problem?
                                                </th>
                                                <td className="col-3">
                                                    {ele.opt1}
                                                </td>
                                            </tr>
                                            <tr className="d-flex">
                                                <th className="col-9">
                                                    Did the problem start after a physical trauma?
                                                </th>
                                                <td className="col-3">
                                                    {ele.opt2}
                                                </td>
                                            </tr>
                                            <tr className="d-flex">
                                                <th className="col-9">
                                                    Did the problem start after a mental trauma?
                                                </th>
                                                <td className="col-3">
                                                    {ele.opt3}
                                                </td>
                                            </tr>
                                            <tr className="d-flex">
                                                <th className="col-9">
                                                    How often do you experience the problem?
                                                </th>
                                                <td className="col-3">
                                                    {ele.opt4}
                                                </td>
                                            </tr>
                                            <tr className="d-flex">
                                                <th className="col-9">
                                                    When do you experience the problem?
                                                </th>
                                                <td className="col-3">
                                                    {ele.opt5.map((e, i) => {
                                                        if (e == "nr") return " Not relevant "
                                                        else if (e == "wld") return " When lying down "
                                                        else if (e == "ws") return " When sitting "
                                                        else if (e == "us") return " Under standing "
                                                        else if (e == "in") return " In Walking "
                                                    }).join(",")}{exp}
                                                </td>
                                            </tr>
                                            <tr className="d-flex">
                                                <th className="col-9">
                                                    How intense is the experience of the problem on average on a 0-10 scale?
                                                </th>
                                                <td className="col-3">
                                                    {ele.opt6}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <hr></hr>
                                </React.Fragment>
                            )
                        })
                        }
                    </Col>
                </Row>
                <Row className="justify-content-center mb-5 bbtn">
                    <Col xs={"auto"} style={{ display: "flex", justifyContent: "center" }} md={12}>
                        <Button className="backButton" onClick={back}>back</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
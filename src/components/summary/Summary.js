import { MainContext } from "../../context/Context";
import { useContext } from "react"
import { Col, Container, Navbar, Table, Row, Button, } from "react-bootstrap";
import { useNavigate } from "react-router";

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
                <Row className="justify-content-center my-2">
                    <Col md={4}>
                        <div>
                            <h1>
                                Summary
                            </h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="Table" style={{ width: "100%", marginBottom: "0.5rem", overflowY: "scroll", overflowX: "scroll", }}>
                        {datas && datas.map((ele, ind) => {
                            let exp
                            if(ele.exp && ele.opt5.length>0){
                                exp  =  " and " +  ele.exp
                            }
                            else exp = ele.exp
                            return (
                                <Table
                                    key={ind}
                                    striped
                                    bordered
                                    variant="light"
                                    hover
                                    responsive="sm"
                                    style={{marginBottom:"5%"}}
                                >
                                    <tbody>
                                        <tr>
                                            <th>
                                                If you have problem/aches,stiffness,weakness/functional problems,describe this/these below(list the symptoms with the descending order with the most troublesome first.)
                                            </th>
                                            <th>
                                                {ele.prob}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                Have you been diagnosed with this problem?
                                            </th>
                                            <th>
                                                {ele.opt1}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                Did the problem start after a physical trauma?
                                            </th>
                                            <th>
                                                {ele.opt2}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                Did the problem start after a mental trauma?
                                            </th>
                                            <th>
                                                {ele.opt3}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                How often do you experience the problem?
                                            </th>
                                            <th>
                                                {ele.opt4}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                When do you experience the problem?
                                            </th>
                                            <th>
                                                {ele.opt5.map(e=>{
                                                    if(e == "nr")return " Not relevant "
                                                    else if(e == "wld")return " When lying down "
                                                    else if(e == "ws")return " When sitting "
                                                    else if(e == "us")return " Under standing "
                                                    else if(e == "in")return " In Walking "
                                                }).join(",") }{exp}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                How intense is the experience of the problem on average on a 0-10 scale?
                                            </th>
                                            <th>
                                                {ele.opt6}
                                            </th>
                                        </tr>
                                    </tbody>
                                </Table>
                            )
                        })
                        }
                    </Col>
                </Row>
                <Row className="justify-content-center mb-5">
                    <Col md={2}>
                        <Button onClick={back}>back</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
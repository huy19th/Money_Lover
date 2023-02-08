
import Container from "react-bootstrap/Container";
import {Col, Row, SSRProvider} from "react-bootstrap";
import LayoutReport from "@/components/UI/LayoutReport";
import TransDetails from "@/components/UI/DashBoard/TransDetail";

const Report =()=>{
    return(
        <LayoutReport>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto" >
                        <TransDetails/>
                    </Col>
                </Row>
            </Container>
        </LayoutReport>
    )
}
export default Report;
import Report from "@/components/UI/Report";
import TransDetails from "@/components/UI/DashBoard/TransDetails";
import {Col, Row} from "react-bootstrap";
import TransOverview from "@/components/UI/DashBoard/TransOverview";
import Container from "react-bootstrap/Container";
import * as React from "react";

export default function TransactionDetail() {
    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto" >
                        <TransDetails/>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
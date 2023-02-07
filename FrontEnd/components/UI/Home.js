import NavBar from "@/components/shares/Header";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SideNavBar from "@/components/shares/SideBar";
import {Col, Row, SSRProvider} from "react-bootstrap";
import Layout from "@/components/Layout";
import TransDetails from "@/components/shares/TransDetail";

const Home=()=>{
    return(
        <Layout>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto" >
                        <TransDetails/>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
export default Home
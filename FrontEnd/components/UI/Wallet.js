import NavBar from "@/components/shares/NavBar";
import WalletList from "@/components/UI/Wallet/WalletList";
import WalletDetailCard from "./Wallet/WalletDetailCard";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Wallet() {
    return (
        <div className="d-flex justify-content-center bg-secondary bg-opacity-25" style={{height: "100vh", width: "100vw"}}>
            <NavBar/>
            <Row className="mt-5 pt-5" style={{"min-width": "80%"}}>
                <Col xs={5}>
                    <WalletList />
                </Col>
                <Col xs={7}>
                    <WalletDetailCard />
                </Col>
            </Row>
            
        </div>
    )
}
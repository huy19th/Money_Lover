import NavBar from "@/components/shares/NavBar";
import WalletList from "@/components/UI/Wallet/WalletList";
import Container from 'react-bootstrap/Container';


export default function Wallet() {
    return (
        <div className="d-flex justify-content-center bg-secondary bg-opacity-25" style={{height: "100vh"}}>
            <NavBar/>
            <WalletList />
        </div>
    )
}
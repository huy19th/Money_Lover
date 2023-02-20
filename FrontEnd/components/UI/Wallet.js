import NavBar from "@/components/shares/NavBar";
import WalletList from "@/components/UI/Wallet/WalletList";

export default function Wallet() {
    return (
        <div className="d-flex justify-content-center bg-secondary bg-opacity-25" style={{ height: "100vh", width: "100vw" }}>
            <NavBar />
            <WalletList />
        </div >
    )
}
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import WalletService from '@/services/wallet.service';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from '@/features/wallet/walletSlice';

export default function WalletDeleteDialog({ wallet, setShow, setShowDetail }) {

    const dispatch = useDispatch();

    const currentWallet = useSelector(state => state.wallet.currentWallet);

    const handleClose = () => setShow(false);

    const handleDelete = async() => {
        dispatch(walletActions.resetWallet());
        await WalletService.deleteWallet(wallet.id);
        let wallets = (await WalletService.getAllWalletsOfUser()).data;
        dispatch(walletActions.getWallets(wallets));
        handleClose();
        setShowDetail(false);
    }

    return (
        <>
            <Modal show={true} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete {wallet.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You will also delete all of its transactions, budgets, events, bills and this action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="text" color="success" onClick={handleClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
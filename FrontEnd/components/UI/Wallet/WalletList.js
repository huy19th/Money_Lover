import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import WalletService from '@/services/wallet.service';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SpinnerLoading from '@/components/shares/Spinner';
import AdjustBalanceDialog from './AdjustBalanceDialog';

function ListItems({ data, setData }) {
    const [show, setShow] = useState(false);
    const [selectedItem, setItem] = useState();

    return (
        <Table bordered hover>
            <tbody>
                {
                    data.length ?
                        data.map(item =>
                            <tr>
                                <td key={item.id} className="ps-3">
                                    <Row>
                                        <Col xs={1} className="d-flex align-items-center">
                                            <img src="https://static.moneylover.me/img/icon/icon.png" alt="" style={{ height: "40px" }} />
                                        </Col>
                                        <Col xs={8}>
                                            <p className="mb-0 fw-bolder text-bottom">{item.name}</p>
                                            <span className="text-secondary" style={{ ["font-size"]: "13px" }}>
                                                {WalletService.formatMoney(item.balance)}
                                            </span>
                                        </Col>
                                        <Col xs={3}>
                                            <span className="text-success"
                                                onClick={() => {
                                                    setShow(true);
                                                    setItem(item);
                                                }}
                                            >Adjust Balance
                                            </span>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                        :
                        <tr>
                            <td className="text-secondary ps-4">No wallets</td>
                        </tr>
                }
            </tbody>
            {
                show ?
                <AdjustBalanceDialog setShow={setShow} data={data} selectedItem={selectedItem} />
                :
                null
            }
            
        </Table>
    )
}

export default function WalletLists() {

    const user = useSelector(state => state.auth).currentUser;
    const [walletsIncludedInTotal, setWalletsIncludedInTotal] = useState({
        isLoading: true,
        data: []
    });
    const [walletsNotIncludedInTotal, setWalletsNotIncludedInTotal] = useState({
        isLoading: true,
        data: []
    });

    useEffect(() => {
        WalletService.getWalletsIncludedInTotal()
            .then(res => {
                setTimeout(() => {
                    setWalletsIncludedInTotal({
                        isLoading: false,
                        data: res.data
                    });
                }, 2000)
            });
        WalletService.getWalletsNotIncludedInTotal()
            .then(res => {
                setTimeout(() => {
                    setWalletsNotIncludedInTotal({
                        isLoading: false,
                        data: res.data
                    });
                }, 2000)
            })
    }, [])

    return (
        <div className="mt-5 pt-5">
            <Card style={{ width: '540px' }}>
                <Card.Header className="ps-4">Included In Total</Card.Header>
                {
                    walletsIncludedInTotal.isLoading ?
                        <SpinnerLoading />
                        :
                        <ListItems data={walletsIncludedInTotal.data} setData={setWalletsIncludedInTotal}/>
                }
                <Card.Header className="ps-4">Not Included In Total</Card.Header>
                {
                    walletsNotIncludedInTotal.isLoading ?
                        <SpinnerLoading />
                        :
                        <ListItems data={walletsNotIncludedInTotal.data} setData={setWalletsNotIncludedInTotal}/>
                }
            </Card>
        </div >
    );
}
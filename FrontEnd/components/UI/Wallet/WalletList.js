import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import WalletService from '@/services/wallet.service';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    const wallets = useSelector(state => state.wallet).wallets;
    const [walletsIncludedInTotal, setWalletsIncludedInTotal] = useState(
        wallets.filter(item => item.includeTotal == true)
    );
    
    const [walletsNotIncludedInTotal, setWalletsNotIncludedInTotal] = useState(
        wallets.filter(item => item.includeTotal == false)
    );

    useEffect(() => {
        console.log(wallets)
        setWalletsIncludedInTotal(wallets.filter(item => item.includeTotal == true));
        setWalletsNotIncludedInTotal(wallets.filter(item => item.includeTotal == false));
    }, [wallets])

    return (
        <Card style={{ width: '100%' }}>
            <Card.Header className="ps-4">Included In Total</Card.Header>
            <ListItems data={walletsIncludedInTotal} />
            <Card.Header className="ps-4">Not Included In Total</Card.Header>
            <ListItems data={walletsNotIncludedInTotal} />
        </Card>
    );
}
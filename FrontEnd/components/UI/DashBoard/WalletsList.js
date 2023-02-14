import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {walletActions} from "@/features/wallet/walletSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {axiosJWT} from "@/configs/axios";
import {transactionActions} from "@/features/transaction/transactionSlice";

export default function Wallets() {

    const dispatch = useDispatch()
    //

    const myWallets = useSelector(state => state.wallet.wallets)
    let balance = 0
    let inflow = 0;
    let outflow = 0;
    myWallets.map(wallet => {
        balance += wallet.balance
        inflow += wallet.inflow
        outflow += wallet.outflow
    })
    const totalWallets = {
        id: 'Total',
        name: 'Total',
        inflow: inflow,
        outflow: outflow,
        balance: balance
    }

    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (wallet) => {
        axiosJWT.get(`/transaction/${wallet.id}`)
            .then((res) => {
                dispatch(walletActions.changeCurrentWallet(wallet))
                dispatch(transactionActions.getTrans(res.data))
                setAnchorEl(null);
            })
    };

    const handleWallets = async (wallet) => {
        let transactions = (await axiosJWT.get('/transaction')).data
        dispatch(walletActions.changeCurrentWallet(wallet))
        dispatch(transactionActions.getTrans(transactions))
        setAnchorEl(null);
    }

    return (
        <div>
            <ArrowDropDownIcon onClick={handleClick} style={{color: "black"}} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleWallets(totalWallets)}>
                    <div style={{color: 'black', display: "flex", alignItems: "center"}}>
                        <div>
                            <img style={{width: '50px', marginRight: '8px'}}
                                 src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                        </div>
                        <div>
                            <p className='m-0'>Name: {totalWallets.name}</p>
                            <p className='m-0'>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalWallets.balance)}</p>
                        </div>
                    </div>
                </MenuItem>
                {myWallets.map(wallet => {
                    return <MenuItem onClick={() => handleClose(wallet)}>
                        <div style={{color: 'black', display: "flex", alignItems: "center"}}>
                            <div>
                                <img style={{width: '50px', marginRight: '8px'}}
                                     src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                            </div>
                            <div>
                                <p className='m-0'>Name: {wallet.name}</p>
                                <p className='m-0'>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(wallet.balance)}</p>
                            </div>
                        </div>
                    </MenuItem>
                })}
            </Menu>
        </div>
    );
}
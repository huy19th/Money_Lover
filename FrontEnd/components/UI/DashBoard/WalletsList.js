import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {walletActions} from "@/features/wallet/walletSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Wallets() {

    const myTrans = useSelector(state => state.transaction)

    const dispatch = useDispatch()

    const getBalance = (name, value) => {

        let trans = []

        myTrans.map(transaction => {
            if (transaction.wallet_name === name && new Date(transaction.date).getMonth()+1 === new Date().getMonth()+1 && new Date(transaction.date).getFullYear() === new Date().getFullYear() ) {
                trans.push(transaction)
            }
        })
        trans.map(tran => {
            if (tran.type_name === 'Expenese') {
                value -= tran.money
            } else {
                value += tran.money
            }
        })
        return value
    }

    const myWallet = useSelector(state => state.wallet)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (wallet) => {
        dispatch(walletActions.changeCurrentWallet(wallet))
        setAnchorEl(null);
    };

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
                {myWallet.wallets.map(wallet => {
                    return <MenuItem onClick={() => handleClose(wallet)}>
                        <div style={{color: 'black', display: "flex", alignItems: "center"}}>
                            <div>
                                <img style={{width: '50px', marginRight: '8px'}}
                                     src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
                            </div>
                            <div>
                                <p className='m-0'>Name: {wallet.name}</p>
                                <p className='m-0'>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getBalance(wallet.name, wallet.balance))}</p>
                            </div>
                        </div>
                    </MenuItem>
                })}
            </Menu>
        </div>
    );
}
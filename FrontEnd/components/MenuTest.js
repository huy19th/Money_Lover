import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {testActions} from "@/features/test/testSlice";

export default function BasicMenu() {
    const dispatch = useDispatch()
    const myArr = useSelector(state => state.test)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (wallet) => {
        dispatch(testActions.getCurrent(wallet))
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {myArr.array.map(wallet => {
                    return <MenuItem onClick={() => handleClose(wallet)}>
                        <div style={{color: 'black', display: "flex", alignItems: "center"}}>
                            <div>
                                <p className='m-0'>id: {wallet.id}</p>
                                <p className='m-0'>balance: {wallet.balance}</p>
                            </div>
                        </div>
                    </MenuItem>
                })}
            </Menu>
        </div>
    );
}
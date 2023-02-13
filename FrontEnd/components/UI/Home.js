import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BsCalendarDay } from "react-icons/bs";
import { RiFindReplaceLine } from "react-icons/ri";
import { Col, Row } from "react-bootstrap";
import TransOverview from "@/components/UI/DashBoard/TransOverview";
import Container from "react-bootstrap/Container";
import { authActions } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaWallet } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import Link from "next/link";
import {MdAccountCircle} from "react-icons/md";
import {GiWallet} from "react-icons/gi";
import AddTransactionModal from "@/components/UI/Dashboard/AddTransaction/AddTransactionModal";
import MyAvatar from "@/components/UI/DashBoard/Avatar";
import { useRouter } from "next/router";
import Wallets from "@/components/UI/DashBoard/WalletsList";
import { walletActions } from "@/features/wallet/walletSlice";
import { transactionActions } from "@/features/transaction/transactionSlice";
import AccountUser from "@/components/shares/Account";
import {axiosJWT} from "@/configs/axios";

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth, transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
    }), overflowX: 'hidden',
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), overflowX: 'hidden', width: `calc(${theme.spacing(7)} + 1px)`, [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1), // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...(open && {
        ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
    }), ...(!open && {
        ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
    }),
}),);
export default function MyHome() {


    const myWallet = useSelector(state => state.wallet.currentWallet)
    const myTrans = useSelector(state => state.transaction)

    let trans = []

    myTrans.map(transaction => {
        if (transaction.wallet_name === myWallet.name && new Date(transaction.date).getMonth() + 1 === new Date().getMonth() + 1 && new Date(transaction.date).getFullYear() === new Date().getFullYear()) {
            trans.push(transaction)
        }
    })

    let inflow = 0;
    let outflow = 0;
    trans.map(tran => {
        if (tran.type_name === 'Expenese') {
            outflow += tran.money
        } else {
            inflow += tran.money
        }
    })

    let newBalance = myWallet.balance + inflow - outflow

    //

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    const dispatch = useDispatch()

    const router = useRouter()

    return (<Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar sx={{backgroundColor: 'white'}} position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="gray"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5, ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div
                        style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                    <div style={{ color: 'black', display: "flex", alignItems: "center" }}>
                        <div style={{ color: 'black', display: "flex", alignItems: "center" }}>
                            <div>
                                <img style={{ width: '50px', marginRight: '8px' }}
                                    src="https://static.moneylover.me/img/icon/ic_category_all.png" alt="" />
                            </div>
                            <div>
                                <p className='m-0'>Name: {myWallet.name}</p>
                                <p className='m-0'>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newBalance)}</p>
                            </div>
                            <div>
                                <Wallets />
                            </div>
                        </div>

                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsCalendarDay style={{ color: 'gray', width: '50px', height: '30px', marginRight: '10px' }} />
                        <RiFindReplaceLine style={{ width: '100px', height: '30px', color: 'gray' }} />
                        {/* <Button style={{marginRight:'10px'}} > */}
                        <AddTransactionModal />
                        {/* </Button> */}
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Transactions', 'Report'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',
                                }}
                            >

                                {index % 2 === 0 ? <Link style={{ color: 'gray' }} href='/home'><FaWallet style={{ fontSize: '30px' }} /></Link> :
                                    <Link style={{ color: 'gray' }} href='/report'><TbReportMoney style={{ fontSize: '30px' }} /></Link>}

                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>))},
                <hr />
                {['Account', 'Wallet'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{

                                minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,

                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ?

                                    <AccountUser /> :
                                    // <Link style={{color: 'gray'}} href='/home'><MdAccountCircle/></Link> :
                                    <Link style={{ color: 'gray' }} href='/report'><GiWallet style={{ fontSize: '30px' }} /></Link>
                                }

                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>))}
                <ListItem key="Wallets" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',
                            }}
                        >
                            <Link style={{ color: 'gray' }} href='/wallets'>
                                <GiWallet style={{ fontSize: '30px' }} />
                            </Link>
                        </ListItemIcon>
                        <ListItemText primary="Wallets" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Drawer>
        <Box style={{ backgroundColor: '#e4e4e4', minHeight: '1000px' }} component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <TransOverview />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Box>
    </Box>)
}
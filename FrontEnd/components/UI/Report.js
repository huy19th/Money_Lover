// import * as React from 'react';
// import {styled, useTheme} from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import {RiFindReplaceLine} from "react-icons/ri";
// import {Col, Row} from "react-bootstrap";
// import Container from "react-bootstrap/Container";
// import ChartCard from "@/components/UI/Report/Chart";
// import {FaWallet} from "react-icons/fa";
// import {TbReportMoney} from "react-icons/tb";
// import Link from "next/link";
// import {GiWallet} from "react-icons/gi";
// import AccountUser from "@/components/UI/Report/Account";
//
// const drawerWidth = 240;
// const openedMixin = (theme) => ({
//     width: drawerWidth, transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
//     }), overflowX: 'hidden',
// });
// const closedMixin = (theme) => ({
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
//     }), overflowX: 'hidden', width: `calc(${theme.spacing(7)} + 1px)`, [theme.breakpoints.up('sm')]: {
//         width: `calc(${theme.spacing(8)} + 1px)`,
//     },
// });
// const DrawerHeader = styled('div')(({theme}) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1), // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
// }));
// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })(({theme, open}) => ({
//     zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
//     }), ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));
// const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
//     width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...(open && {
//         ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
//     }), ...(!open && {
//         ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
//     }),
// }),);
// export default function MyHome() {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };
//     const handleDrawerClose = () => {
//         setOpen(false);
//     };
//
//     return (<Box sx={{display: 'flex'}}>
//             <CssBaseline/>
//             <AppBar sx={{backgroundColor: 'white'}} position="fixed" open={open}>
//                 <Toolbar>
//                     <IconButton
//                         color="gray"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         sx={{
//                             marginRight: 5, ...(open && {display: 'none'}),
//                         }}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <div
//                         style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
//                         <div>
//                             <img style={{width: '50px', marginLeft: '20px'}}
//                                  src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
//                         </div>
//                         <div style={{display: 'flex', alignItems: 'center'}}>
//                             <Typography variant="h6" noWrap component="div">
//                                 Mini variant drawer
//                             </Typography>
//                             <RiFindReplaceLine style={{width: '100px', height: '30px', color: 'gray'}}/>
//                         </div>
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             <Drawer variant="permanent" open={open}>
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
//                     </IconButton>
//                 </DrawerHeader>
//                 <Divider/>
//                 <List>
//                     {['Transactions', 'Report'].map((text, index) => (
//                         <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//                             <ListItemButton
//                                 sx={{
//                                     minHeight: 48,
//                                     justifyContent: open ? 'initial' : 'center',
//                                     px: 2.5,
//                                 }}
//                             >
//                                 <ListItemIcon
//                                     sx={{
//                                         minWidth: 0,
//                                         mr: open ? 3 : 'auto',
//                                         justifyContent: 'center',
//                                     }}
//                                 >
//                                     {index % 2 === 0 ? <Link style={{color:'gray'}} href='/home'><FaWallet/></Link> : <Link  style={{color:'gray'}} href='/report'><TbReportMoney/></Link>}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))},
//                     <hr/>
//                     {['Account', 'Wallet'].map((text, index) => (
//                         <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//                             <ListItemButton
//                                 sx={{
//                                     minHeight: 48,
//                                     justifyContent: open ? 'initial' : 'center',
//                                     px: 2.5,
//                                 }}
//                             >
//                                 <ListItemIcon
//                                     sx={{
//                                         minWidth: 0,
//                                         mr: open ? 3 : 'auto',
//                                         justifyContent: 'center',
//                                     }}
//                                 >
//                                     {index % 2 === 0 ? <AccountUser/>: <Link  style={{color:'gray'}} href='/report'><GiWallet/></Link>}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//
//                 <Divider/>
//             </Drawer>
//             <Box style={{backgroundColor:'#e4e4e4',minHeight:'1000px'}} component="main" sx={{flexGrow: 1, p: 3}}>
//                 <DrawerHeader/>
//                 <div>
//                     <Container>
//                         <Row className="justify-content-md-center">
//                             <Col md="auto">
//                                 <ChartCard/>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </div>
//             </Box>
//         </Box>)
// }
import dynamic from 'next/dynamic'
import moment from "moment/moment";
import {useSelector} from "react-redux";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MyReport() {

    let myTrans = useSelector(state => state.transaction.trans)

    console.log(myTrans)

    let balance = 0
    myTrans.map(tran => {
        balance += tran.sum
    })

    let inflowByTime = 0;
    let outflowByTime = 0;
    myTrans.map(tran => {
        if (tran.sum > 0) {
            inflowByTime += tran.sum
        } else {
            outflowByTime += tran.sum
        }
    })

    let myData = []

    const getDaysByMonth = (month) => {
        const daysInMonth = moment(month).daysInMonth();
        return Array.from({length: daysInMonth}, (v, k) => k + 1)
    };

    let month = moment().format('YYYY-MM')

    const days = getDaysByMonth(month)

    for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < myTrans.length; j++) {
            if (days[i] === moment(myTrans[j].date).get('date')) {
                myData.push({
                    date: days[i],
                    balance: myTrans[j].sum
                })
                break
            }
            if (days[i] !== moment(myTrans[j].date).get('date') && j === myTrans.length-1) {
                myData.push({
                    date: days[i],
                    balance: 0
                })
            }
        }
    }

    let myDays = []
    let myNumberData = []

    myData.map(data => {
        myDays.push(data.date)
        myNumberData.push(data.balance)
    })

    let incomeTransactions = []
    let expenseTransactions = []


    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: 0,
                        to: Infinity,
                        color: 'dodgerblue'
                    }, {
                        from: -Infinity,
                        to: 0,
                        color: '#F15B46'
                    }]
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            title: {
                text: 'Growth',
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(0);
                }
            }
        },
        xaxis: {
            categories: myDays,
            labels: {
                rotate: -90
            }
        }
    }

    const series = [{
        name: 'Finance Flow',
        data: myNumberData
    }]

    return (
        <>
            <div style={{width: '600px', marginRight: "auto", marginLeft: "auto"}}>
                <div>
                    <div style={{textAlign: "center", opacity: 0.7}}>Net Income</div>
                    <div style={{textAlign: "center"}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance)}</div>
                    <div>
                        <Chart options={options} series={series} type="bar" width={"100%"} height={350} />
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: 'space-evenly'}}>
                    <div>
                        <div style={{textAlign: "center", opacity: 0.7}}>Income</div>
                        <div style={{textAlign: "center", color: 'dodgerblue'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(inflowByTime)}</div>
                    </div>
                    <div>
                        <div style={{textAlign: "center", opacity: 0.7}}>Expense</div>
                        <div style={{textAlign: "center", color: 'red'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(outflowByTime)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
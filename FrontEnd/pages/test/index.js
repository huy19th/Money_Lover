// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import SideNavBar from "@/components/shares/SideBar";
// import Button from "react-bootstrap/Button";
// import {BsCalendarDay} from "react-icons/bs";
//
//
// import {RiFindReplaceLine} from "react-icons/ri";
// import {Card, Col, Row} from "react-bootstrap";
//
//
//
// const Layout=({children})=>{
//     return(
//         <div style={{backgroundColor:'lightgray',height:'740px'}}>
//             <Navbar style={{backgroundColor:'white',height:'70px'}} bg="" expand="lg">
//                 <Container>
//                     <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="me-auto">
//                             <NavDropdown title="Total" id="basic-nav-dropdown">
//                                 <Card style={{width:'300px'}}>
//                                     <Card.Header as="h5">Select Wallet</Card.Header>
//                                     <Card.Body>
//                                         <Row>
//                                             <Col md={4}>
//                                                 <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>
//                                             </Col>
//                                             <Col md={8 }>
//                                                 Total
//                                                 <p>55252535</p>
//                                             </Col>
//                                         </Row>
//                                         <hr/>
//                                         <p>Included in total</p>
//                                         <hr/>
//                                         <Row>
//                                             <Col md={4}>
//                                                 <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/icon.png" alt=""/>
//                                             </Col>
//                                             <Col md={8 }>
//                                                 Yến Đoàn
//                                                 <p>55252535</p>
//                                             </Col>
//                                         </Row>
//                                     </Card.Body>
//                                 </Card>
//                             </NavDropdown>
//                         </Nav>
//                     </Navbar.Collapse>
//                     <BsCalendarDay style={{width:'50px',height:'30px',marginLeft:'100px'}}/>
//                     <RiFindReplaceLine style={{width:'100px',height:'30px'}}/>
//                     <Button variant="success">ADD TRANSACTION</Button>
//                 </Container>
//             </Navbar>
//             <SideNavBar/>
//             {children}
//         </div>
//     )
// }
// export default Layout

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {BsCalendarDay} from "react-icons/bs";
import {RiFindReplaceLine} from "react-icons/ri";
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import TransDetails from "@/components/UI/DashBoard/TransDetail";
import Container from "react-bootstrap/Container";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{backgroundColor: 'white'}} position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="gray"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{width:'100%',display:'flex',alignItems:'center', justifyContent: 'space-between'}}>
                        <div>
                            <img style={{width:'50px',marginLeft:'20px'}} src="https://static.moneylover.me/img/icon/ic_category_all.png" alt=""/>

                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Typography variant="h6" noWrap component="div">
                                Mini variant drawer
                            </Typography>
                            <BsCalendarDay style={{color: 'gray',width:'50px',height:'30px',marginRight:'10px'}}/>
                            <RiFindReplaceLine style={{width:'100px',height:'30px',color:'gray'}}/>
                            <Button style={{marginRight:'10px'}} variant="success">ADD TRANSACTION</Button>
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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography paragraph>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto" >
                                <TransDetails/>
                            </Col>
                        </Row>
                    </Container>
                </Typography>
            </Box>
        </Box>
    );
}
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {BsArrowRightShort} from "react-icons/bs";
import Link from "next/link";
import Input from '@mui/material/Input';
import AddWallet from "@/components/UI/DashBoard/SelectWallet";
import AddCate from "@/components/UI/DashBoard/SelectCate";
import AddDate from "@/components/UI/DashBoard/SelectDate";
const ariaLabel = { 'aria-label': 'description' };


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function AutoGrid() {
    return (<Box sx={{flexGrow: 1}}>
            <Grid style={{width: '900px'}} container spacing={3}>
                <Grid item xs={4}>
                    <Item>
                        <b style={{display:'flex',textAlign:'left'}}>Wallet</b>
                        <p style={{display:'flex',textAlign:'left'}}>
                            <img style={{width: '35px'}} src="https://static.moneylover.me/img/icon/icon.png" alt=""/>
                        {/*    <span style={{marginTop:'10px'}}>Đoàn Yến*/}
                        {/*        <Link style={{textDecoration:'none',textAlign:'right',display:'float'}} href='#'>&gt;</Link>*/}

                        {/*    </span>*/}
                            <span>
                                <AddWallet/>
                            </span>
                        </p>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <b style={{display:'flex',textAlign:'left'}}>Category</b>
                        <p style={{display:'flex',textAlign:'left'}}>
                            <img style={{width: '35px'}} src="https://static.moneylover.me/img/icon/icon.png" alt=""/>
                        {/*    <span style={{marginTop:'10px'}}> Select Category*/}
                        {/*        <Link style={{textDecoration:'none',textAlign:'right',display:'float'}} href='#'>&gt;</Link>*/}
                        {/*    </span>*/}
                            <AddCate/>
                        </p>


                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item><b style={{display:'flex',textAlign:'left'}}>Amount</b>
                        <p style={{display:'flex',textAlign:'left'}}>
                            <Box
                                component="form"
                                sx={{
                                    height: 35,
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Input placeholder="Amount" inputProps={ariaLabel} />
                            </Box>
                        </p></Item>
                </Grid>
            </Grid>
            <Grid style={{width: '900px', marginTop: '20px'}} container spacing={3}>
                <Grid item xs={4}>
                    <Item><b style={{display:'flex',textAlign:'left'}}>Date</b>
                        {/*<p style={{display:'flex',textAlign:'left'}}>*/}
                        {/*    <span style={{marginTop:'10px'}}> 08/02/2001*/}
                        {/*        <Link style={{textDecoration:'none',textAlign:'right',display:'float'}} href='#'>&gt;</Link>*/}
                        {/*    </span>*/}
                        {/*</p>*/}
                        <AddDate/>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item><b style={{display:'flex',textAlign:'left'}}>Note</b>
                        <p style={{display:'flex',textAlign:'left'}}>
                            <Box
                                component="form"
                                sx={{
                                    height: 30,
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Input style={{width:'550px'}} placeholder="Note" inputProps={ariaLabel} />
                            </Box>
                        </p></Item>
                </Grid>
            </Grid>
        </Box>);
}
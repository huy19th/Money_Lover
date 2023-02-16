import * as React from "react";
import {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import MenuItem from "@mui/material/MenuItem";
import {ListItemIcon, ListItemText, MenuList, Paper, Slide, TableContainer} from "@mui/material";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {axiosJWT} from "@/configs/axios";
import {categoryActions} from "@/features/category/categorySlice";
import {AiOutlineArrowLeft, AiOutlinePlus} from "react-icons/ai";
import AddSubCategoryForm from "@/components/UI/Category/AddSubCategoryForm";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import CategoryDetails from "@/components/UI/Category/CategoryDetail";
import SubCateDetailForm from "@/components/UI/Category/CategoryDetail";

export default function Category() {
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    const [width, setWidth] = useState(0)
    const [details, setDetails] = useState('')
    const handleClick = (subCate, category, index) =>{
        setDetails({
            subCate: subCate,
            category: category,
            index: index
        });
        setDisplay(true);
        setWidth('500px');
        window.scrollTo(0,0);
    }
    const handleClose = () =>{
        setDisplay(false);
        setWidth(0);
        // setDetails('');
    }

    const myCates = useSelector((state) => state.category);
    useEffect(() => {
        axiosJWT.get("/transaction-category").then((res) => {
            // console.log(res.data);
            dispatch(categoryActions.getCates(res.data));
        });
    }, []);
    console.log(myCates);
    if (myCates.categories.length !== 0) {
        return (
            <Box
                sx={{flexGrow: 1, backgroundColor: "#e4e4e4", minHeight: "1000px"}}
            >
                <AppBar style={{backgroundColor: "white"}} position="static">
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="black"
                                aria-label="menu"
                                sx={{mr: 2, ml: 5}}
                            >
                                <Link style={{color: "gray"}} href="/home">
                                    <AiOutlineArrowLeft/>
                                </Link>
                            </IconButton>
                            <div>
                                <h5 style={{color: "black", marginTop: "10px"}}>
                                    Categories
                                </h5>
                            </div>
                        </div>
                        <AddSubCategoryForm style={{float: "right"}}/>
                    </Toolbar>
                </AppBar>
                <Container style={{marginTop: "30px"}}>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Card style={{width: '500px', marginRight: "auto", marginLeft: "auto"}}>
                                        {myCates.categories?.map((category, index) => {
                                            return (
                                                <>
                                                    <Card.Header>{category.name}</Card.Header>
                                                    {category.subCategories?.map((subcategory) => {
                                                        return (
                                                            <Card.Body style={{padding: "0px"}} onClick = {()=>handleClick(subcategory,category, index)}>
                                                                <Paper
                                                                    sx={{
                                                                        width: 600,
                                                                        maxWidth: "100%",
                                                                        boxShadow: "none",
                                                                    }}
                                                                >
                                                                    <MenuList>
                                                                        <MenuItem>
                                                                            <ListItemIcon>
                                                                                <img
                                                                                    style={{
                                                                                        width: "40px",
                                                                                        marginRight: "10px",
                                                                                    }}
                                                                                    src="https://static.moneylover.me/img/icon/ic_category_foodndrink.png"
                                                                                    alt=""
                                                                                />
                                                                            </ListItemIcon>
                                                                            <ListItemText>
                                                                                {subcategory.name}
                                                                            </ListItemText>
                                                                        </MenuItem>
                                                                    </MenuList>
                                                                </Paper>
                                                            </Card.Body>
                                                        );
                                                    })}
                                                </>
                                            );
                                        })}
                                    </Card></TableCell>
                                    <Slide direction="up" in={display} mountOnEnter unmountOnExit>
                                        <TableCell style={{width: width , verticalAlign : "unset"}}><SubCateDetailForm data={details} close={handleClose}/></TableCell>
                                    </Slide>

                                </TableRow>
                            </TableHead>

                        </Table>
                    </TableContainer>
                </Container>

            </Box>
        );
    } else {
        return <p>Loading</p>;
    }
}

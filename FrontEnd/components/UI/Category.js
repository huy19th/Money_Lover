import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText, MenuList, Paper } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { axiosJWT } from "@/configs/axios";
import { categoryActions } from "@/features/category/categorySlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SubCateAddDiolog from "@/components/UI/Category/SubCateAddDiolog";

export default function Category() {
  const dispatch = useDispatch();
  const myCates = useSelector((state) => state.category);
  useEffect(() => {
    axiosJWT.get("/transaction-category").then((res) => {
      dispatch(categoryActions.getCates(res.data));
    });
  }, []);

  if (myCates.categories.length !== 0) {
    return (
      <Box
        sx={{ flexGrow: 1, backgroundColor: "#e4e4e4", minHeight: "1000px" }}
      >
        <AppBar style={{ backgroundColor: "white" }} position="static">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="menu"
                sx={{ mr: 2, ml: 5 }}
              >
                <Link style={{ color: "gray" }} href="/home">
                  <AiOutlineArrowLeft />
                </Link>
              </IconButton>
              <div>
                <h5 style={{ color: "black", marginTop: "10px" }}>
                  Categories
                </h5>
              </div>
            </div>
            <SubCateAddDiolog style={{ float: "right" }} />
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "30px" }}>
          <Row className="justify-content-md-center">
            <Col style={{ width: "600px" }} md="auto">
              <Card>
                {myCates.categories?.map((category) => {
                  return (
                    <>
                      <Card.Header>{category.name}</Card.Header>
                      {category.subCategories?.map((subcategory) => {
                        return (
                          <Card.Body style={{ padding: "0px" }}>
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
              </Card>
            </Col>
          </Row>
        </Container>
      </Box>
    );
  } else {
    return <p>Loading...</p>;
  }
}

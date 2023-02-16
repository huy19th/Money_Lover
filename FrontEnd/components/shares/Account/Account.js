import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FaUserCircle } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { axiosJWT } from "@/configs/axios";
import { authActions } from "@/features/auth/authSlice";
import { walletActions } from "@/features/wallet/walletSlice";
import { transactionActions } from "@/features/transaction/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ChangePassword from "./ChangePassWord";
import { categoryActions } from "@/features/category/categorySlice";
import Avatar from "@mui/material/Avatar";
import {timeActions} from "@/features/time/timeSlice";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AccountUser() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const logOut = async () => {
    await axiosJWT.get("/auth/logout", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(authActions.loggedOut());
    dispatch(walletActions.resetWallet());
    dispatch(transactionActions.resetTrans());
    dispatch(categoryActions.getCates([]));
    dispatch(timeActions.resetTime())
    router.push("/login");
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FaUserCircle style={{ fontSize: "25px" }} onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div>
            <Row>
              <Col>
                <h3>My account</h3>
              </Col>
              <Col style={{ textAlign: "right", marginRight: "30px" }}>
                <Button color="success" onClick={logOut}>
                  <b style={{ fontSize: "18px" }}>SIGN OUT</b>
                </Button>
              </Col>
            </Row>
          </div>
        </BootstrapDialogTitle>
        <DialogContent
          style={{ padding: "0px", justifyItems: "center" }}
          dividers
        >
          <div style={{ marginTop: "20px" }}>
            <Row>
              <Col sm={4}>
                <Avatar
                  style={{
                    width: "80px",
                    height: "80px",
                    marginLeft: "50px",
                  }}
                  src="/broken-image.jpg"
                />
              </Col>
              <Col>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "right", marginRight: "30px" }}>
                <Link
                  style={{ textDecoration: "none", color: "green" }}
                  href="#"
                  onClick=""
                >
                  <ChangePassword />
                </Link>
              </Col>
            </Row>
          </div>
          <hr />
          <img
            style={{ width: "550px", height: "120px" }}
            src="https://img.freepik.com/premium-vector/modern-red-orange-banner-background_181182-12801.jpg"
            alt=""
          />
          <DialogContent>Devices (1/5)</DialogContent>
          {/*<DialogContent></DialogContent>*/}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            <b>Cancel</b>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

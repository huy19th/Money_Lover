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
import { Col, Row } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { axiosJWT } from "@/configs/axios";
import { categoryActions } from "@/features/category/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { walletActions } from "@/features/wallet/walletSlice";
import { Checkbox } from "@mui/material";

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

export default function AddWalletForm() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      initialBalance: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      initialBalance: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values)
      axiosJWT
        .post("/wallet", values)
        .then(async (response) => {
          axiosJWT.get("/wallet/info").then((res) => {
            dispatch(walletActions.getWallets(res.data));
            console.log(res.data)
            handleClose();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <form>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        ADD WALLET
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add wallet
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Row>
            <Col>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <p style={{ color: "red" }}>{formik.errors.name}</p>
                )}
              </Box>
            </Col>
            <Col>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="initialBalance"
                  label="Initial balance"
                  variant="outlined"
                  name="initialBalance"
                  type="number"
                  onChange={formik.handleChange}
                />
                {formik.errors.initialBalance && formik.touched.initialBalance && (
                  <p style={{ color: "red" }}>{formik.errors.initialBalance}</p>
                )}

              </Box>
            </Col>
          </Row>
          <Row>
            <div className="ms-5 mb-3 d-flex align-items-center">
              <Checkbox color="success" />
              <div className="d-inline-flex flex-column ms-3">
                <span>Excluded from Total</span>
                <span className="text-secondary" style={{ "font-size": "12px" }}>
                  Include this wallet and its balance in the "Total" mode.
                </span>
              </div>
            </div>

          </Row>

        </DialogContent>
        <DialogActions>
          <Button
            sx={{ marginRight: "12px" }}
            variant="contained"
            color="success"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
}

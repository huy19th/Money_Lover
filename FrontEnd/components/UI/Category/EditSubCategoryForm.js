import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {AiOutlinePlus} from "react-icons/ai";
import {Col, Row} from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {axiosJWT} from "@/configs/axios";
import {categoryActions} from "@/features/category/categorySlice";
import {useFormik} from "formik";
import * as Yup from "yup";
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
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
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EditSubCategoryForm({subCate, category}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const categoryState = useSelector((state) => state.category);
    const myCates = categoryState.categories;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            cateId: category.id,
            name: subCate.name,
        },
        validationSchema: Yup.object({
            // cateId: Yup.number().required("Required"),
            name: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            axiosJWT
                .post(`/transaction-subcategory/${subCate.id}`, values)
                .then(async (response) => {
                    axiosJWT.get("/transaction-category").then((res) => {
                        dispatch(categoryActions.getCates(res.data));
                        handleClose();
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });

    useEffect(() => {
        formik.setFieldValue("cateId", category.id);
        formik.setFieldValue("name", subCate.name);
    }, [category, subCate])

    return (
        <>
            <Button variant="contained" color="success" onClick={handleClickOpen}>
                EDIT
            </Button>
            {open ?
                <form>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                        >
                            Edit SubCategory
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Row>
                                <Col>
                                    <Box sx={{minWidth: 120, marginTop: "10px"}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Cate</InputLabel>
                                            <Select
                                                value={formik.values.cateId}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Cate"
                                                name="cateId"
                                                onChange={formik.handleChange}
                                            >
                                                {myCates.map((cate) => (
                                                    <MenuItem value={cate.id}>{cate.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": {m: 1, width: "25ch"},
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            value={formik.values.name}
                                            id="name"
                                            label="Name"
                                            variant="outlined"
                                            name="name"
                                            type="text"
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.name && formik.touched.name && (
                                            <p style={{color: "red"}}>{formik.errors.name}</p>
                                        )}
                                    </Box>
                                </Col>
                            </Row>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{marginRight: "12px"}}
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
                : null
            }
        </>
    );
}

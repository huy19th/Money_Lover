import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import Button from "react-bootstrap/Button";
import SnackBar from "@/components/shares/SnackBar";
import {useState} from "react";
import {useFormik} from "formik";
import {axiosJWT} from "@/configs/axios";
import {useDispatch, useSelector} from "react-redux";
import {walletActions} from "@/features/wallet/walletSlice";
import {transactionActions} from "@/features/transaction/transactionSlice";

export default function EditTransactionForm(props) {

    const dispatch = useDispatch()

    const myWallet = useSelector(state => state.wallet.currentWallet)

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const handleClose = () => {
        props.close()
    }

    const formik = useFormik({
        initialValues: {
            walletId: props.data.wallet_name,
            subcategoryId: props.data.subCate_name,
            money: props.data.money,
            date: new Date(props.data.date)-1,
            note: props.data.note
        },
        validationSchema: Yup.object({
            money: Yup.number().required("Required"),
            note: Yup.string().nullable()
        }),
        onSubmit: values => {
            values.walletId = props.data.wallet_id;
            values.subcategoryId = props.data.subCate_id;
            console.log(values)
            axiosJWT.put(`/transaction/${props.data.id}`, values)
                .then(async (res) => {
                    if (myWallet.id === values.walletId) {
                        let wallet = (await axiosJWT.get(`/wallet/info/${values.walletId}`)).data
                        let transactions = (await axiosJWT.get(`/transaction/${values.walletId}`)).data
                        dispatch(walletActions.changeCurrentWallet(wallet))
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: values.walletId
                        }))
                    } else {
                        let wallet = (await axiosJWT.get(`/wallet/info/${values.walletId}`)).data
                        let transactions = (await axiosJWT.get('/transaction')).data
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: values.walletId
                        }))
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(walletActions.resetCurrentWallet())
                    }
                    setSnackbar({
                        severity: "success",
                        message: res.data.message
                    })
                    setOpen(true);
                })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Wallet"
                        name='walletId'
                        InputProps={{
                            readOnly: true,
                        }}
                        {...formik.getFieldProps('walletId')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Category"
                        name='subcategoryId'
                        InputProps={{
                            readOnly: true,
                        }}
                        {...formik.getFieldProps('subcategoryId')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField id="outlined-basic" label="Amount" variant="outlined" name="money"
                               {...formik.getFieldProps('money')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Date"
                            inputFormat="MM/DD/YYYY"
                            id="date"
                            name="date"
                            value={formik.values.date}
                            onChange={value => {
                                formik.setFieldValue('date', new Date(Date.parse(value)));
                            }}
                            renderInput={(params) =>
                                <TextField {...params} />
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Note" variant="outlined" fullWidth sx={{ pr: 3 }}
                               name="note" {...formik.getFieldProps('note')}
                    />
                </Grid>
                <Grid item xs={8} />
                <Grid item xs={4}>
                    <Button variant="secondary" style={{width: '45%'}} className="me-2"
                            onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button variant="primary" style={{width: '45%'}} type="submit">
                        Save
                    </Button>
                </Grid>
            </Grid>
            <SnackBar open={open} setOpen={setOpen} severity={snackbar.severity} message={snackbar.message}/>
        </form>
    )
}
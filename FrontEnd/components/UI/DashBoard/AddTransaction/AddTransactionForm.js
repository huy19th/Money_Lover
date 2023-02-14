import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {axiosJWT} from "@/configs/axios";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {transactionActions} from "@/features/transaction/transactionSlice";
import SnackBar from "@/components/shares/SnackBar";
import {walletActions} from "@/features/wallet/walletSlice";

export default function AddTransactionForm({ handleClose, data}) {
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        severity: "",
        message: ""
    })

    const dispatch = useDispatch()

    const myWallet = useSelector(state => state.wallet.currentWallet)
    const myWallets = useSelector(state => state.wallet.wallets)

    const formik = useFormik({
        initialValues: {
            walletId: '',
            subcategoryId: '',
            money: '',
            date: new Date(),
            note: ''
        },
        validationSchema: Yup.object({
            walletId: Yup.number().required("Required"),
            money: Yup.number().required("Required"),
            note: Yup.string().nullable()
        }),
        onSubmit: values => {
            let payload = {
                date: values.date,
                money: values.money,
                note: values.note,
                walletId: values.walletId,
                subcategoryId: +values.subcategoryId.split(' ')[1]
            }
            axiosJWT.post('/transaction', payload)
                .then(async res => {
                    if (values.walletId === myWallet.id) {
                        let wallet = (await axiosJWT.get(`/wallet/info/${myWallet.id}`)).data
                        console.log(wallet)
                        let transactions = (await axiosJWT.get(`/transaction/${myWallet.id}`)).data
                        dispatch(walletActions.changeCurrentWallet(wallet))
                        dispatch(transactionActions.getTrans(transactions))
                        dispatch(walletActions.changeWallets({
                            walletInfo: wallet,
                            walletId: myWallet.id
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
                .catch(err => {
                    setSnackbar({
                        severity: "error",
                        message: err.response.data.message
                    });
                    setOpen(true);
                })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {myWallet.name === 'Total' ?
                        (<FormControl fullWidth>
                        <InputLabel id="select-wallet-label">Wallet</InputLabel>
                        <Select
                            labelId="select-wallet-label"
                            id="select-wallet"
                            label="Wallet"
                            name="walletId"
                            {...formik.getFieldProps('walletId')}
                        >
                            {
                                myWallets.map(item =>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>)
                        :
                        (<FormControl fullWidth>
                            <InputLabel id="select-wallet-label">Wallet</InputLabel>
                            <Select
                                labelId="select-wallet-label"
                                id="select-wallet"
                                label="Wallet"
                                name="walletId"
                                {...formik.getFieldProps('walletId')}
                            >
                                <MenuItem value={myWallet.id}>{myWallet.name}</MenuItem>
                            </Select>
                        </FormControl>)
                    }
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select" label="Category" name='subcategoryId' {...formik.getFieldProps('subcategoryId')}>
                            <option aria-label="None" value="" />
                            {data.transCates.map(transCates => {
                                return (
                                    <>
                                        <optgroup label={transCates.name}>
                                            {transCates.subCategories.map(subCategory => {
                                                return (
                                                    <option value={`${data.name} ${subCategory.id} ${subCategory.name}`}>{subCategory.name}</option>
                                                )
                                            })}
                                        </optgroup>
                                    </>
                                )}
                            )}
                        </Select>
                    </FormControl>
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
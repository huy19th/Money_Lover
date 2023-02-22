import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import AvatarEdit from 'react-avatar-edit'
import Button from '@mui/material/Button';
import storage from "@/configs/firebase";
import {ref, deleteObject, uploadString, getDownloadURL } from "firebase/storage"
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "@/features/auth/authSlice";
import {axiosJWT} from "@/configs/axios";

export default function MyAvatar() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.currentUser)

    const [open, setOpen] = React.useState(false);
    const [imageCrop, setImageCrop] = useState(user.image);

    const onCrop = (view) => {
        setImageCrop(view)
    }

    const onCLose = () => {
        setImageCrop(null)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveImage = () => {
        if (user !== '') {
            if (user.image.length < 20) {
                // Add Firebase
                const storageRef = ref(storage, `/user-upload/${user.name}`)
                // Upload ảnh
                uploadString(storageRef, imageCrop, 'data_url').then(async (snapshot) => {
                    // Lấy url firebase
                    let image = await getDownloadURL(storageRef)
                    // Thêm DB
                    await axiosJWT.post('/user/update', image.toString())
                    // Dispatch
                    dispatch(authActions.updateUser(image))
                    handleClose()
                }).catch(err => {
                    console.log(err)
                });
            } else {
                const desertRef = ref(storage, user.image);
                deleteObject(desertRef).then(() => {
                    const storageRef = ref(storage, `/user-upload/${user.name}`)
                    uploadString(storageRef, imageCrop, 'data_url').then(async (snapshot) => {
                        // Lấy url firebase
                        let image = await getDownloadURL(storageRef)
                        // Thêm DB
                        await axiosJWT.post('/user/update', image.toString())
                        // Dispatch
                        dispatch(authActions.updateUser(image))
                        handleClose()
                    });
                }).catch((error) => {
                    console.log('Error!!!')
                });
            }
        }
    }

    if (user !== '') {
        return (
            <div>
                <img
                    alt=""
                    src={!user.image && user.image.length < 20 ? 'https://gocbao.net/wp-content/uploads/2020/10/avatar-trang-4.jpg' : user.image}
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '1px solid black'
                    }}
                    onClick={handleClickOpen}
                />
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Update {user.name}'s image</DialogTitle>
                    <AvatarEdit width={400} height={300} onClose={onCLose} onCrop={onCrop} />
                    <Button type='button' onClick={saveImage}>Save</Button>
                </Dialog>
            </div>
        );
    } else {
        return <></>
    }
}
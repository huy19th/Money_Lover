import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import AvatarEdit from 'react-avatar-edit'
import Button from '@mui/material/Button';
import storage from "@/configs/firebase";
import {ref, uploadString, getDownloadURL } from "firebase/storage"
import jwt_decode from "jwt-decode";

export default function MyAvatar() {

    // const user = jwt_decode(localStorage.getItem("token"));
    // console.log(user)

    const [open, setOpen] = React.useState(false);
    const [imageCrop, setImageCrop] = useState(false);
    const [storeImage, setStoreImage] = useState([])

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
        // Add Firebase
        const storageRef = ref(storage, `/user-upload/hi`)
        // Upload ảnh
        uploadString(storageRef, imageCrop, 'data_url').then(async (snapshot) => {
            // Lấy url firebase
            let image = await getDownloadURL(storageRef)
            setStoreImage([{imageCrop}])
            handleClose()
        });
    }

    const profileImageShown = storeImage.map(item => item.imageCrop)

    return (
        <div>
            <img
                alt=""
                src={profileImageShown.length ? profileImageShown[0] : ''}
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                }}
                onClick={handleClickOpen}
            />
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Update Image</DialogTitle>
                <AvatarEdit width={400} height={300} onClose={onCLose} onCrop={onCrop} />
                <Button type='button' onClick={saveImage}>Save</Button>
            </Dialog>
        </div>
    );
}
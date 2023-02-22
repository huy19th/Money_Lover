import AvatarEdit from 'react-avatar-edit'

function MyAvatarEdit(props) {

    const onCrop = () => {
        props.onCrop()
    }

    const onCLose = () => {
        props.onClose()
    }

    return <AvatarEdit width={400} height={300} onClose={onCLose} onCrop={onCrop} />
}

export default MyAvatarEdit
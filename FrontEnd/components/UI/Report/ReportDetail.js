import CloseIcon from '@mui/icons-material/Close';
import PieChart from "@/components/shares/PieChart";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from '../../../styles/Report.module.css'

export default function ReportDetail(props) {

    const handleClose = () => {
        props.close()
    }

    const handleCLick = (item) => {
        props.click(item)
    }

    let number = 0
    if (props.type.value) {
        props.type.value.map(item => {
            number += item.sum
        })
    }

    if (props.type.value) {
        return (
            <>
                <div style={{backgroundColor: "white"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div style={{display: "flex", alignItems: "center", borderBottom: '1px solid #ccc', width: '100%'}}>
                            <CloseIcon onClick={handleClose} className='me-3 mb-2' style={{cursor: "pointer"}}/>
                            <p className='mb-2' style={{fontSize: '16px', fontWeight: "bold"}}>{props.type.name}</p>
                        </div>
                        <div>
                            {/*Icon*/}
                        </div>
                    </div>
                    <div className='mt-5 pb-3' style={{borderBottom: '1px solid #ccc'}}>
                        <div>
                            <PieChart data={props.type.value}/>
                        </div>
                        <div style={{color: number < 0 ? 'red' : 'dodgerblue', fontSize: '24px', textAlign: "center"}}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)}
                        </div>
                    </div>
                    <div style={{marginTop: '8px'}}>
                        {props.type.value.map(item => {
                            return (
                                <div className={styles.div} style={{width: '90%', borderBottom: '1px solid #ccc', marginLeft: "auto", marginRight: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: '8px'}} onClick={() => handleCLick(item)}>
                                    <div>{item.subCate_name}</div>
                                    <div style={{color: item.sum < 0 ? 'red' : 'dodgerblue'}}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sum)}
                                        <KeyboardArrowRightIcon style={{color: '#ccc', marginLeft: '4px'}}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}
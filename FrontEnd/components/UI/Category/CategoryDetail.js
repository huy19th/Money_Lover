import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import EditSubCategoryForm from "@/components/UI/Category/EditSubCategoryForm";

function SubCateDetailForm(props) {
    const handleClose = () => {
        props.close();
    }
    console.log(props.data.subCate)
    console.log(props.data.category.transType)
    console.log(props.data.index)
    return (
        <Card style={{width:'550px'}}>
            <Card.Header >
                <Row>
                    <Col>
                        <h4><CloseIcon onClick={handleClose}/> Category details</h4>
                    </Col>
                    <Col sm={2}>
                        {/*<Button variant="danger" style={{marginRight:'5px'}}>Delete</Button>*/}
                        <EditSubCategoryForm cate={props.data.category.transType} subCate={props.data.subCate} index={props.data.index}/>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Title><h4>{props.data.subCate.name}</h4></Card.Title>
                <Card.Text><p>{props.data.category.transType.name}</p></Card.Text>
            </Card.Body>

        </Card>
    );
}

export default SubCateDetailForm;
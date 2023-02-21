import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import {useEffect} from "react";
import EditSubCategoryForm from "@/components/UI/Category/EditSubCategoryForm";


function SubCateDetailForm({data, close}) {
    const handleClose = () => {
        close();
    }
    let {category, subCate, index} = data;
    return (
        <Card style={{width:'550px'}}>
            <Card.Header >
                <Row>
                    <Col>
                        <h4><CloseIcon onClick={handleClose}/> Category details</h4>
                    </Col>
                    <Col sm={2}>
                        <EditSubCategoryForm category={category} subCate={subCate} index={index}/>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Title><h4>{subCate.name}</h4></Card.Title>
                <Card.Text><p>{category.transType.name}</p></Card.Text>
            </Card.Body>

        </Card>
    );
}

export default SubCateDetailForm;
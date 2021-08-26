import {Tab, Row, Col, Nav} from "react-bootstrap";
import {BasicInformationForm} from "../productCreation/BasicInformation";
import {CustomizationForm} from "../productCreation/Customizations";
import {ImagesForm} from "../productCreation/Images";
import React, {useEffect, useState} from "react";
import {getProductsById, saveProduct} from "../../helpers/externalCalls";
import {useParams} from "react-router";

const emptyProduct = {
    name: "",
    description: "",
    price: 0.0,
    type: {
        name: "",
        subtype: "",
    },
    images: [],
    customizable: []
}

export function ProductEdit() {
    let id = useParams();
    const [product, setProduct] = useState(emptyProduct);

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        saveProduct(product, setProduct)
    }

    const handleImageChange = (updatedImages) => {
        setProduct(prevState => ({
            ...prevState,
            images: updatedImages
        }));
        handleSave();
    };

    useEffect(() => {
            if (id.id !== "create") {
                getProductsById(setProduct, id.id);
            }
        }, [id.id])

    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Basic Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Images</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Customizations</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <BasicInformationForm product={product} handleChange={handleChange}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CustomizationForm product={product} handleChange={handleChange}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <ImagesForm product={product} handleImageChange={handleImageChange} setProduct={setProduct}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>


        </div>
    )
}
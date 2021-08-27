import {Tab, Row, Col, Nav} from "react-bootstrap";
import {BasicInformationForm} from "./BasicInformation";
import {CustomizationForm} from "./Customizations";
import {ImagesForm} from "./Images";
import React, {useEffect, useState} from "react";
import {getProductsById, getProductType, saveProductWithoutJson} from "../../helpers/externalCalls";
import {useParams} from "react-router";
import "./createProduct.css";

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

export function ProductCreateAndEdit() {
    let id = useParams();
    const [product, setProduct] = useState(emptyProduct);
    const [productTypes, setProductTypes] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        saveProductWithoutJson(product, setProduct)
    }

    const handleImageChange = (updatedImages) => {
        setProduct(prevState => ({
            ...prevState,
            images: updatedImages
        }));
    };

    useEffect(() => {
            if (id.id !== "create") {
                getProductsById(setProduct, id.id);
            }
            getProductType(setProductTypes);
        }, [id.id] )

    return (
        <div className={"nav-container"}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Basic Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Images</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Customizations</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content style={{minHeight:500}}>
                            <Tab.Pane eventKey="first">
                                <BasicInformationForm product={product} handleChange={handleChange} handleSave={handleSave} productTypes={productTypes}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CustomizationForm product={product} setProduct={setProduct}/>
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
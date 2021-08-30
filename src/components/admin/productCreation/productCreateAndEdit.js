import {Tab, Row, Col, Nav} from "react-bootstrap";
import {BasicInformationForm} from "./basicInformation";
import {CustomizationForm} from "./customizations";
import {ImagesForm} from "./images";
import React, {useEffect, useState} from "react";
import {getProductsById, getProductType, saveProduct} from "../../helpers/externalCalls";
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
        const {name, value} = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        saveProduct(product, setProduct);
    }

    const handleImageChange = (updatedImages) => {
        setProduct(prevState => ({
            ...prevState,
            images: updatedImages
        }));
    };

    const updateDefaultType = (name, subtype) => {
        setProduct(prevState => ({
            ...prevState,
            "type": {
                "name": name,
                "subType": subtype,
            }
        }))
    }

    const handleProductTypeChange = (e) => {
        const {name, value} = e.target;
        setProduct(prevState => ({
            ...prevState,
            "type": {
                ...prevState.type,
                [name]: value,
            }
        }))
    }

    useEffect(() => {
        if (id.id !== "create") getProductsById(setProduct, id.id);
        getProductType(setProductTypes).then(types => updateDefaultType(types[0].name, types[0].subType));
    }, [id.id])

    if (product.type === undefined) {
        return <div/>
    } else {
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
                                    <Nav.Link eventKey="second"
                                              disabled={id.id === "create" && product.id === undefined}>Images</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third"
                                              disabled={(id.id === "create" && product.id === undefined) || product.type.name === "Raw"}>Customizations</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content style={{minHeight: 500}}>
                                <Tab.Pane eventKey="first">
                                    <BasicInformationForm product={product} handleChange={handleChange}
                                                          handleSave={handleSave} productTypes={productTypes}
                                                          handleProductTypeChange={handleProductTypeChange}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <ImagesForm product={product} handleImageChange={handleImageChange}
                                                setProduct={setProduct}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <CustomizationForm product={product} setProduct={setProduct}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}
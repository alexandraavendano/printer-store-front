import {Tab, Row, Col, Nav} from "react-bootstrap";

export function ProductEdit(){
    return(
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
                            <div>Basic Information</div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div>Images</div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <div>Customizations</div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
import React from 'react'
import { Accordion, Card} from 'react-bootstrap';
import TranchTab from '../components/TranchTab'

import { Row, Col, Button } from 'react-bootstrap';


export default function Tranches() {
    return (
        <main className="content">
        <div className="container-fluid p-0">

            <h1 className="h3 mb-3">Gestion des tranches</h1>

            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    
                    <Row className="mt-2">
						<Col>
                        Tranche 1
            </Col>
						<Col md="auto">
              <Button  className="btn btn-primary" size="primary" data-toggle="modal" data-target="#defaultModalPrimary">
								Montant : 3500 MDT
							</Button>
            </Col>
						
					</Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <TranchTab />
</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Row className="mt-2">
						<Col>
                        Tranche 2
            </Col>
						<Col md="auto">
              <Button  className="btn btn-primary" size="primary" data-toggle="modal" data-target="#defaultModalPrimary">
								Montant : 2800 MDT
							</Button>
            </Col>
						
					</Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
        </main>
    )
}

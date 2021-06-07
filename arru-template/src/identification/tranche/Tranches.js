import React from 'react'
import { Accordion, Card} from 'react-bootstrap';
import Print from './components/PrintTranche';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

export default function Tranches() {

    const [tranches,setTranches] = React.useState([]);

    const fetchTranches= async () => {
		try {
			const url ='http://localhost:4000/api/v1/tranches/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

            console.log(res.data.tranches);
			setTranches(res.data.tranches);
			

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        fetchTranches();
    },[])

    return (
        <main className="content">
        <div className="container-fluid p-0">
            <Row>
                <Col>
                    <h1 className="h3 mb-3">Gestion des tranches</h1>
                </Col>
                <Col>
                    <button className="btn btn-primary mr-5 float-right" size="primary"><FeatherIcon icon="plus" /></button>
                </Col>
            </Row>
            
            <Accordion defaultActiveKey="0">
                { tranches.map((tranche,index) =>(
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                <Row className="mt-2">
                    <Col>
                        Tranche {tranche.numero}
                    </Col>
                </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <Print projets={tranche.projets}/>
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                ))
                }
            </Accordion>
        </div>
        </main>
    )
}

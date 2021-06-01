import React from 'react'
import Map from '../components/Map'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'

import FeatherIcon from 'feather-icons-react';
import MapFormAdd from '../components/MapFormAdd'

import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';

export default function Quartiers() {
    const animatedComponents = makeAnimated();

    const [show, setShow] = React.useState(false);
    const [gouvernorat, setGouvernorat] = React.useState(false);
    const [commune, setCommune] = React.useState("");
    const [gouvernorats, setGouvernorats] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [quartiers, setQuartiers] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    const fetchGouvernorats = async() => {
		try{
			const url ='https://priqh2.herokuapp.com/api/v1/gouvernorats/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url
			});

			let options = [];
			for(const gov of res.data.gouvernorats){
				options.push({
					label: gov.nom_fr+' - '+gov.nom_ar, value: gov.id
				});
			}

			setGouvernorats(options);
		}catch(err){
			console.log(err.response.data.message);
		}
	}

    const fetchQuartiers = async () => {
		try {
			const url ='https://priqh2.herokuapp.com/api/v1/quartiers/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			console.log("fetchQuartiers",res.data.quartiers);

		
				setQuartiers(res.data.quartiers);
		

            console.log(quartiers);

            setLoading(false);

			} catch (err) {
				console.log(err);
			}
	}

    const fetchGovQuartiers = async (gov) => {
        setLoading(true);
        
		try {
			const url ='https://priqh2.herokuapp.com/api/v1/quartiers/gouvernorat/'+gov;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			console.log("fetchQuartiers",res.data.quartiers);

		
			setQuartiers(res.data.quartiers);
		

            console.log(quartiers);

            setLoading(false);

			} catch (err) {
				console.log(err);
			}
	}

    const fetchComQuartiers = async (com) => {
        setLoading(true);
		try {
			const url ='https://priqh2.herokuapp.com/api/v1/quartiers/commune/'+com.slice(4,8);
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
            console.log(url);
			console.log("fetchQuartiers",res.data.quartiers);

		
				setQuartiers(res.data.quartiers);
		

            console.log(quartiers);

            setLoading(false);

			} catch (err) {
				console.log(err);
			}
	}

    const fetchCommunes = async(gov) => {
		console.log(gouvernorat);
		try{
			const url = `https://priqh2.herokuapp.com/api/v1/gouvernorats/${gov}/communes/`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			console.log(url);
			console.log("fetchCommunes",res.data.communes);

			let optionsCommunes = [];
			for(const com of res.data.communes){
				optionsCommunes.push({
					label: com.nom_fr+' - '+com.nom_ar, value: com.id
				});
			}

			setCommunes(optionsCommunes);
			
		}catch(err){
			console.log(err.response.data.message);
		}
	}

    React.useEffect(() => {
        setProgress(20);
        fetchQuartiers();
        setProgress(50);
        fetchGouvernorats();
        setProgress(100);
        return () => setProgress(0);
    },[]);

    return (
        <main className="content">
            <LoadingBar color='#1a2e8a' height='4px' progress={progress}  />
        <div className="container-fluid p-0">

            <h1 className="h3 mb-3">Gestion des quartiers</h1>

            <div className="row">
                <div className="col-12 col-lg-12" >
                   
                    <Container>
                        <Row>
                           
                            <Col xs={12} md={9} >
                            <Card>
                                <Card.Body>
                                    <Map quartiers={quartiers} loading={loading} />
                                </Card.Body>
                            </Card>
                            </Col>

                            <Col xs={12} md={3}>
                            <Card>
                                <Card.Header>
                                    <Button variant="primary" size="primary" block onClick={() => setShow(true)}>
                                        <FeatherIcon icon="map" /><FeatherIcon icon="plus" />
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                
                                <div className="mb-3 row">
                                    
                                    <div className="col-sm-12">
                                        <div className="boxes" >
                                            <Select
                                                placeholder="Gouvernorat"
                                                components={animatedComponents}
                                                options={gouvernorats}
                                                onChange={(e) => { setCommunes([]); fetchCommunes(e.value); fetchGovQuartiers(e.value); setGouvernorat(true);}}
                                            />							
                                        </div>
                                    </div>
                                </div>

                                { gouvernorat ?
                                <div className="mb-3 row">
                                    
                                    <div className="col-sm-12">
                                        <div className="boxes" >
                                            <Select
                                                placeholder="Commune"
                                                components={animatedComponents}
                                                options={communes}
                                                onChange={(e) => { setCommune(e.value); fetchComQuartiers(e.value);}}
                                            />							
                                        </div>
                                    </div>
                                </div> : ''
                                }

                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                   </Container>         
                </div> 
            </div>

            <div className="modal fade" id="ModalMod" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                        
                    <div className="modal-content">
                        <div className="modal-header">
                                
                            <div className="col-12 col-xl-12">
                                
							    <div className="card">
                                         
									<div className="modal-header">
													<h5 className="modal-title">Ajouter Quartier</h5>
													<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
									</div>
								    <div className="card-body">
									        
								    </div>
							    </div>
                           
						    </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        >
        <Modal.Header closeButton >
          <Modal.Title id="example-custom-modal-styling-title">
            Ajouter Quartier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
         <MapFormAdd />
        </Modal.Body>
      </Modal>

    </main>
    )
}

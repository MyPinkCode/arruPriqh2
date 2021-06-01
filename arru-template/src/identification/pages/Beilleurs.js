import React from 'react'
import Bei from '../components/Beilleur'
import FeatherIcon from 'feather-icons-react'
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';

export default function Beilleurs() {
    const [selectedImg, setSelectedImg]=React.useState("img/photos/deflogo.png");
function handleChange(event) {
    setSelectedImg( URL.createObjectURL(event.target.files[0]));
    }
	const [show, setShow] = React.useState(false);
    const tab =[
        {name:"BEI", img:"img/photos/bei.png"	},
        {name:"AFD", img:"img/photos/afd.jpg"},
        {name:"UE", img:"img/photos/ue.png"},
        {name:"Etat" ,img:"img/photos/etat.png" }
    ]
    return (
        <main className="content">
        <div className="container-fluid p-0">
<div>
            <h1 className="h3 mb-3">Gestion des beilleurs</h1>
            <Col md="auto" className="d-flex flex-row-reverse" >
              <Button className="btn btn-primary" size="primary" onClick={() => {  setShow(true); }}>
								<FeatherIcon icon="plus"/>
							</Button>
            </Col>
            </div>
            <div className="row">
				{  tab.map((b,index)=>(
                    <Bei key={index} name={b.name} img={b.img}/>
                ))
                    	
                }	
			</div>
        </div>
       
    	<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
					<Modal.Title>Modifier Beilleur</Modal.Title>
					</Modal.Header>
					<Modal.Body><div className="row">
                                            <div className="col-md-6">
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="inputFirstName">Nom</label>
                                                <input type="text" className="form-control" placeholder="nom bailleur" />
                                            </div>
                                           
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-center">
                                                    <img src={selectedImg} width="150" height="100" alt="image" />
                                                    <div className="mt-2">
                                                        <input type="file" id="image" onChange={handleChange}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div></Modal.Body>
					<Modal.Footer>
					<span  className="btn btn-primary mr-2" >Enregistrer</span>
					</Modal.Footer>
				</Modal>
        </main>
    )
}

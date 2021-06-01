import React from 'react'
import FeatherIcon from 'feather-icons-react'
import 'react-dropdown/style.css';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';


export default function Beilleur({name,img}) {

	const [selectedImg, setSelectedImg]=React.useState(img);
function handleChange(event) {
    setSelectedImg( URL.createObjectURL(event.target.files[0]));
    }

	const [show, setShow] = React.useState(false);
    return (
            	<div class="col-12 col-md-6 col-lg-3">
							<div class="card">

								<img class="card-img-top" src={img} alt="image" style={{"height": "150px"}}/>

								<div class="card-header px-4 pt-4">
									<h3 class=" mb-0">{name}</h3>
								
								</div>
								<div class="card-body px-4 pt-2">
								<div className="d-flex flex-row-reverse">
				<div>
				<span  className="btn btn-danger ml-1" ><FeatherIcon icon="trash-2" /></span>
				</div>
				<div >
				<span  className="btn btn-primary " onClick={() => {  setShow(true); }}><FeatherIcon icon="edit-2" /></span>
				</div>
			</div>
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
                                                <input type="text" className="form-control" placeholder={name} />
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
											
						</div>
    )
}

import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { MapContainer , TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw"
import axios from 'axios'

export default function MapFormAdd() {
    const animatedComponents = makeAnimated();
    
    const [show, setShow] = React.useState(false);
    const [projet, setProjet] = React.useState(null);
    const [nom_fr, setNomFr] = React.useState("");
    const [nom_ar, setNomAr] = React.useState("");

    const handlesChange = (e) => {
        console.log(e.value)
		setProjet(e.value);
	}

    const [projets, setProjets] = React.useState([]);

    const [mapLayers, setMapLayers] = React.useState([]);

    

    const fetchProjets = async () => {
		try {
			const url ='https://priqh2.herokuapp.com/api/v1/zoneIntervention/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			console.log(res.data.zone_interventions);

			if (res.status === 200) {
				let projets_options = [];
				for(const projet of res.data.zone_interventions){
					let obj = { value: projet.id, label: projet.nom_fr+" - "+ projet.nom_ar }
					projets_options.push(obj);
				}
				setProjets(projets_options);
			}

			} catch (err) {
				console.log(err);
			}
	}

    const addQuartier = async () => {
        console.log(mapLayers);
		 try {
			const url =`https://priqh2.herokuapp.com/api/v1/quartiers/`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data:{ quartiers: mapLayers }
			});

			if (res.status === 201) {
				console.log(res.data);
                window.location.replace('/Quartiers');
			}

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        fetchProjets()
    },[]);

    const _onCreate = (e) => {
        console.log(e);
    
        const { layerType, layer } = e;

        if (layerType === "polygon") {
          const { _leaflet_id } = layer;

          mapLayers.push({ id: _leaflet_id, zone_intervention_id: projet, quartier: {nom_fr: "", nom_ar: ""}, center: layer.getCenter(), latlngs: layer.getLatLngs()[0] });
        }

        setShow(true);
        console.log(mapLayers);
    };
    
    const _onEdited = (e) => {
        //console.log(e);
    const {
        layers: { _layers },
    } = e;
    
    for(let i=0; i<mapLayers.length; i++){
        for(const layer of Object.values(_layers)){
            
            if(mapLayers[i].id === layer._leaflet_id){
                mapLayers.splice(i,1,{ id: layer._leaflet_id, zone_intervention_id: projet, quartier: {nom_fr: mapLayers[i].quartier.nom, nom_ar: mapLayers[i].quartier.nom_ar}, center: layer.getCenter(), latlngs: layer.getLatLngs()[0] });
            }
        }
    }

        console.log(mapLayers);
    };
    
    const _onDeleted = (e) => {
        //console.log(e);
    const {
        layers: { _layers },
    } = e;
    
    console.log(Object.values(_layers));
        
    for(let i=0; i<mapLayers.length; i++){
        for(const layer of Object.values(_layers)){
            
            if(mapLayers[i].id === layer._leaflet_id){
                mapLayers.splice(i,1);
            }
        }
    }
        console.log("delete",mapLayers);
    };

    return (
        <React.Fragment>
        <Container>
                { projet ? 
                    <Card>
                        <Card.Body>
                            <MapContainer  center={[34.886917, 9.537499]} zoom={7}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">
                                OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            <FeatureGroup>
                                <EditControl
                                position='topright'
                                onCreated={_onCreate}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                click={(e) => console.log(e)}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                    polyline: false
                                }}
                                />
                                
                            </FeatureGroup>
                                
                            </MapContainer >
                        </Card.Body>
                    </Card> : ""
                }
                    <Card>
                        <Card.Header>
                        <Select className="py-2"
                            placeholder="Select Projet ..."
							closeMenuOnSelect={false}
							components={animatedComponents}
							options={projets}
                            onChange={handlesChange}
						/>	
                        </Card.Header>
                        <Card.Body>	  
                            
                            <Button variant="primary" size="lg" onClick={addQuartier} block>
                                Enregistrer
                            </Button> 
                        </Card.Body>
                    </Card>

        </Container>

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Nom quartier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row mb-3">
                <label className="col-form-label col-sm-3 text-sm-left">nom en francais</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e) => setNomFr(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <label className="col-form-label col-sm-3 text-sm-left">nom en arabe</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e) => setNomAr(e.target.value)} />
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
           
            <Button variant="primary" onClick={() => { mapLayers[mapLayers.length - 1].quartier.nom_fr = nom_fr; mapLayers[mapLayers.length - 1].quartier.nom_ar = nom_ar; setNomFr(""); setNomAr(""); setShow(false); }}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}

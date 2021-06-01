import React from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.css'
import FeatherIcon from 'feather-icons-react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useStoreDispatch } from '../../context/store';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap'

const TableZone = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const [show, setShow] = React.useState(false);
  const dispatch = useStoreDispatch();
  const [zone, setZone] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const deleteZone = async () => {
		try {
			const url =`https://priqh2.herokuapp.com/api/v1/zoneIntervention/${zone.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url,
			});

			if (res.status === 203) {
				toast.success('Success', {
					position: 'top-right',
					autoClose: 5000,
					draggable: false
				});
				window.location.replace('/zoneInterventions');
			}

			} catch (err) {
				toast.error(err.response.data.message, {
					position: 'top-right',
					autoClose: 5000,
					draggable: true
				});
				setShow(false);
			}
	}

  const fetchZonesInterventions = async () => {
  
    try {
			const url ='https://priqh2.herokuapp.com/api/v1/zoneIntervention/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			if (res.status === 200) {
				console.log(res.data.zone_interventions);

        let zones = [];
        for(const zone of res.data.zone_interventions){
          zones.push({
              gouvernorat: zone.gouvernorat,
              commune: zone.commune,
              nom: zone.nom_fr,
              quartier: <ul className="ml-n5" style={{"listStyleType":"none"}}>
                {
                  zone.quartiers.map((quartier, index) => (
                    <p key={index}>{quartier.nom}{zone.quartiers.length - 1 > index ? <hr/> : ''}</p>
                  ))
                }
              </ul>,
              Nombre: zone.nbr_quartier,
              Surfaces: zone.surface_totale,
              Surface: zone.surface_urbanisée_totale,
              logement: zone.nombre_logements_totale,
              habitant : zone.nombre_habitants_totale,
              
              modifier :<span onClick={() => dispatch({ type:'zoneEdit', payload: zone })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
              supprimer : <span onClick={() => { setZone(zone); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
          });
        }

        setDatatable({
          columns: [
            {
              label: 'Gouvernorat',
              field: 'gouvernorat',
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'gouvernorat',
              },
            },
            {
              label: 'Commune',
              field: 'commune',
            },
            {
              label: 'Nom',
              field: 'nom',
            },
            {
              label: 'Quartier',
              field: 'quartier',
            },
            {
              label: 'Nombre de quartier',
              field: 'Nombre',
              width: 200,
            },
            {
              label: 'Surface Totale (Hectar)',
              field: 'Surfaces',
              width: 200,
            },
            {
              label: 'Surface Urbanisée (Hectar)',
              field: 'Surface',
              width: 200,
            },
            {
              label: 'Nombre de logements',
              field: 'logement',
              width: 200,
            },
            {
              label: 'Nombre des habitants',
              field: 'habitant',
              width: 200,
            },
            {
              label: 'Actions',
              field: 'modifier',
              sort : 'disabled',
              width: 50,
            },
            {
              label: '',
              field: 'supprimer',
              sort : 'disabled',
              width: 50,
            },
          ],
          rows: zones,
        });

      }
      setLoading(false);

			} catch (err) {
				console.log(err.response.data.message);
			}
  }

  React.useEffect(() => {
    fetchZonesInterventions();
  },[]);


    return (
      <>
      <ToastContainer />
        <div className="p-3">
            
        {
            loading ?
            <div class="d-flex justify-content-center">
            <Col md="auto" >
            <Spinner
							as="span"
							animation="border"
							size="lg"
              variant="primary"
							role="status"
							aria-hidden="true"
						/> </Col></div>: 
            <MDBDataTableV5
            ref={ref}
            style={{"marginLeft":"1%"}}
            responsive
            hover
            entriesOptions={[5, 20, 25]}
            striped
            pagesAmount={5}
            data={datatable}
            paging
            searchBottom
            barReverse />
        }
        </div>
        
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want delete {zone.nom_fr}!</Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { deleteZone() }}>
            Delete
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
});

export default TableZone;
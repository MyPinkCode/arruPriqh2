import React from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.css'
import FeatherIcon from 'feather-icons-react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useStoreDispatch } from '../../../context/store';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap'

const TableMemoire = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  const [show, setShow] = React.useState(false);
  const dispatch = useStoreDispatch();
  const [memoire, setMemoire] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const deleteMemoire = async () => {
		try {
			const url =`http://localhost:4000/api/v1/memoires/${memoire.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url,
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});
			window.location.replace('/Memoire');

		} catch (err) {
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
			setShow(false);
		}
	}

  const fetchMemoires = async () => {
  
    try {
			const url ='http://localhost:4000/api/v1/memoires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

		if (res.status === 200) {
		console.log(res.data.memoires);

        let memoires = [];
        for(const memoire of res.data.memoires){
            memoires.push({
                projet: memoire.projet.code,
                htva: memoire.htva,
                montant_exonere: memoire.montant_exonere,
                frais_gestion: memoire.frais_gestion,
                tva: memoire.tva,
                gestion_frais_tva: memoire.gestion_frais_tva,
                timbre_fiscale: memoire.timbre_fiscale,
                modifier :  <span onClick={() => dispatch({ type:'memoireEdit', payload: memoire })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
                supprimer : <span onClick={() => { setMemoire(memoire); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
            });
        }

        setDatatable({
          columns: [
            {
              label: 'Projet',
              field: 'projet',
            },
            {
              label: 'HTVA',
              field: 'htva',
            },
            {
              label: 'Montant exonéré',
              field: 'montant_exonere',
            },
            {
              label: 'TVA',
              field: 'tva',
            },
            {
              label: 'Gestion Frais TVA',
              field: 'gestion_frais_tva',
            },
            {
              label: 'Frais Gestion',
              field: 'frais_gestion',
            },
            {
              label: 'Timbre Fiscale',
              field: 'timbre_fiscale',
            },
            {
                label: 'Modifier',
                field: 'modifier',
                sort : 'disabled',
            },
            {
                label: 'Supprimer',
                field: 'supprimer',
                sort : 'disabled',
            },
          ],
          rows: memoires,
        });

      }
      setLoading(false);

			} catch (err) {
				console.log(err.response.data.message);
			}
  }

  React.useEffect(() => {
    fetchMemoires();
  },[]);


    return (
      <>
      <ToastContainer />
        <div className="p-3">
            
        {
            loading ?
            <div className="d-flex justify-content-center">
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
          <Modal.Body>Are you sure you want delete {memoire.nom}!</Modal.Body>
          <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={() => { deleteMemoire() }}>
            Supprimer
          </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
});

export default TableMemoire;
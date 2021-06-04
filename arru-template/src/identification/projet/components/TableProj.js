import React from 'react'
import { MDBDataTableV5 } from 'mdbreact'
import 'mdbreact/dist/css/mdb.css'
//import '@fortawesome/fontawesome-free/css/all.css'
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreDispatch } from '../../../context/store';
import { Container, Row, Col, Modal, Card, Button, Tabs } from 'react-bootstrap';

const TableProj = React.forwardRef((props, ref) => {

  const [datatable, setDatatable] = React.useState({});
  
  const [projet, setProjet] = React.useState({});
  const [show, setShow] = React.useState(false);
  const dispatch = useStoreDispatch();

  const deleteProjet = async () => {
		try {
			const url =`http://localhost:4000/api/v1/projets/${projet.id}`;
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
				window.location.replace('/Projets');
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

  const fetchProjets = async () => {
  
    try {
			const url ='http://localhost:4000/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  method: 'get',
			  url,
			});

		
				console.log(res.data.projets);

        let projets = [];
        for(const projet of res.data.projets){
          let nomProjet = '';
          for(const q of projet.quartiers){
            nomProjet = nomProjet + q.nom_fr + ' '
          }
          projets.push({
              nom: nomProjet.trim(),
              quartier:
              <ul className="ml-n4" key={projet.id} style={{"listStyleType":"none"}}>
                {
                  projet.quartiers.map((quartier, index) => (
                    <div key={index}><p> {quartier.nom_fr} </p>{projet.quartiers.length - 1 > index ? <hr/> : ''}</div>
                  ))
                }
              </ul>,
              Nombre: projet.nbr_quartiers,
              Surfaces: projet.surface_totale,
              Surface: projet.surface_urbanisée_totale,
              logement: projet.nombre_logements_totale,
              habitant: projet.nombre_habitants_totale,
              qd: projet.infrastructures.filter((infra)=> infra.type === "drainage des eaux pluviales")[0].quantité,
              cd: projet.infrastructures.filter((infra)=> infra.type === "drainage des eaux pluviales")[0].cout,
              qv: projet.infrastructures.filter((infra)=> infra.type === "voirie")[0].quantité,
              cv: projet.infrastructures.filter((infra)=> infra.type === "voirie")[0].cout,
              qep: projet.infrastructures.filter((infra)=> infra.type === "eau potable")[0].quantité,
              cep: projet.infrastructures.filter((infra)=> infra.type === "eau potable")[0].cout,
              npl: projet.infrastructures.filter((infra)=> infra.type === "eclairage public")[0].quantité,
              cpl: projet.infrastructures.filter((infra)=> infra.type === "eclairage public")[0].cout,
              qa: projet.infrastructures.filter((infra)=> infra.type === "assainissement")[0].quantité,
              ca: projet.infrastructures.filter((infra)=> infra.type === "assainissement")[0].cout,
              be: projet.bureau_etude,
              ce: projet.cout_etude,
              modifier :<span onClick={() => dispatch({ type:'projetEdit', payload: projet })} data-toggle="modal" data-target="#modif"><FeatherIcon icon="edit-2" /></span>,
              supprimer : <span onClick={() => { setProjet(projet); setShow(true); }}><FeatherIcon icon="trash-2" /></span>,
          });
        }

        setDatatable({
          columns: [
            {
              label: 'Nom',
              field: 'nom',
              width: 200,
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
              label: 'quantité drainage',
              field: 'qd',
            },
            {
              label: 'coût drainage',
              field: 'cd',
            },
            {
              label: 'quantité voirie',
              field: 'qv',
            },
            {
              label: 'coût voirie',
              field: 'cv',
            },
            {
              label: 'quantité eau potable',
              field: 'qep',
            },
            {
              label: 'coût eau potable',
              field: 'cep',
            },
            {
              label: 'Nombre de poteaux lumineux',
              field: 'npl',
            },
            {
              label: 'coût éclairage public',
              field: 'cpl',
            },
            {
              label: 'quantité assainissement',
              field: 'qa',
            },
            {
              label: 'coût assainissement',
              field: 'ca',
            },
            {
              label: 'bureau d\'étude',
              field: 'be',
            },
            {
              label: 'coût d\'étude',
              field: 'ce',
            },
            {
              label: 'Modifier',
              field: 'modifier',
              sort : 'disabled',
              width: 50,
            },
            {
              label: 'Supprimer',
              field: 'supprimer',
              sort : 'disabled',
              width: 50,
            },
          ],
          rows: projets,
        });

      console.log(datatable);

      props.setLoading(false);

			} catch (err) {
				console.log(err);
			}
  }


  
  React.useEffect(() => {
    fetchProjets();
  },[]);
 
    return (
      <div className="p-3">
        <ToastContainer />
        {
        !props.loading ?
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
        barReverse /> : ''
        }

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want delete {projet.nom}!</Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { deleteProjet() }}>
            Delete
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
});

export default TableProj;
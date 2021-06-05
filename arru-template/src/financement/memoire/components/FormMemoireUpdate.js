import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormMemoireUpdate() {

    const [memoireEdit, setMemoireEdit] = React.useState({});
    const {memoire} = useStoreState();

    const updateMemoire = async() => {
		try{
			const url = `http://localhost:4000/api/v1/memoires/${memoire.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: memoireEdit
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Memoire');

		} catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

    return (
        <div>
			<ToastContainer/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">HTVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoire && memoire.htva ? memoire.htva : 0}
					onChange={(e) => setMemoireEdit({...memoire, htva: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant Exonere</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoire && memoire.montant_exonere ? memoire.montant_exonere : 0}
					onChange={(e) => setMemoireEdit({...memoire, montant_exonere: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Frais Gestion</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoire && memoire.frais_gestion ? memoire.frais_gestion : 0}
					onChange={(e) => setMemoireEdit({...memoire, frais_gestion: e.target.value * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoire && memoire.tva ? memoire.tva : 0}
					onChange={(e) => setMemoireEdit({...memoire, tva: e.target.value * 1})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gestion Frais TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoire && memoire.gestion_frais_tva ? memoire.gestion_frais_tva : 0}
					onChange={(e) => setMemoireEdit({...memoire, gestion_frais_tva: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Timbre Fiscale</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={memoire && memoire.timbre_fiscale ? memoire.timbre_fiscale : 0}
					onChange={(e) => setMemoireEdit({...memoire, timbre_fiscale: e.target.value * 1})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateMemoire()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}
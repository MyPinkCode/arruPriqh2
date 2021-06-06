import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../../context/store';

export default function FormDecompteUpdate() {

    const [decompteEdit, setDecompteEdit] = React.useState({});
    const {decompte} = useStoreState();

    const updateDecompte = async() => {
		try{
			const url = `http://localhost:4000/api/v1/decomptes/${decompte.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: decompteEdit
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Decompte');

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
					<input type="number" className="form-control" defaultValue={decompte && decompte.htva ? decompte.htva : 0}
					onChange={(e) => setDecompteEdit({...decompte, htva: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant Exonere</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={decompte && decompte.montant_exonere ? decompte.montant_exonere : 0}
					onChange={(e) => setDecompteEdit({...decompte, montant_exonere: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Frais Gestion</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={decompte && decompte.frais_gestion ? decompte.frais_gestion : 0}
					onChange={(e) => setDecompteEdit({...decompte, frais_gestion: e.target.value * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={decompte && decompte.tva ? decompte.tva : 0}
					onChange={(e) => setDecompteEdit({...decompte, tva: e.target.value * 1})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gestion Frais TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={decompte && decompte.gestion_frais_tva ? decompte.gestion_frais_tva : 0}
					onChange={(e) => setDecompteEdit({...decompte, gestion_frais_tva: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Timbre Fiscale</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" defaultValue={decompte && decompte.timbre_fiscale ? decompte.timbre_fiscale : 0}
					onChange={(e) => setDecompteEdit({...decompte, timbre_fiscale: e.target.value * 1})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateDecompte()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}
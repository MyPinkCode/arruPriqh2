import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormMemoire() {

    const animatedComponents = makeAnimated();
	const [memoire, setMemoire] = React.useState({});

    const addMemoire = async () => {
		try {
			const url ='http://localhost:4000/api/v1/memoires/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data: memoire
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Memoire');

		} catch (err) {
			console.log(err.response.data.message);
		}
	}

    return (
        <div>
			<ToastContainer/>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">HTVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, htva: e.target.value})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Montant Exonere</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, montant_exonere: e.target.value})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Frais Gestion</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, frais_gestion: e.target.value})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, tva: e.target.value})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gestion Frais TVA</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, gestion_frais_tva: e.target.value})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Timbre Fiscale</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" 
					onChange={(e) => setMemoire({...memoire, timbre_fiscale: e.target.value})}/>
				</div>
			</div>
			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addMemoire()}>Submit</span>
				</div>
			</div>
			
		</div>
    )
}

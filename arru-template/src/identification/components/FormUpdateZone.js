import React from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../context/store';

export default function FormUpdateZoneEdit() {

    const [zoneEdit, setZoneEdit] = React.useState({});

    const {zone} = useStoreState();


    const updateZone = async() => {
		try{
			const url = `https://priqh2.herokuapp.com/api/v1/zoneIntervention/${zone.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: zoneEdit
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/zones');

		}catch(err){
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
                <label className="col-form-label col-sm-3 text-sm-left">Nom en francais</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nombre quartiers" defaultValue={ zone ? zone.nom_fr : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, nom_fr: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom en arabe</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en arabe" defaultValue={ zone ? zone.nom_ar : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, nom_ar: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre quartiers</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre quartiers" defaultValue={ zone ? zone.nbr_quartier : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, nbr_qaurtier: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Surface Totale (Hectar)</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Surface Totale (Hectar)" defaultValue={ zone ? zone.surface_totale : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, surface_totale: e.target.value * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Surface Urbanisée (Hectar)</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Surface Urbanisée (Hectar)" defaultValue={ zone ? zone.surface_urbanisée_totale : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, surface_urbanisée_totale: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre de logements</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre de logements" defaultValue={ zone ? zone.nombre_logements_totale : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, nombre_logements_totale: e.target.value * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre habitants</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre habitants" defaultValue={ zone ? zone.nombre_habitants_totale : "" }
					onChange={(e) => setZoneEdit({...zoneEdit, nombre_habitants_totale: e.target.value * 1})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => updateZone()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}

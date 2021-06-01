import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormProjet() {
    const animatedComponents = makeAnimated();
	const [show, setShow] = React.useState(false);
	
	const [zoneIntervention, setZoneIntervention] = React.useState([]);
	const [drainage, setDrainage] = React.useState({type: 'Drainage'});
	const [voirie, setVoirie] = React.useState({type: 'Voirie'});
	const [assainissement, setAssainissement] = React.useState({type: 'Assainissement'});
	const [eclairage, setEclairage] = React.useState({type: 'Eclairage public'});
	const [eau, setEau] = React.useState({type: 'Eau potable'});
	const [etude, setEtude] = React.useState({});

	const [projet, setProjet] = React.useState({});


	const fetchZonesInterventions = async () => {
		try {
			const url ='https://priqh2.herokuapp.com/api/v1/zoneIntervention/sans_projet';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			if (res.status === 200) {
				
				let zoneIntervention_options = [];
				for(const zoneIntervention of res.data.zone_interventions){
					let obj = { value: zoneIntervention.id, label: zoneIntervention.nom_fr+" "+zoneIntervention.nom_ar }
					zoneIntervention_options.push(obj);
				}
				setZoneIntervention(zoneIntervention_options);
			}

			} catch (err) {
				console.log(err.response.data.message);
			}
	}


	const addProjet = async() => {
		try{
			const url ='https://priqh2.herokuapp.com/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data: {projet,etude,infrastructures:[drainage,voirie,assainissement,eclairage,eau]}
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Projets');

		}catch(err){
			console.log(err.message);
			
			toast.error(err.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}


	React.useEffect(() => {
		fetchZonesInterventions();
	},[]);
	
	
    return (
        <div>
			<ToastContainer/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">zone d'intervention</label>
				<div className="col-sm-9">
					<div className="boxes">
						<Select
							defaultValue="options"
							components={animatedComponents}
							options={zoneIntervention}
							onChange={(e) => { setProjet({...projet, zone_intervention_id: e.value})}}
						/>							
					</div>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Drainage</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { setDrainage({...drainage, quantité: e.target.value * 1})}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { setDrainage({...drainage, cout: e.target.value * 1})}}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Voirie</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { setVoirie({...voirie, quantité: e.target.value * 1})}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { setVoirie({...voirie, cout: e.target.value * 1})}}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Assainissement</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { setAssainissement({...assainissement, quantité: e.target.value * 1})}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { setAssainissement({...assainissement, cout: e.target.value * 1})}}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eclairage Public</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="p.lumineux"
					onChange={(e) => { setEclairage({...eclairage, quantité: e.target.value * 1})}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { setEclairage({...eclairage, cout: e.target.value * 1})}}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eau potable</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { setEau({...eau, quantité: e.target.value * 1})}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { setEau({...eau, cout: e.target.value * 1})}}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Etude</label>
                <div className="col-sm-4">
					<input type="text" className="form-control" placeholder="Bureau"
					onChange={(e) => { setEtude({...etude, bureau: e.target.value})}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { setEtude({...etude, cout: e.target.value * 1})}}/>
				</div>
            </div>
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addProjet()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}

import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../context/store';

export default function FormZone() {

	const animatedComponents = makeAnimated();

	const [zone, setZone] = React.useState({});


	const { zoneEdit } = useStoreState();

	const [gouvernorats, setGouvernorats] = React.useState([]);
	const [communes, setCommunes] = React.useState([]);

	const [gouvernorat, setGouvernorat] = React.useState(false);

	const addZone = async() => {
		try{
			const url ='https://priqh2.herokuapp.com/api/v1/zoneIntervention/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data: zone
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/zoneInterventions');

		}catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

	const fetchGouvernorats = async() => {
		try{
			const url ='https://priqh2.herokuapp.com/api/v1/gouvernorats/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
				data: zone
			});

			let options = [];
			for(const gov of res.data.gouvernorats){
				options.push({
					label: gov.nom_fr+' - '+gov.nom_ar, value: gov.id
				});
			}

			setGouvernorats(options);
		}catch(err){
			console.log(err.response.data.message);
		}
	}

	const fetchCommunes = async(gov) => {
		console.log(gouvernorat);
		try{
			const url = `https://priqh2.herokuapp.com/api/v1/gouvernorats/${gov}/communes/`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
				data: zone
			});

			console.log(url);
			console.log(res.data.communes);

			let optionsCommunes = [];
			for(const com of res.data.communes){
				optionsCommunes.push({
					label: com.nom_fr+' - '+com.nom_ar, value: com.id
				});
			}

			setCommunes(optionsCommunes);
			
		}catch(err){
			console.log(err.response.data.message);
		}
	}

	
	React.useEffect(() => {
		fetchGouvernorats();
	},[]);

	
    return (
        <div>
			<ToastContainer/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Gouvernorat</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							defaultValue="options"
							components={animatedComponents}
							options={gouvernorats}
							onChange={(e) => { fetchCommunes(e.value); setGouvernorat(true)}}
						/>							
					</div>
				</div>
			</div>

			{ gouvernorat ?
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Commune</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							defaultValue="options"
							components={animatedComponents}
							options={communes}
							onChange={(e) => { setZone({...zone, commune_id: e.value})}}
						/>							
					</div>
				</div>
			</div> : ''
			}
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom en francais</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nombre quartiers"
					onChange={(e) => setZone({...zone, nom_fr: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom en arabe</label>
                <div className="col-sm-9">
					<input type="text" className="form-control" placeholder="Nom en arabe"
					onChange={(e) => setZone({...zone, nom_ar: e.target.value})}/>
				</div>
			</div>

			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre quartiers</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre quartiers"
					onChange={(e) => setZone({...zone, nbr_qaurtier: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Surface Totale (Hectar)</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Surface Totale (Hectar)"
					onChange={(e) => setZone({...zone, surface_totale: e.target.value * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Surface Urbanisée (Hectar)</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Surface Urbanisée (Hectar)"
					onChange={(e) => setZone({...zone, surface_urbanisée_totale: e.target.value * 1})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre de logements</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre de logements"
					onChange={(e) => setZone({...zone, nombre_logements_totale: e.target.value * 1})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre habitants</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre habitants"
					onChange={(e) => setZone({...zone, nombre_habitants_totale: e.target.value * 1})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addZone()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}

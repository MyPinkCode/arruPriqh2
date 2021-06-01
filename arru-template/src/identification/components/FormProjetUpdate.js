import React from 'react'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreState } from '../../context/store';

export default function FormProjetUpdate() {

    const {projet} = useStoreState();


    const loadValues = () => {

        const drainage = {
            type: "Drainage", 
            quantité: projet ? projet.infrastructures.filter((infra) => infra.type === "Drainage")[0].quantité : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "Drainage")[0].cout : ''}
        
        const eau = {
            type: "Eau potable",
            quantité: projet ? projet.infrastructures.filter((infra) => infra.type === "Eau potable")[0].quantité : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "Eau potable")[0].cout : ''}

        const assainissement = {
            type: "Assainissement",
            quantité: projet ? projet.infrastructures.filter((infra) => infra.type === "Assainissement")[0].quantité : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "Assainissement")[0].cout : ''
        }

        const eclairage = {
            type: "Eclairage public",
            quantité: projet ? projet.infrastructures.filter((infra) => infra.type === "Eclairage public")[0].quantité : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "Eclairage public")[0].cout : ''}
        
        const voirie = {
            type: "Voirie",
            quantité: projet ? projet.infrastructures.filter((infra) => infra.type === "Voirie")[0].quantité : '',
            cout: projet ? projet.infrastructures.filter((infra) => infra.type === "Voirie")[0].cout : ''}
        
        const etude = {
            bureau: projet && projet.etude ? projet.etude.bureau : '',
            cout: projet && projet.etude ? projet.etude.cout : ''}

        return {drainage,eau,assainissement,eclairage,voirie,etude};
    }

    const [drainage, setDrainage] = React.useState(loadValues().drainage);

    const [eau, setEau] = React.useState(loadValues().eau);

    const [assainissement, setAssainissement] = React.useState(loadValues().assainissement);

    const [eclairage, setEclairage] = React.useState(loadValues().eclairage);

    const [voirie, setVoirie] = React.useState(loadValues().voirie);

    const [etude, setEtude] = React.useState(loadValues().etude);

    const updateProjet = async() => {

		try{
			const url = `https://priqh2.herokuapp.com/api/v1/projets/${projet.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'put',
			  	url,
				data: {etude, infrastructures: [drainage, eau, assainissement, eclairage, voirie]}
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Projets');

		}catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

  React.useEffect(() => {
    if(projet !== null){
        const p = loadValues();
        setDrainage(p.drainage);
        setEau(p.eau);
        setEclairage(p.eclairage);
        setVoirie(p.voirie);
        setAssainissement(p.assainissement);
        setEtude(p.etude);
    }
  },[projet]);

    return (
        <div>
            <ToastContainer />
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Drainage</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)" onChange={(e) => setDrainage({...drainage, quantité: e.target.value})}
                    defaultValue={drainage.quantité}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => setDrainage({...drainage, cout: e.target.value})}
                    defaultValue={drainage.cout}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Voirie</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)" onChange={(e) => setVoirie({...voirie, quantité: e.target.value * 1})}
                    defaultValue={voirie.quantité}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => setVoirie({...voirie, cout: e.target.value * 1})}
                    defaultValue={voirie.cout}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Assainissement</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)" onChange={(e) => setAssainissement({...assainissement, quantité: e.target.value * 1})}
                    defaultValue={assainissement.quantité}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => setAssainissement({...assainissement, cout: e.target.value * 1})}
                    defaultValue={assainissement.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eclairage Public</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="p.lumineux (km)" onChange={(e) => setEclairage({...eclairage, quantité: e.target.value * 1})}
                    defaultValue={eclairage.quantité}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => setEclairage({...eclairage, cout: e.target.value * 1})}
                    defaultValue={eclairage.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eau potable</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)" onChange={(e) => setEau({...eau, quantité: e.target.value * 1})}
                    defaultValue={eau.quantité}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={(e) => setEau({...eau, cout: e.target.value * 1})}
                    defaultValue={eau.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Etude</label>
                <div className="col-sm-4">
					<input type="text" className="form-control" placeholder="Bureau" onChange={ (e) => setEtude({ ...etude, bureau: e.target.value }) }
                    defaultValue={etude.bureau}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)" onChange={ (e) => setEtude({ ...etude, cout: e.target.value * 1 }) }
                    defaultValue={etude.cout}/>
				</div>
            </div>
            <div className="mb-3 row">
				<div className="col-sm-9">
					<span onClick={() => updateProjet()}  className="btn btn-primary">Submit</span>
				</div>
			</div>
        </div>
    )
}

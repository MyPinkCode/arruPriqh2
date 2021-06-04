import React from 'react';
import { useStoreDispatch } from '../../../../context/store';
import { useStoreState } from '../../../../context/store';

export default function Step3() {

	const { newProjet } = useStoreState();

	console.log(newProjet);
    
    const [quartiers, setQuartiers] = React.useState([]);
	const [drainage, setDrainage] = React.useState({type: 'drainage des eaux pluviales', quantité: 0, cout: 0});
	const [voirie, setVoirie] = React.useState({type: 'voirie', quantité: 0, cout: 0});
	const [assainissement, setAssainissement] = React.useState({type: 'assainissement', quantité: 0, cout: 0});
	const [eclairage, setEclairage] = React.useState({type: 'eclairage public', quantité: 0, cout: 0});
	const [eau, setEau] = React.useState({type: 'eau potable', quantité: 0, cout: 0});

	const dispatch = useStoreDispatch();

	const dispatchData = () => {
		dispatch({ type: "newProjet", payload: {...newProjet, infrastructures: [drainage, voirie, assainissement, eclairage, eau] }});
	}

	React.useEffect(() => {
		dispatchData();
	},[]);
	
  return (
    <div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Drainage</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { drainage.quantité= e.target.value * 1; dispatchData();}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { drainage.cout= e.target.value * 1;  dispatchData();}}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Voirie</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { voirie.quantité= e.target.value * 1;  dispatchData();}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { voirie.cout= e.target.value * 1;  dispatchData();}}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Assainissement</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { assainissement.quantité= e.target.value * 1;  dispatchData();}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { assainissement.cout= e.target.value * 1;  dispatchData();}}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eclairage Public</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="p.lumineux"
					onChange={(e) => { eclairage.quantité= e.target.value * 1; dispatchData();}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { eclairage.cout= e.target.value * 1;  dispatchData();}}/>
				</div>
            </div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Eau potable</label>
                <div className="col-sm-4">
					<input type="number" className="form-control" placeholder="quantité (km)"
					onChange={(e) => { eau.quantité= e.target.value * 1;  dispatchData();}}/>
				</div>
                <div className="col-sm-5">
					<input type="number" className="form-control" placeholder="cout (mdt)"
					onChange={(e) => { eau.cout= e.target.value * 1;  dispatchData();}}/>
				</div>
            </div>
    </div>
  );
}

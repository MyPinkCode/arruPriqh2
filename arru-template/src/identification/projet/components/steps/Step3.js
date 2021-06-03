import React from 'react';
import { useStoreDispatch } from '../../../../context/store';
import { useStoreState } from '../../../../context/store';

export default function Step3() {

    
    const [quartiers, setQuartiers] = React.useState([]);
	const [drainage, setDrainage] = React.useState({type: 'Drainage'});
	const [voirie, setVoirie] = React.useState({type: 'Voirie'});
	const [assainissement, setAssainissement] = React.useState({type: 'Assainissement'});
	const [eclairage, setEclairage] = React.useState({type: 'Eclairage public'});
	const [eau, setEau] = React.useState({type: 'Eau potable'});
	
  return (
    <div>
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
    </div>
  );
}

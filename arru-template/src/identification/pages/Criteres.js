import React from 'react'
import Carte from '../components/Carte'
import Critere from '../components/Critere'
import axios from 'axios'
import { useStoreState } from '../../context/store';
import LoadingBar from 'react-top-loading-bar';

export default function Criteres() {
    const {gouvernorat} = useStoreState();

    const [fiche, setFiche] = React.useState({});
    const [progress, setProgress] = React.useState(0);
    const fetchCriteres = async (gouvernorat) => {
		try {
			const url =`https://priqh2.herokuapp.com/api/v1/criteres/gouvernorat/${gouvernorat.slice(0,3).toUpperCase()}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

            console.log(res);
			setFiche(res.data.critere);

			} catch (err) {
				console.log(err.response.data.message);
                return {};
			}
	}

    React.useEffect(() => {
        setProgress(100);
        fetchCriteres(gouvernorat);
        return () => setProgress(0);
    },[gouvernorat]);

    return (
        <main className="content">
            <LoadingBar color='#1a2e8a' height='4px' progress={progress}  />
			<div className="container-fluid p-0">

				<div className="mb-3">
					<h1 className="h3 d-inline align-middle">Critéres d'éligibilité {gouvernorat}</h1>
				</div>

            <div className="row">

                    <div className="col-3">
                        <Carte />
                    </div>

                <div className="col-9">
                    <div className="row">
                       <Critere title="Nombre de quartiers" id={fiche.id} critere={fiche.nbr_quartier}/>
                       <Critere title="Nombre de logements" id={fiche.id} critere={fiche.nombre_logements_totale}/>
                       <Critere title="Nombre d'habitant" id={fiche.id} critere={fiche.nombre_habitants_totale}/>
                       <Critere title="Surface totale (hectares)" id={fiche.id} critere={fiche.surface_totale}/>
                       <Critere title="Surface urbanisée totale (hectares)" id={fiche.id} critere={fiche.surface_urbanisée_totale}/>
					</div>
				</div>
            </div>  </div>
		</main>
    )
}

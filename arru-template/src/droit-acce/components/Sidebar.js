import React, { Profiler } from 'react';
import SidebarItem from './SidebarItem';
import { useAuthState } from '../../context/auth';

export default function Sidebar(props) {

	const { user } = useAuthState();
	
	const [selectedItem, setSelectedItem]=React.useState(window.location.href.slice(22,window.location.href.length));

	console.log(user);
	if(user !== null && user !== undefined){
    return (
        <nav id="sidebar" className="sidebar">
			<div className="sidebar-content js-simplebar">
				<span className="sidebar-brand" href="index.html">
                    <span className="px-4">
                        <img src="img/photos/priqh.png" alt="priqh2" style={{ "height": "80px" }}/>
                    </span>
                </span>

				<ul className="sidebar-nav">
					{ 0 > 1 ?
					<>
					<li className="sidebar-header">
						Droits d'accès
					</li>

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des utilisateurs").length > 0 ?  
					<SidebarItem title="Utilisateurs" icon="users" l="/Utilisateurs" selecteditem={selectedItem} setselecteditem={setSelectedItem}/>
					: ""}

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des roles").length > 0 ?
					<SidebarItem title="Roles" icon="briefcase" l="/Roles" selecteditem={selectedItem} setselecteditem={setSelectedItem}/>
					: "" }

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des groupes").length > 0 ?
					<SidebarItem title="Groupes" icon="book" l="/Groupes" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" }

					{ user.payload.interfaces.filter((el) => el.titre === "gestion des fonctionalites").length > 0 ?
					<SidebarItem title="Interfaces" icon="layout" l="/Interfaces" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					: "" } </>: "" }
						
					

					<li className="sidebar-header">
						Identification des projets
					</li>
					<SidebarItem title="Projets" icon="clipboard" l="/Projets" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Quartiers" icon="map-pin" l="/Quartiers" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Critéres d'éligibilité" icon="filter" l="/Critéres d'éligibilité" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Zone d'intervention" icon="map" l="/zoneInterventions" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Communes" icon="list" l="/communes" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					
					<li className="sidebar-header">
						Financement
					</li>
					<SidebarItem title="Beilleurs de fond" icon="users" l="/beilleurs" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Tranches" icon="pie-chart" l="/Tranches" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Budget" icon="dollar-sign" l="/Budget" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					
					<li className="sidebar-header">
						profile
					
					</li>
					<SidebarItem title="Mon profile" title2="settings" icon="user" l="/Profile" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="deconnection" icon="log-out" l="/login" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					
				</ul>

				
			</div>
		</nav>
    ) } else {
		return(
			<React.Fragment></React.Fragment>
		);
	}
}

import React from 'react';

import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

import StepZilla from "react-stepzilla";
import './steps/main.css';

export default function FormProjet() {

	const steps = [
		{ name: "Quartiers", component: <Step2 /> },
		{ name: "Projet", component: <Step1 /> },
		{ name: "Infrastructure", component: <Step3 /> },
		{ name: "Etude", component: <Step4 /> }
	  ]
	
    return (
		<div className='step-progress'>
        	<StepZilla 
				steps={steps}
				nextButtonCls="btn btn-primary btn-lg pull-right"
				backButtonCls="btn btn-primary btn-lg pull-left"
				stepsNavigation={false}
			/>
    	</div>
    );
}

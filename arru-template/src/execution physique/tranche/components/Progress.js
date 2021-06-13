import React from 'react';
import {ProgressBar, OverlayTrigger, Tooltip} from 'react-bootstrap'

export default function Progress({ infra }) {

    const [taux, setTaux] = React.useState(0);
   // setTaux(calculAvancement(infra));

    const calculAvancement = (infra) => {
        return  (infra.progres.cout * 100) / infra.quantite;
    }

    React.useEffect(() => {

    });
    
  return (
<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{`${infra.progres.cout}/${infra.quantite}`}</Tooltip>}>
<ProgressBar>
        <ProgressBar  animated variant="success" label={`${Math.round(taux* 100) / 100}%`} now={Math.round(taux* 100) / 100}/>
        <ProgressBar  animated variant="danger" label={`${Math.round((100 - taux)* 100) / 100}%`} now={Math.round((100 - taux)* 100) / 100} />
    </ProgressBar>
</OverlayTrigger>
);
}

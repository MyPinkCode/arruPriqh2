import React from 'react';

const StoreStateContext = React.createContext();
const StoreDispatchContext = React.createContext();

let zone = null;
let projet = null;
let commune = null;
let gouvernorat = localStorage.getItem('gouvernoratPriqh2');

if(!gouvernorat){
    gouvernorat = 'Bizerte';
}

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

const storeReducer = (state, action) => {
    switch(action.type) {
        case 'zoneEdit' :
            return {
                ...state,
                zone: action.payload,
            }
        case 'projetEdit' :
            return {
                ...state,
                projet: action.payload
            }
        case 'communeEdit' :
            return {
                ...state,
                commune: action.payload
            }
        case 'gouvernoratEdit' :
            localStorage.setItem('gouvernoratPriqh2',action.payload);
            return {
                ...state,
                gouvernorat: action.payload
            }

        default:
            throw new Error(`Unkonwn action type: ${action.type}`);
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(storeReducer, { zone, projet, commune, gouvernorat });

    return (
        <StoreDispatchContext.Provider value={dispatch}>
            <StoreStateContext.Provider value={state}>
                {children}
            </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
    );
}

export const useStoreState = () => React.useContext(StoreStateContext);
export const useStoreDispatch = () => React.useContext(StoreDispatchContext);
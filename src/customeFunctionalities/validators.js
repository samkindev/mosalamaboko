import { communes } from './data';

export const validateServices = (services) => {
    if (services.length <= 0) {
        return false;
    }

    return true;
};
export const validateWorks = (works) => {
    if (works.length <= 0) {
        return false;
    }

    return true;
};

export const validateAddress = (commune, quartier, avenue, num) => {
    let error = { commune: null, quartier: null, avenue: null, num: null };
    let valid = true;

    if (!communes.some(c => c.name === commune)) {
        error.commune = 'Selectionnez une commune.';
        valid = false;
    } else {
        error.commune = null;
    }

    if (!quartier || quartier === "") {
        error.quartier = 'Le quartier est réquis';
        valid = false;
    } else {
        error.quartier = null;
    }

    if (!avenue || avenue === "") {
        error.avenue = 'Le nom de l\'avenue est réquis.';
        valid = false;
    } else {
        error.avenue = null;
    }

    if (!num || num === "") {
        error.num = 'Le numéro de la parcelle est réquis.';
        valid = false;
    } else {
        error.num = null;
    }

    return { error, valid };
};

export const validateDateAndTime = (date) => {
    if (!(date instanceof Date)) {
        return false;
    }

    console.log(date);

    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const h = date.getHours();
    const min = date.getMinutes();

    const today = new Date();

    if (y < today.getFullYear()) {
        return false;
    }

    if (y === today.getFullYear && m < today.getMonth()) {
        return false;
    }

    if (y === today.getFullYear() && m === today.getMonth() && d < today.getDate()) {
        return false;
    }

    if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate() && h <= today.getHours()) {
        return false;
    }

    return true;
};

export const validateUserCoords = (tel, nom, prenom, sexe, email) => {
    const error = { tel: null, nom: null, prenom: null, sexe: null, email: null };
    let valid = true;

    if (!tel.match(/^\d{10}$/)) {
        error.tel = 'Verifiez votre numéro de téléphone';
        valid = false;
    } else {
        error.tel = null;
    }

    if (!nom || nom === "" || nom === " ") {
        error.nom = 'Le nom est réquis';
        valid = false;
    } else {
        error.nom = null;
    }
    if (!prenom || prenom === "" || prenom === " ") {
        error.prenom = 'Le prenom est réquis';
        valid = false;
    } else {
        error.prenom = null;
    }
    if (!sexe || sexe === "" || sexe === " ") {
        error.sexe = 'Ce champ est réquis';
        valid = false;
    } else {
        error.sexe = null;
    }
    if (email || email !== "") {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            error.email = 'Mauvais adresse mail';
            valid = false;
        } else {
            error.email = null;
        }
    }

    return { error, valid };
};


export const validateReservation = (step, services, works, addressData, dateData, userData) => {
};

export const validateDemandArtisan = () => {

};
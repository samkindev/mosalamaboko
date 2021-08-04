import electricity from '../assets/electricityIcon.svg';
import carrelage from '../assets/carreaux.svg';
import plumbery from '../assets/plumbery.svg';
import climatisation from '../assets/climatisation.svg';
import fixing from '../assets/fixing.svg';
import montage from '../assets/montage.svg';
import peinture from '../assets/painter.svg';
import describeNeed from '../assets/description.svg';
import selectArtisan from '../assets/select.svg';
import conclude from '../assets/conclude.svg';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAll, getReqStatus } from '../redux/reducers/departements';
import { selectAll as selectAllServices, getReqStatus as getServiceReqStatus } from '../redux/reducers/services';

export const useGetDepartements = () => {
    const data = useSelector(selectAll);
    const reqStatus = useSelector(getReqStatus);
    const [services, setServices] = useState([]);

    useEffect(() => {
        let dpt = { image: "" };
        const dpts = [];
        data.forEach(d => {
            switch (d.nom_departement) {
                case "Carrelage":
                    dpt = { image: carrelage, ...d };
                    dpts.push(dpt);
                    break;
                case "Fixation d'objets":
                    dpt = { image: fixing, ...d };
                    dpts.push(dpt);
                    break;
                case "Peinture décoration-ébénisterie":
                    dpt = { image: peinture, ...d };
                    dpts.push(dpt);
                    break;
                case "Froid et climatisation":
                    dpt = { image: climatisation, ...d };
                    dpts.push(dpt);
                    break;
                case "Eléctricité":
                    dpt = { image: electricity, ...d };
                    dpts.push(dpt);
                    break;
                case "Montage demontage de meuble":
                    dpt = { image: montage, ...d };
                    dpts.push(dpt);
                    break;
                case "Plomberie et cuisine":
                    dpt = { image: plumbery, ...d };
                    dpts.push(dpt);
                    break;
                default:
                    break;
            }
        });

        setServices(dpts);
    }, [data]);

    return {
        services,
        loading: reqStatus === 'pending'
    };
};

export const useGetWorks = () => {
    const works = useSelector(selectAllServices);
    const reqStatus = useSelector(getServiceReqStatus);
    const [wks, setWks] = useState([]);

    useEffect(() => {
        setWks(works);
    }, [works]);

    return {
        works: wks,
        loading: reqStatus === 'pending',
    };
};

export const departements = [
    {
        name: 'Electricité',
        artisan: 'électricien',
        image: electricity,
        detail: '',
        services: [
            {
                name: 'installation',
                pannes: ['Installation Prise', 'Installation Interrupteur', 'nstallation Disjoncteur monophasé'],
            },
            {
                name: 'dépanage',
                pannes: []
            }, {
                name: 'contrôle de bon fonctionnement',
                pannes: []
            }
        ]
    },
    {
        name: 'Carrelage',
        image: carrelage,
        artisan: 'carreleur',
        detail: '',
        services: [
            {
                name: 'Pose carrelage au sol',
                pannes: ['Entiers - Ancien carrelage à enlever', 'Cassés - Ancien carrelage à enlever']
            },
            {
                name: 'Pose carrelage mural',
                pannes: ['Carreaux entiers sans crépissage', 'Carreaux entiers avec crépissage']
            },
            { name: 'Pose de chape', pannes: [] },
            { name: 'Ponçage marbres et granites', pannes: [] }
        ]
    },
    {
        name: 'Plomberie et cuisine',
        image: plumbery,
        artisan: 'plombier',
        detail: '',
        services: [
            { name: 'Installation douche', pannes: ['Douche complète ordinaire', 'Douche complète luxe'] },
            { name: 'installation chauffe-eau', pannes: ['Chauffe-eau 40 à 60 litres', 'Chauffe-eau 60 à 80 litres'] },
            { name: 'Installation hotte', pannes: [] },
            { name: 'W.C.', pannes: [] },
            { name: 'Robinetterie', pannes: [] }
        ]
    },
    {
        name: 'Froid et climatisation',
        image: climatisation,
        artisan: 'depanneur',
        detail: '',
        services: []
    },
    {
        name: 'Fixations d\'objets',
        image: fixing,
        artisan: 'Fixeur d\'objets',
        detail: '',
        services: []
    },
    {
        name: 'Montage/demontage de meubles',
        image: montage,
        artisan: 'monteur des meubles',
        detail: '',
        services: []
    },
    {
        name: 'Peinture décoration - ébénisterie',
        image: peinture,
        artisan: 'designer',
        detail: '',
        services: []
    },
];

export const communes = [
    {
        name: 'KINSHASA',
        district: 'lukunga',
    },
    {
        name: 'BANDAL',
        district: 'lukunga',
    },
    {
        name: 'BUMBU',
        district: 'funa'
    },
    {
        name: 'BURUMBU',
        district: 'lukunga',
    },
    {
        name: 'GOMBE',
        district: 'lukunga',
    },
    {
        name: 'KALAMU',
        district: 'funa',
    },
    {
        name: 'KASA-VUBU',
        district: 'funa',
    },
    { name: 'KIMBASEKE', district: 'tshangu' },
    { name: 'KINKOLE', district: 'tshangu' },
    { name: 'KINTAMBO', district: 'lukunga' },
    { name: 'KISENSO', district: 'mont amba' },
    { name: 'LEMBA', district: 'mont amba' },
    { name: 'LIMETE', district: 'funa' },
    { name: 'LINGWALA', district: 'lukunga' },
    { name: 'MALAKA', district: 'funa' },
    { name: 'MALUKU', district: 'tshangu' },
    { name: 'MASINA', district: 'tshangu' },
    { name: 'MATETE', district: 'mont amba' },
    { name: 'MONT-NGAFULA', district: 'mont amba' },
    { name: 'N’DJILI', district: 'tshangu' },
    { name: 'N’SELE', district: 'tshangu' },
    { name: 'NGALIEMA', district: 'lukunga' },
    { name: 'NGIRI-NGIRI', district: 'funa' },
    { name: 'SELEMBAO', district: 'funa' }
];

export const helpContents = [
    {
        badge: '1',
        image: describeNeed,
        title: 'Mon problème',
        body: 'Ne perdez plus de temps à rechercher des techniciens  ou à passer des appels, fixez la date et l’heure propice pour y remédier, des techniciens certifiés par un label qualité.'
    },
    {
        badge: '2',
        image: selectArtisan,
        title: 'Ma solution',
        body: 'Votre demande effectuée soit le devis approuvé, nous envoyons le meilleur technicien contenu de votre urgence, en tenant compte de sa pointure et de votre lieu.'
    },
    {
        badge: '3',
        image: conclude,
        title: 'Ma satisfaction ',
        body: 'Nos techniciens doivent mettre en avant leur travail. Vous avez ainsi une assurance supplémentaire avant de démarrer vos travaux. Mise en relation simple rapide et sécurisée.'
    },
];

export const usualWorks = [
    {
        id: 1,
        title: 'éléctricité',
    },
    {
        id: 2,
        title: 'Plomberie',
    },
    {
        id: 3,
        title: 'climatisation',
    },
    {
        id: 4,
        title: 'W.C',
    },
    {
        id: 5,
        title: 'Peinture',
    },
    {
        id: 6,
        title: 'Décoration',
    },
    {
        id: 6,
        title: 'Montage/démontage des meubles',
    },
    {
        id: 7,
        title: 'Robinetterie',
    },
];

export const handleChangeWork = (e, selectedWorks, works, setSelectedWorks, setSelectedWorksName) => {
    let ws = selectedWorks;
    let w = e.target.value;

    if (e.target.checked) {
        ws.push(w);
    } else {
        ws = ws.filter(w => w.name !== w);
    }

    const wn = [];
    works.forEach(work => {
        if (ws.some(w => w === work.id)) {
            wn.push(work);
        }
    });

    setSelectedWorks(ws);
    setSelectedWorksName(wn);
};

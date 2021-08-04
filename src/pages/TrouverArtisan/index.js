import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './trouverArtisan.css';
import { Typography, Button, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';
import { ChevronRightSharp, ChevronLeftSharp } from '@material-ui/icons';
import { PayMent } from '../../components';
import TextInput from '../../components/Inputs/TextInput';
import { DatePicker } from '../../components/Inputs/DateTimePicker';
import Select from '../../components/Inputs/Select';

import { useGetDepartements, communes, handleChangeWork as changeWork } from '../../customeFunctionalities/data';

export default function TrouverArtisan() {
    const { service } = useParams();
    const [chosen, setChosen] = useState(false);
    const [chosenService, setChosenService] = useState(null);
    const [step, setStep] = useState(0);
    const [works, setWorks] = useState([]);
    const [selectedWorks, setSelectedWorks] = useState([]);
    const [selectedWorksName, setSelectedWorksName] = useState([]);
    const [pannes, setPannes] = useState([]);
    const [noIdea, setNoIdea] = useState(false);
    const [details, setDetails] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [commune, setCommune] = useState(communes[0].name);
    const [quartier, setQuartier] = useState('');
    const [avenue, setAvenue] = useState('');
    const [num, setNum] = useState('');
    const [myPosition, setMyPosition] = useState(false);
    const [coords, stCoords] = useState([]);
    const [hour, setHour] = useState('8');
    const [min, setMin] = useState('00');
    const [nom, setNom] = useState('');
    const [postNom, setPostNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [sexe, setSex] = useState('Homme');

    const { services } = useGetDepartements();

    const goToNextStep = () => {
        setStep(step + 1);
    };
    const goToPreviousStep = () => {
        setStep(step - 1);

        if (step <= 1) {
            setSelectedWorks([]);
        }

        if (step === 0) {
            setNoIdea(false);
        }

        if (step === 1) {
            setMyPosition(false);
        }

        if (step <= 2) {
            setUrgent(false);
        }
    };

    const handleChangeCommune = (evt) => {
        setCommune(evt.target.value);
    };

    const handleNoIdea = () => {
        setNoIdea(!noIdea);
        if (step === 0) {
            setStep(step => (step + 1));
        }
    };

    const handleGetCurrentPosition = () => {
        setMyPosition(val => !val);
    };

    const handleUrgent = () => {
        setUrgent(!urgent);
        if (step === 2) {
            setStep(step => (step + 1));
        }
    };

    useEffect(() => {
        const serv = services.find(s => s.nom_departement === service);
        if (serv) {
            setChosenService(serv);
            setChosen(true);
            setWorks(serv.services);
        }
    }, [service, services]);

    const classes = useStyles();
    return (
        <div className="main-container">
            {chosen &&
                <div className="content trouver-artisan">
                    <div className="banner">
                        <div className="container">
                            <div className="inner-banner">
                                <Typography variant="h4" className="content-title">Trouver un {chosenService.nomination}</Typography>
                                <Typography variant="body1" className="content-detail">Il simple de trouver un technicien pour votre travail, fournissez les informations demandées ci-dessous.</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="content-container">
                        <div className="container">
                            <div className="reservation-form">
                                <div className="content-body">
                                    {step === 0 &&
                                        <div className="form-block">
                                            <div className="block-content">
                                                <Typography variant="h5" className="content-title">Description des travaux</Typography>
                                                <Typography variant="body1" style={{ fontWeight: 700, color: '#444', marginBottom: 10 }}>Sur quoi le technicien va travailler ?</Typography>
                                                <div className="f-group">
                                                    <div className={classes.checkboxContainer}>
                                                        {works.map((work) => (
                                                            <FormControlLabel
                                                                className="m-checkbox"
                                                                key={work.id}
                                                                control={
                                                                    <Checkbox
                                                                        size="small"
                                                                        value={work.id}
                                                                        onChange={(e) => changeWork(e, selectedWorks, works, setSelectedWorks, setSelectedWorksName)}
                                                                        name={work.nom_service}
                                                                        color="secondary"
                                                                    />
                                                                }
                                                                label={work.nom_service}
                                                            />
                                                        ))}
                                                        <FormControlLabel
                                                            className="m-checkbox"
                                                            control={
                                                                <Checkbox
                                                                    size="small"
                                                                    value="other"
                                                                    onChange={(e) => changeWork(e, selectedWorks, works, setSelectedWorks, setSelectedWorksName)}
                                                                    name="other"
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label="Autres"
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        className="btn"
                                                        style={{ marginTop: 15 }}
                                                        onClick={handleNoIdea}
                                                    >
                                                        Aucune idée sur les travaux
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="form-actions" style={{ justifyContent: 'flex-end' }}>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    onClick={goToNextStep}
                                                >
                                                    Suivant
                                                    <ChevronRightSharp />
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {step === 1 &&
                                        <div className="form-block">
                                            <div className="block-content">
                                                <Typography variant="h5" className="content-title">Lieu d'intervation</Typography>
                                                <div className="f-group">
                                                    <div className="location">
                                                        <div className="location-group">
                                                            <Select
                                                                label="Commune"
                                                                id="services"
                                                                value={commune}
                                                                options={communes}
                                                                fullWidth
                                                                onChange={handleChangeCommune}
                                                            />
                                                            <TextInput
                                                                label="Numéro"
                                                                fullWidth
                                                                value={num}
                                                                onChange={(e) => setNum(e.target.value)}
                                                                inputStyles={{ marginTop: 10 }}
                                                                placeholder="Numéro de la parcelle"
                                                                style={{ marginTop: 15 }}
                                                            />
                                                        </div>
                                                        <div className="location-group">
                                                            <TextInput
                                                                label="Quartier"
                                                                inputStyles={{ marginTop: 10 }}
                                                                fullWidth
                                                                placeholder="Nom du quartier"
                                                                value={quartier}
                                                                onChange={e => setQuartier(e.target.value)}
                                                            />
                                                            <TextInput
                                                                label="Avenue"
                                                                fullWidth
                                                                placeholder="Nom de l'avenue"
                                                                inputStyles={{ marginTop: 10 }}
                                                                style={{ marginTop: 15 }}
                                                                value={avenue}
                                                                onChange={e => setAvenue(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Typography style={{ marginBottom: 15 }} variant="body2" color="textSecondary">Appuyer sur le bouton ci-dessous si vous êtes actuellement au lieu où se feront les travaux.</Typography>
                                                    <Button
                                                        variant={myPosition ? "contained" : "outlined"}
                                                        color="secondary"
                                                        className="btn"
                                                        style={{ marginBottom: 10 }}
                                                        onClick={handleGetCurrentPosition}
                                                        disableElevation
                                                    >
                                                        Ma position (ici)
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="text"
                                                    disableElevation
                                                    color="secondary"
                                                    onClick={goToPreviousStep}
                                                >
                                                    <ChevronLeftSharp />
                                                    Précendent
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    onClick={goToNextStep}
                                                >
                                                    Suivant
                                                    <ChevronRightSharp />
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {step === 2 &&
                                        <div className="form-block">
                                            <div className="block-content">
                                                <Typography variant="h5" className="content-title">Date et heure d'intervation</Typography>
                                                <div className="f-group">
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        className="btn"
                                                        style={{ marginBottom: 15 }}
                                                        onClick={handleUrgent}
                                                    >
                                                        Maintenant (urgence)
                                                    </Button>
                                                    <div className=" date-time">
                                                        <div className="picker">
                                                            <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Date</Typography>
                                                            <DatePicker
                                                                selectedDate={Date.now()}
                                                                setSelectedDate={() => { }}
                                                                fullWidth
                                                            />
                                                        </div>
                                                        <div className="picker">
                                                            <div className="time-picker">
                                                                <div>
                                                                    <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Heure</Typography>
                                                                    <Select
                                                                        fullWidth={true}
                                                                        value={hour}
                                                                        onChange={(e) => setHour(e.target.value)}
                                                                        options={(new Array(9)).fill(0).map((e, i) => "" + (i + 8))}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Minutes</Typography>
                                                                    <Select
                                                                        fullWidth={true}
                                                                        value={min}
                                                                        onChange={(e) => setMin(e.target.value)}
                                                                        options={(new Array(60)).fill(0).map((e, i) => {
                                                                            if (i < 10) {
                                                                                return "0" + i
                                                                            }

                                                                            return i
                                                                        })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="text"
                                                    disableElevation
                                                    color="secondary"
                                                    onClick={goToPreviousStep}
                                                >
                                                    <ChevronLeftSharp />
                                                    Précendent
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    onClick={goToNextStep}
                                                >
                                                    Suivant
                                                    <ChevronRightSharp />
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {step === 3 &&
                                        <div className="form-block">
                                            <div className="block-content">
                                                <Typography variant="h5" className="content-title">Donées du client</Typography>
                                                <div className="f-group" style={{ margin: '0px 0' }}>
                                                    <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Téléphone</Typography>
                                                    <div className="input-group tel">
                                                        <TextInput
                                                            style={{ width: 90 }}
                                                            datatype="numeric"
                                                            defaultValue="+243"
                                                            disabled
                                                            placeholder="+243"
                                                            variant="outlined"
                                                            inputProps={{
                                                                style: {
                                                                    color: '#555'
                                                                }
                                                            }}
                                                        />
                                                        <TextInput
                                                            datatype="numeric"
                                                            fullWidth
                                                            label=" "
                                                            id="phone"
                                                            type="tel"
                                                            name="phone"
                                                            placeholder="Ex. 0971743385"
                                                            variant="outlined"
                                                            value={tel}
                                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                            onChange={e => setTel(e.target.value)}
                                                            inputProps={{
                                                                maxLength: 9
                                                            }}
                                                        />
                                                    </div>
                                                    <TextInput
                                                        id="nom"
                                                        name="nom"
                                                        label="Nom"
                                                        fullWidth
                                                        placeholder="Nom du client"
                                                        value={nom}
                                                        onChange={(e) => setNom(e.target.value)}
                                                        style={{
                                                            marginTop: 20
                                                        }}
                                                    />
                                                    <div
                                                        className="input-group"
                                                        style={{
                                                            marginTop: 20
                                                        }}>
                                                        <TextInput
                                                            label="Prénom"
                                                            name="prenom"
                                                            id="prenom"
                                                            fullWidth
                                                            placeholder="Prénom du client"
                                                            value={prenom}
                                                            onChange={(e) => setPrenom(e.target.value)}
                                                            style={{ flex: 2 }}
                                                        />
                                                        <Select
                                                            label="Sexe"
                                                            name="sexe"
                                                            id="sexe"
                                                            fullWidth
                                                            value={sexe}
                                                            style={{ flex: 1 }}
                                                            options={['Homme', 'Femme']}
                                                            onChange={(e) => setSex(e.target.value)}
                                                        />
                                                    </div>
                                                    <TextInput
                                                        label="Email"
                                                        type="email"
                                                        name="email"
                                                        id="imail"
                                                        fullWidth
                                                        placeholder="Ex. exemple@mail.ex"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        style={{
                                                            marginTop: 20
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="text"
                                                    disableElevation
                                                    color="secondary"
                                                    onClick={goToPreviousStep}
                                                >
                                                    <ChevronLeftSharp />
                                                    Précendent
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    onClick={goToNextStep}
                                                >
                                                    Suivant
                                                    <ChevronRightSharp />
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                    {step === 4 &&
                                        <div className="form-block">
                                            <div className="block-content">
                                                <PayMent montant={200} devise="CDF" description="some payment" />
                                            </div>
                                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="text"
                                                    disableElevation
                                                    color="secondary"
                                                    onClick={goToPreviousStep}
                                                >
                                                    <ChevronLeftSharp />
                                                    Précendent
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    size="large"
                                                    variant="contained"
                                                    disableElevation
                                                    color="primary"
                                                    onClick={goToNextStep}
                                                >
                                                    Suivant
                                                    <ChevronRightSharp />
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


const useStyles = makeStyles(theme => ({
    checkboxContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 10,
    },
    [theme.breakpoints.down('xs')]: {
        checkboxContainer: {
            gridTemplateColumns: '1fr',
        }
    }
}));
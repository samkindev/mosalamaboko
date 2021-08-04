import React, { useState, useEffect } from 'react';
import './reservation.css';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, useMediaQuery, useTheme, IconButton, Typography, Button, FormGroup, FormControlLabel, Checkbox, CircularProgress, LinearProgress } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Close, ChevronRightSharp, ChevronLeftSharp } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { CustomeModal as Modal } from '../../components';
import Select from '../../components/Inputs/Select';
import TextInput from '../../components/Inputs/TextInput';
import Switch from '../../components/Inputs/switch';
import { DatePicker } from '../../components/Inputs/DateTimePicker';
import { communes, useGetDepartements } from '../../customeFunctionalities/data';

import { selectAll as selectAllZones } from '../../redux/reducers/zones';
import axios from '../../config/axios';
import { validateServices, validateAddress, validateWorks, validateDateAndTime, validateUserCoords, valida } from '../../customeFunctionalities/validators';

const Reservation = () => {
    const history = useHistory();
    const [step, setStep] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const [works, setWorks] = useState([]);
    const [selectedWorks, setSelectedWorks] = useState([]);
    const [selectedWorksName, setSelectedWorksName] = useState([]);
    const [extraService, setExtraService] = useState('');
    const [commune, setCommune] = useState('KINSHASA');
    const [quartier, setQuartier] = useState('');
    const [avenue, setAvenue] = useState('');
    const [num, setNum] = useState('');
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState('8');
    const [min, setMin] = useState('00');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [sexe, setSex] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [allowLocation, setAllowLocation] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [errors, setErrors] = useState({
        works: null,
        services: null,
        commune: null,
        quartier: null,
        avenue: null,
        num: null,
        tel: null,
        nom: null,
        prenom: null,
        sexe: null,
        email: null,
        date: null,
    });

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const [stepperOrientation, setStepperOrientation] = useState('verical');

    const steps = ['Services', 'Travaux', 'Lieu', 'Date et heure', 'Client'];

    const zones = useSelector(selectAllZones);
    const { services, loading: loadingServices } = useGetDepartements();

    const handleClose = () => {
        history.goBack();
    };

    const handleCancel = () => {

    };

    const handleSubmit = () => {
        const com = communes.find(c => c.name.toLowerCase() === commune.toLowerCase());
        const zone = zones.find(z => z.nom.toLowerCase() === com.district.toLowerCase());

        const date_w = new Date();

        const data = { nom, prenom, sexe, tel, email, date_w, commune, quartier, avenue, num, zone: zone.id, services: selectedWorks };

        setSaving(true);
        axios.post('/demande/prestation', data)
            .then(res => {
                const data = res.data;
                if (!data.code) {
                    setIsFinished(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setSaving(false));
    };

    const handleSelectService = (e) => {
        let selected = selectedServices;
        const service = services.find(s => s.id === e.target.value);

        const checked = e.target.checked;
        if (!checked) {
            selected = selected.filter(s => s !== e.target.value);

            const w = works.filter(w => !service.services.some(s => s.id === w.id));
            setWorks(w);
        } else {
            selected.push(e.target.value);

            setWorks(works => ([
                ...works,
                ...service.services
            ]));
        }

        setSelectedServices(selected);
    };

    const handleChangeWork = (e) => {
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

    const handleAllowLocation = (e) => {
        setAllowLocation(e.target.checked);
    };

    const handleChangeCommune = (e) => {
        setCommune(e.target.value);
    };

    const handleSelectDate = (date) => {
        setDate(date);
    };

    const goToNextStep = () => {
        if (step > 4) {
            return;
        }
        let valid = true;
        switch (step) {
            case 0:
                valid = validateServices(selectedServices);
                if (!valid) {
                    setErrors(errors => ({ ...errors, services: 'Selectionnez au moins un service.' }));
                } else {
                    setErrors(errors => ({ ...errors, services: null }));
                }
                break;
            case 1:
                valid = validateWorks(selectedWorks);
                if (!valid) {
                    setErrors(errors => ({ ...errors, works: 'Selectionnez ou ajoutez au moin un travail.' }));
                } else {
                    setErrors(errors => ({ ...errors, works: null }));
                }
                break;
            case 2:
                const { valid: v, error } = validateAddress(commune, quartier, avenue, num);
                valid = v;
                setErrors(errors => ({
                    ...errors,
                    ...error
                }));
                break;
            case 3:
                const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min);
                valid = validateDateAndTime(d);
                if (!valid) {
                    setErrors(errors => ({ ...errors, date: 'Mauvaise date ou heure selectionnée. La date et l\'heure ne doivent pas être inferieures à l\'instant présent.' }));
                } else {
                    setErrors(errors => ({ ...errors, date: null }));
                }
                break;
            case 4:
                const { error: err, valid: val } = validateUserCoords(tel, nom, prenom, sexe, email);
                valid = val;
                setErrors(errors => ({ ...errors, ...err }));
                break;
            default:
                break;
        }

        if (valid) {
            setStep(step + 1);
        }
    };


    const goToPreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }

        if (step === 1) {
            setSelectedWorks([]);
            setErrors(error => ({ ...errors, works: null }));
        }
    };

    const goToStep = (step, activeStep) => {
        if (step <= 4 && step >= 0 && activeStep > step) {
            setStep(step);
        }

        if (step < 1) {
            setSelectedWorks([]);
            setErrors(error => ({ ...errors, works: null }));
        }
    };

    useEffect(() => {
        if (matches) {
            setStepperOrientation('horizontal');
        } else {
            setStepperOrientation('vertical');
        }
    }, [matches]);
    const classes = useStyles();

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h4" className={classes.question}>Selection de service</Typography>
                                <Typography variant="body1" color="textSecondary" className={classes.blockDescription}>Vous pouvez reserver un ou plusieurs services. Selectionnez tous les services que vous voulez reserver.</Typography>
                                {errors.services &&
                                    <Alert severity="error" color="error">{errors.services}</Alert>
                                }
                            </div>
                            <div className={classes.artisanList}>
                                {services.map((service) => (
                                    <div key={service.id} className={classes.card}>
                                        <label htmlFor={service.id} className={classes.cardInfo}>
                                            <div className={classes.icon}>
                                                <img src={service.image} alt={service.nom_departement} />
                                            </div>
                                            <Typography variant="body1" className={classes.cardTitle}>{service.nom_departement}</Typography>
                                        </label>
                                        <input type="checkbox" checked={selectedServices.some(s => s === service.id)} onChange={handleSelectService} id={service.id} value={service.id} className={classes.checkbox} />
                                    </div>
                                ))}
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
                    </div>
                );
            case 1:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="body1" className={classes.question}>Détails des travaux</Typography>
                                <Typography variant="body1" color="textSecondary" className={classes.blockDescription}>Selectionnez les travaux. Si un travail que vous cherchez ne se trouve pas dans la liste, ajoutez le dans le champs <span style={{ fontWeight: 'bold' }}>autre travail</span>.</Typography>
                                {errors.works &&
                                    <Alert severity="error" color="error">{errors.works}</Alert>
                                }
                            </div>
                            <FormGroup row className={classes.checkboxGroup}>
                                {works.map((work) => (
                                    <FormControlLabel
                                        className="m-checkbox"
                                        key={work.id}
                                        control={
                                            <Checkbox
                                                size="small"
                                                value={work.id}
                                                onChange={handleChangeWork}
                                                name={work.nom_service}
                                                color="secondary"
                                            />
                                        }
                                        label={work.nom_service}
                                    />
                                ))}
                            </FormGroup>
                            <div style={{ marginTop: 20 }} className="f-group">
                                <TextInput
                                    label="Autre travail ?"
                                    placeholder="Votre text ici"
                                    multiline={true}
                                    rowsMax={5}
                                    fullWidth
                                    value={extraService}
                                    onChange={(e) => setExtraService(e.target.value)}
                                />
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
                    </div>
                );
            case 2:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h5" className={classes.question}>Lieu d'intervation</Typography>
                            </div>
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
                                            error={errors.commune ? true : false}
                                            helperText={errors.commune}
                                        />
                                        <TextInput
                                            label="Numéro"
                                            value={num}
                                            onChange={(e) => setNum(e.target.value)}
                                            fullWidth
                                            inputStyles={{ marginTop: 10 }}
                                            placeholder="Numéro de la parcelle"
                                            style={{ marginTop: 15 }}
                                            error={errors.num ? true : false}
                                            helperText={errors.num}
                                        />
                                    </div>
                                    <div className="location-group">
                                        <TextInput
                                            label="Quartier"
                                            value={quartier}
                                            onChange={e => setQuartier(e.target.value)}
                                            inputStyles={{ marginTop: 10 }}
                                            fullWidth
                                            placeholder="Nom du quartier"
                                            error={errors.quartier ? true : false}
                                            helperText={errors.quartier}
                                        />
                                        <TextInput
                                            label="Avenue"
                                            value={avenue}
                                            onChange={e => setAvenue(e.target.value)}
                                            fullWidth
                                            placeholder="Nom de l'avenue"
                                            inputStyles={{ marginTop: 10 }}
                                            style={{ marginTop: 15 }}
                                            error={errors.avenue ? true : false}
                                            helperText={errors.avenue}
                                        />
                                    </div>
                                </div>
                                <div className={classes.position}>
                                    <Typography variant="body1" style={{ textAlign: 'start', marginBottom: 10 }}>Coordonnées géographiques</Typography>
                                    <Typography variant="body1" color="textSecondary" className={classes.inputDescription}>Si votre position actuelle est le lieu d'intervation, activez la locatisation.</Typography>
                                    <Switch
                                        name="coords"
                                        label="Activer ma position"
                                        checked={allowLocation}
                                        handleChange={handleAllowLocation}
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
                    </div>
                );
            case 3:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h5" className={classes.question}>Date et heure d'intervation</Typography>
                                {errors.date &&
                                    <Alert severity="error" color="error">{errors.date}</Alert>
                                }
                            </div>
                            <div className="f-group">
                                <div className=" date-time">
                                    <div className="picker">
                                        <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Date</Typography>
                                        <DatePicker
                                            selectedDate={date}
                                            setSelectedDate={handleSelectDate}
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
                                                    options={[0, 10, 20, 30, 40, 50].map((e, i) => {
                                                        if (e < 10) {
                                                            return "0" + e
                                                        }

                                                        return "" + e
                                                    })}
                                                />
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
                    </div>
                );
            case 4:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h5" className={classes.question}>Données du client</Typography>
                            </div>
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
                                        datatype="tel"
                                        name="tel"
                                        id="tel"
                                        fullWidth
                                        label=" "
                                        placeholder=""
                                        variant="outlined"
                                        value={tel}
                                        onChange={e => setTel(e.target.value)}
                                        inputProps={{
                                            maxLength: 9,
                                            type: 'tel'
                                        }}
                                        error={errors.tel ? true : false}
                                        helperText={errors.tel}
                                    />
                                </div>
                                <TextInput
                                    label="Nom"
                                    name="nom"
                                    id="nom"
                                    fullWidth
                                    placeholder="Nom du client"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    style={{
                                        marginTop: 20
                                    }}
                                    error={errors.nom ? true : false}
                                    helperText={errors.nom}
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
                                        error={errors.prenom ? true : false}
                                        helperText={errors.prenom}
                                    />
                                    <Select
                                        label="Sexe"
                                        name="sexe"
                                        id="sexe"
                                        fullWidth
                                        value={sexe}
                                        style={{ flex: 1 }}
                                        options={[{ name: 'Homme', id: 'M' }, { name: 'Femme', id: 'H' }]}
                                        onChange={(e) => setSex(e.target.value)}
                                        error={errors.sexe ? true : false}
                                        helperText={errors.sexe}
                                    />
                                </div>
                                <TextInput
                                    label="Email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    fullWidth
                                    placeholder="Ex. exemple@mail.ex"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        marginTop: 20
                                    }}
                                    error={errors.email ? true : false}
                                    helperText={errors.email}
                                />
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
                                    Terminer
                                    <ChevronRightSharp />
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={`${classes.lastBlock}`}>
                                {saving &&
                                    <div className={classes.saving}>
                                        <LinearProgress color="primary" />
                                    </div>
                                }
                                <div className={classes.blockHeader}>
                                    <Typography variant="h5" className={classes.lastTitle}>Votre reservation</Typography>
                                    <div className={classes.lastStep}>
                                        <Typography variant="body2" className={classes.userDataDisplay}>
                                            <span>Client</span>
                                            <span>{tel}</span>
                                        </Typography>
                                        <Typography variant="body2" className={classes.userDataDisplay}>
                                            <span>Adresse</span>
                                            <span>{commune}, {quartier} {avenue} {num}</span>
                                        </Typography>
                                        <Typography variant="body2" className={classes.userDataDisplay}>
                                            <span>Date</span>
                                            <span>{date.toDateString()} {hour}:{min}</span>
                                        </Typography>
                                        <div style={{ margin: '15px 0' }}>
                                            <Typography variant="body2" className={classes.userDataDisplay}><span>Travaux reservés</span></Typography>
                                            <ul style={{ padding: '10px 0', color: '#444', maxHeight: 75, overflowY: 'auto', listStyle: 'inside' }}>
                                                {selectedWorksName.map(w => {
                                                    return (
                                                        <li key={w.id}>{w.nom_service}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                        <div style={{ margin: '15px 0' }}>
                                            <Typography variant="body2" className={classes.userDataDisplay}><span>Frais de transport et communication (artisan)</span></Typography>
                                            <div style={{ marginTop: 10 }}>
                                                <Typography variant="h5" color="textSecondary">5000Fc</Typography>
                                                <Typography style={{ marginTop: 5 }} variant="body2" color="textSecondary">A payer avant le début des travaux.</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.outerFormActions}>
                                    <Typography variant="body1" color="textSecondary" style={{ textAlign: 'justify' }}>En appuyant sur <strong>confirmer</strong> vous acceptez les <Link to="#" className="important-link">conditions d'utlisation</Link> de Mosala maboko.</Typography>
                                    <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                        <Button
                                            className="btn"
                                            size="large"
                                            fullWidth
                                            variant="text"
                                            disableElevation
                                            color="primary"
                                            onClick={handleCancel}
                                            style={{ maxWidth: 100 }}
                                        >
                                            Non merci
                                        </Button>
                                        <Button
                                            className="btn"
                                            size="large"
                                            fullWidth
                                            variant="contained"
                                            disableElevation
                                            color="primary"
                                            onClick={handleSubmit}
                                            style={{ maxWidth: 110 }}
                                        >
                                            Confirmer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <Modal open={true} handleClose={handleClose} contentContainerStyles={{ padding: 0 }}>
            <div className={`reservation ${classes.container}`}>
                {isFinished ?
                    <div className={classes.infoContainer}>
                        <div className={classes.infoInnerContainer}>
                            <div className={classes.logo} style={{ height: '100%', width: 110 }}>
                                <div className="logo-image">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <Typography variant="h5" color="textPrimary">Reservation envoyée</Typography>
                            <Typography variant="body1" color="textSecondary">Votre demande a été envoyée avec succès. Nous allons contacter le numéro <strong>{tel}</strong> pour confirmer votre reservation.</Typography>
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                disableElevation
                                className="btn"
                                onClick={handleClose}
                            >
                                Ok
                            </Button>
                        </div>
                    </div> :
                    <>
                        <div className={classes.pageHeader}>
                            <div className={classes.logo} style={{ height: '100%' }}>
                                <div className="logo-image">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <Typography variant="h1" className={classes.title} color="primary">Reserver une prestation</Typography>
                            <IconButton className={classes.closeBtn} onClick={handleClose}>
                                <Close fontSize="small" />
                            </IconButton>
                        </div>
                        {loadingServices ?
                            <div className={classes.loading}>
                                <CircularProgress size={30} color="primary" />
                            </div> : (
                                <div className={classes.body}>
                                    <Stepper activeStep={step} orientation={stepperOrientation} className={classes.stepper}>
                                        {steps.map((label, index) => (
                                            <Step key={label} onClick={() => goToStep(index, step)} style={{ cursor: 'pointer' }}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    {getStepContent(step)}
                                </div>
                            )
                        }
                    </>
                }
            </div>
        </Modal>
    )
}


const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#fbfbfb',
        position: 'relative',
        width: '100vw',
        height: '100vh',
    },
    infoContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px'
    },
    infoInnerContainer: {
        maxWidth: 700,
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        "& >*:not(:last-child)": {
            marginBottom: 20
        }
    },
    loading: {
        width: '100%',
        height: '100%',
        backgroundColor: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        position: 'relative',
        boxShadow: '1px 1px 1px #efefef',
    },
    logo: {
        width: '70px'
    },
    closeBtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 20,
    },
    title: {
        textTransform: 'uppercase',
        fontSize: '14px!important',
        fontWeight: "700!important",
        flex: 1,
        marginLeft: 20,
    },
    body: {
        display: 'flex',
        height: 'calc(100% - 75px)',
        position: 'relative'
    },
    stepper: {
        backgroundColor: 'inherit',
        height: '56%',
        "& .MuiStepIcon-active": {
            color: theme.palette.secondary.main
        },
        "& .MuiStepIcon-completed": {
            color: theme.palette.secondary.main
        }
    },
    formBlock: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: '20px 0',
        overflowY: 'auto'
    },
    innerBlock: {
        width: 670,
        margin: 'auto',
        padding: '0 10px',
    },
    lastBlock: {
        width: 500,
        padding: 20,
        margin: 'auto',
        border: '1px solid #eaeaea',
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflowX: 'hidden'
    },
    saving: {
        position: 'absolute',
        top: '-1px',
        left: '-10px',
        right: '-10px',
    },
    artisanList: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 20,
        marginTop: 15,
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        position: 'relative',
        border: '1px solid #e6e6e673'
    },
    cardInfo: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        paddingRight: 35,
        cursor: 'pointer',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    checkbox: {
        position: 'absolute',
        top: '50%',
        right: 10,
        transform: 'translateY(-50%)',
    },
    blockHeader: {
        margin: '0 0 25px 0'
    },
    question: {
        textAlign: 'center',
        fontSize: '35px!important',
    },
    blockDescription: {
        textAlign: 'center',
        marginTop: 15,
    },
    inputDescription: {
        fontSize: '17px!important',
        marginBottom: 10
    },
    checkboxGroup: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 10,
        width: '100%',
    },
    position: {
        margin: '20px 0'
    },
    lastStep: {
        margin: '15px 0'
    },
    lastStepDetails: {
        margin: '10px 0'
    },
    userDataDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '2px 0',
        color: '#444!important',
        "& span:first-child": {
            fontWeight: '600',
            fontSize: 15,
        }
    },
    [theme.breakpoints.down('sm')]: {
        stepper: {
            height: 'fit-content',
            maxWidth: 600,
            margin: 'auto',
        },
        body: {
            flexDirection: 'column',
        },
        blockDescription: {
            marginTop: 10,
        },
        artisanList: {
            gridTemplateColumns: 'auto',
            gap: 10
        },
        innerBlock: {
            width: '100%',
            maxWidth: 600
        },
        question: {
            fontSize: '30px!important'
        }
    },
    [theme.breakpoints.down('xs')]: {
        title: {
            marginLeft: 10,
            fontSize: '12px !important',
        },
        stepper: {
            padding: '15px!important',
            "& > div > span > span:last-child": {
                display: 'none'
            }
        },
        innerBlock: {
            paddingBottom: 50
        },
        checkboxGroup: {
            gridTemplateColumns: 'auto',
        },
        question: {
            fontSize: '25px!important'
        },
        lastBlock: {
            position: 'static',
            width: '100%',
        }
    },
}))

export default Reservation;

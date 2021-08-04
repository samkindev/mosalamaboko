import React from 'react ';
import { makeStyles, Typography, Button } from '@material-ui/core';
import TextInput from '../Inputs/TextInput';
import Select from '../Inputs/Select';

const SignUpForm = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div>
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
                            placeholder=""
                            variant="outlined"
                            value={tel}
                            onChange={e => setTel(e.target.value)}
                            inputProps={{
                                maxLength: 9,
                                type: 'tel'
                            }}
                        />
                    </div>
                    <TextInput
                        label="Nom"
                        fullWidth
                        placeholder="Nom du client"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        style={{
                            marginTop: 20
                        }}
                    />
                    <TextInput
                        label="Postnom"
                        fullWidth
                        placeholder="Postnom du client"
                        value={postNom}
                        onChange={(e) => setPostNom(e.target.value)}
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
                            fullWidth
                            placeholder="Prénom du client"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            style={{ flex: 2 }}
                        />
                        <Select
                            label="Sexe"
                            fullWidth
                            value={sexe}
                            style={{ flex: 1 }}
                            options={['Homme', 'Femme']}
                            onChange={(e) => setSex(e.target.value)}
                        />
                    </div>
                    <TextInput
                        label="Email"
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
                    variant="contained"
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
    )
};

const useStyles = makeStyles(theme => ({
    container: {},
}));

export default SignUpForm
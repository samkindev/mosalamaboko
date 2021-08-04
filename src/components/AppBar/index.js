import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './appBar.css';
import logo from '../../assets/logo.png';

import { Button, Typography, Hidden } from '@material-ui/core';

export default function AppBar() {
    const history = useHistory();
    const goToReservation = () => {
        history.push('/reservation');
    };
    return (
        <div className="appbar">
            <div className="container">
                <div className="inner-content inner-appbar">
                    <Link to="/" style={{ display: 'block' }}>
                        <div className="logo" style={{ height: '100%' }}>
                            <div className="logo-image">
                                <img src={logo} alt="logo" />
                            </div>
                            <Typography variant="h1" color="primary" className="logo-string">Mosala maboko</Typography>
                        </div>
                    </Link>
                    <ul className="menu">
                        <Link className="menu-item" to="/demande_devis">Demander un devis</Link>
                        <Link className="menu-item" to="/">Contacts</Link>
                    </ul>
                    <div className="connexion">
                        <Button
                            className="btn reserv"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={goToReservation}
                        >
                            Reserver<Hidden xsDown>une prestation</Hidden>
                        </Button>
                        <Button
                            className="btn"
                            variant="contained"
                            disableElevation
                            color="secondary"
                            onClick={() => { }}
                        >Connecter</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import './mainPage.css';
import { Button } from '@material-ui/core';
import { Help, UsualWorks, Engagements, Services, DemandePrestationPannel } from '../../components';

import { Typography } from '@material-ui/core';

export default function MainPage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAskReservation = () => {
        handleOpen();
    };
    return (
        <div className="home">
            <section className="content hero">
                <div className="container">
                    <div className="inner-content hero-content">
                        <Typography variant="h1" className="title">Le placement des technicien(ne)s qualifié(e)s</Typography>
                        <Typography variant="h5" className="devise">Vous avez une panne ? Obtenez rapidement de l'aide</Typography>
                        <div className="actions">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                className="btn hero-btn"
                                onClick={handleAskReservation}
                            >Trouvez un technicien</Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content help">
                <div className="inner-content">
                    <Help />
                </div>
            </section>
            <section className="content service">
                <Services />
            </section>
            <section className="content">
                <div className="container">
                    <div className="inner-content">
                        <UsualWorks />
                    </div>
                </div>
            </section>
            <section>
                <Engagements handleAskReservation={handleAskReservation} />
            </section>
            <DemandePrestationPannel
                open={open}
                handleClose={handleClose}
            />
        </div>
    )
}

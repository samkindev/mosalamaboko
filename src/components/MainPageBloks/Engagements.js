import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import './styles.css';

export default function Engagements({ handleAskReservation }) {
    const classes = useStyles();
    return (
        <div className={`engagement`}>
            <div className="container">
                <div className="inner-content">
                    <div className={classes.container}>
                        <div className={classes.content}>
                            <Typography className={`${classes.title} big-title`}>Notre engagement</Typography>
                            <Typography variant="body1" className="second-text">Nous mettons à votre disposition des hommes et des femmes talentueux (ses), radieux (ses) et excellent (es) pour la réalisation de vos différents travaux, en cas d’un dommage causé, nous vous assurons réparation.</Typography>
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
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        textAlign: 'center',
    },
    title: {
        marginBottom: 15,
    }
});

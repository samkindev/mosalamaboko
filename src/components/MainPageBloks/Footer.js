import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import Contacts from './Contacts';

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.top}>
                    <div className={classes.firstTop}>
                        <div className={classes.about}>
                            <Typography className={classes.title}>A propos</Typography>
                            <ul>
                                <li className={classes.listItem}>
                                    <Link to="/">Qui sommes nous ?</Link>
                                </li>
                                <li className={classes.listItem}>
                                    <Link to="/">Nous rejoindre</Link>
                                </li>
                                <li className={classes.listItem}>
                                    <Link to="/">Charte qualité</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={classes.links}>
                            <Typography className={classes.title}>Quelques liens</Typography>
                            <ul>
                                <li className={classes.listItem}>
                                    <Link to="/">C.G.U.S</Link>
                                </li>
                                <li className={classes.listItem}>
                                    <Link to="/">FAQ</Link>
                                </li>
                                <li className={classes.listItem}>
                                    <Link to="/">Motions légales</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section>
                    <Contacts />
                </section>
            </div>
            <div className={classes.copyRight}>
                <Typography>© Gifted Hands Technology. Tous droits reservés</Typography>
            </div>
        </div >
    )
}

const useStyles = makeStyles(theme => ({
    footer: {
        position: 'relative',
        height: '100%'
    },
    container: {
        padding: '70px 0',
        color: '#ababab',
        fontSize: 17,
    },
    firstTop: {
        maxWidth: 400,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
    },
    copyRight: {
        width: '100%',
        backgroundColor: '#02041f',
        padding: 20,
        textAlign: 'center',
        color: '#ffffff7a',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 150,
        backgroundColor: '#fff',
    },
    logoText: {
        fontWeight: '500',
        fontSize: 20,
    },
    title: {
        fontSize: 'inherit',
        fontWeight: '600',
        marginBottom: 10
    },
    listItem: {
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        transition: '.2s',
        fontSize: 15,
        '& > a:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
        '& > a': {
            color: 'inherit',
        }
    }
}));

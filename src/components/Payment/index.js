import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';

const Payment = (props) => {
    const { montant, devise, description } = props;

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <form action="https://sandbox1.maishapay.net/checkout" method="POST">
                <input type="hidden" name="apiOptions" value={1} />
                <input type="hidden" name="apikey" value="urn:maishapay:b79a3e34b04ccca1dde630e7a41a401c43470b6f" />
                <input type="hidden" name="gateway_mode" value="Sandbox" />
                <input type="hidden" name="montant" value={montant} />
                <input type="hidden" name="monnaie" value={devise} />

                <input type="hidden" name="payment_description" value={description} />
                <input type="hidden" name="logo_url" value="mosala maboko" />
                <input type="hidden" name="page_callback_success" value="http://127.0.0:3000/success" />

                <input type="hidden" name="page_callback_failure" value="http://127.0.0:3000/failure" />

                <input type="hidden" name="page_callback_cancel" value="http://127.0.0:3000/cancel" />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    size="large"
                >
                    Confirmer
                </Button>
            </form>
        </div>
    )
};

Payment.propTypes = {
    montant: PropTypes.number.isRequired,
    devise: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

const useStyles = makeStyles(theme => ({
    container: {}
}));

export default Payment;
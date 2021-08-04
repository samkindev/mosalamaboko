import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainPage, DemandeDevis, Reservation, TrouverArtisan } from './pages';
import { AppBar, Footer } from './components';

import { ThemeProvider } from '@material-ui/core';

import theme from './theme';

import { useDispatch } from 'react-redux';
import { getServices } from './redux/reducers/services';
import { getDepartements } from './redux/reducers/departements';
import { getZones } from './redux/reducers/zones';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getZones());
    dispatch(getDepartements());
    dispatch(getServices());
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="topbar">
          <AppBar />
        </div>
        <div className="main-container">
          <Switch>
            <Route
              path="/"
              exact
              component={MainPage}
            />
            <Route
              path="/demande_devis"
              exact
              component={DemandeDevis}
            />
            <Route
              path="/reservation"
              exact
              component={Reservation}
            />
            <Route
              path="/urgence/:service"
              exact
              component={TrouverArtisan}
            />
          </Switch>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

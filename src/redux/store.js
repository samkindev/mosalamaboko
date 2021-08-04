import { configureStore } from '@reduxjs/toolkit';
import { reducer as serviceReducer } from './reducers/services';
import { reducer as departementReducer } from './reducers/departements';
import { reducer as zoneReducer } from './reducers/zones';

export const store = configureStore({
    reducer: {
        zones: zoneReducer,
        departements: departementReducer,
        services: serviceReducer
    }
});
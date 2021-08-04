import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const departementEntity = createEntityAdapter();

const initialState = departementEntity.getInitialState({
    reqStatus: 'idle',
    error: null
});

export const getDepartements = createAsyncThunk(
    'departement/get all',
    async () => {
        const response = await axios.get('/departement');
        return response.data;
    }
);

export const { reducer } = createSlice({
    name: 'departement',
    initialState,
    extraReducers: {
        [getDepartements.pending]: (state, action) => {
            state.serviceReqStatus = 'pending';
        },
        [getDepartements.fulfilled]: (state, action) => {
            state.serviceReqStatus = 'fulfilled';
            departementEntity.upsertMany(state, action.payload);
        },
        [getDepartements.failed]: (state, action) => {
            state.serviceReqStatus = 'failed';
        },
    }
});

export const {
    selectAll,
    selectById,
} = departementEntity.getSelectors(state => state.departements);

export const getReqStatus = state => state.departements.reqStatus;
export const getError = state => state.departements.error;

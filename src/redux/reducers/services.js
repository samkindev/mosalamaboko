import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const serviceEntity = createEntityAdapter();

const initialState = serviceEntity.getInitialState({
    reqStatus: 'idle',
    count: 0,
    error: null
});

export const getServices = createAsyncThunk(
    'services/get all',
    async () => {
        const response = await axios.get('/service');
        return response.data;
    }
);

export const { reducer } = createSlice({
    name: 'services',
    initialState,
    extraReducers: {
        [getServices.pending]: (state, action) => {
            state.serviceReqStatus = 'pending';
        },
        [getServices.fulfilled]: (state, action) => {
            state.serviceReqStatus = 'fulfilled';
            serviceEntity.upsertMany(state, action.payload.services);
            state.count = action.payload.count;
        },
        [getServices.failed]: (state, action) => {
            state.serviceReqStatus = 'failed';
        },
    }
});

export const {
    selectAll,
    selectById,
} = serviceEntity.getSelectors(state => state.services);

export const getReqStatus = state => state.services.reqStatus;
export const getError = state => state.services.error;
export const getCount = state => state.services.count;

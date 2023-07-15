import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type watchState = {
    hours: number;
    minutes: number;
    seconds: number;
    miliseconds: number;
};

const initialState: watchState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,
};

const watchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        start: (state) => {
            if (state.minutes === 59) {
                state.hours += 1;
                state.minutes = 0;
                state.seconds = 0;
            } else if (state.seconds === 59) {
                state.minutes += 1;
                state.seconds = 0;
            } else
                state.seconds += 1;

        },
        milisec: (state) => {
            if (state.miliseconds === 99) {
                state.miliseconds = 0;
            } else {
                state.miliseconds += 1;
            }
        },
        reset: (state) => {
            state.hours = 0;
            state.minutes = 0;
            state.seconds = 0;
            state.miliseconds = 0;
        }
    }
});

export const { start, milisec, reset } = watchSlice.actions;
export const selectWatch = (state: RootState) => state.watch;
export default watchSlice.reducer;
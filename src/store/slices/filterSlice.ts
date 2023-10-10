import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filterState {
    filters: string[];
    acttiveFilter: string
}

const initialState: filterState = {
    filters: ['All', 'Completed', 'In process'],
    acttiveFilter: 'All'
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<string>) => {
            state.acttiveFilter = action.payload;
        }
    }
})

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
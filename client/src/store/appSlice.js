import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state, action) => {
            console.log(action);
        });
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.categories = action.payload.createCategory
            state.isLoading = false
        });
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            console.log(action.message);
        });
    }
})

export default appSlice.reducer;
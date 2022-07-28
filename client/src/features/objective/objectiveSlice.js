import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import objectiveService from './objectiveService'

const initialState = {
    objectives: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const objectiveSlice = createSlice({
    name: 'objective',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createObjective.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createObjective.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.objectives.push(action.payload)
        })
        .addCase(createObjective.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getObjectives.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getObjectives.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.objectives = action.payload
        })
        .addCase(getObjectives.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteObjective.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteObjective.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.objectives = state.objectives.filter(objective => objective._id !== action.payload.id)
        })
        .addCase(deleteObjective.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const getObjectives = createAsyncThunk('objective/all',  objectiveService.get)

export const {reset} = objectiveSlice.actions

export default objectiveSlice.reducer

export const createObjective = createAsyncThunk('objective/create', objectiveService.create)
export const deleteObjective = createAsyncThunk('objective/delete', objectiveService.remove)
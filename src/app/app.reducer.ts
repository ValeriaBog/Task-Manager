import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher((action) => {//касается всех редьюсеров, добавляем крутилку, когда срабатывает какой-либо редьюсер(Тулкит добавляет в конец '/pending')
                console.log('111', action)
                return action.type.endsWith('/pending')//если action заканчивается на panding, то...
            }, (state) => {
                console.log('222')
                state.status = 'loading'//меняем статус, а значит
            })
            .addMatcher((action) => {
                return action.type.endsWith('/fulfilled')
            }, (state) => {
                state.status = 'succeeded'
            })
            .addMatcher((action) => {
                return action.type.endsWith('/rejected')
            }, (state, action) => {
                const { payload, error } = action
                if (payload) {
                    if (payload.showGlobalError) {
                        state.error = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
                    }
                } else {
                    state.error = error.message ? error.message : 'Some error occurred'
                }
                state.status = 'failed'

            })
    }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

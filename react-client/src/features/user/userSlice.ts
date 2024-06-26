import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../app/types"
import { userApi } from "../../app/servises/userApi"
import type { RootState } from "../../app/store"

interface InitialState {
  user: User | null
  isAuthentificated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  isAuthentificated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthentificated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthentificated = true
        state.current = action.payload
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload
        },
      )
  },
})

export const {logout, resetUser} = slice.actions;
export default slice.reducer;


export const selectIsAuthentificated = (state: RootState) => 
  state.user.isAuthentificated

export const selectCurrent = (state: RootState) =>
  state.user.current

export const selectUser = (state: RootState) =>
  state.user.user
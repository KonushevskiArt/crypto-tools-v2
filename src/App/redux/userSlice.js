import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  id: null
};

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setUser(state, action) {
      console.log(action)
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.email = null;
    },
  }
})

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer; 
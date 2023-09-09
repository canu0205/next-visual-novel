import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    name: "",
    likeness: {
      class1: "50",
      class2: "50",
      class3: "50",
      class4: "50",
      class5: "50",
    },
    curRound: "0",
    curClass: "0",
  },
  reducers: {
    setAccount(state, action) {
      state.name = action.payload;
    },
    setLikeness(state, action) {
      state.likeness = action.payload;
    },
    setCur(state, action) {
      state.curRound = action.payload.curRound;
      state.curClass = action.payload.curClass;
    },
  },
});

export const { setAccount, setLikeness, setCur } = accountSlice.actions;
export default accountSlice.reducer;

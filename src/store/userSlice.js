import { createSlice } from "@reduxjs/toolkit";
import { joinUser, loginUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Join
      .addCase(joinUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(joinUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("회원가입을 성공했습니다");
      })
      .addCase(joinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //Login
      .addCase(loginUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        console.log(action);
        toast.info("로그인을 성공했습니다");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;

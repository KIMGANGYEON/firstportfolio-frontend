import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  authUser,
  editUser,
  editUserPassword,
  getCartItems,
  joinUser,
  loginUser,
  logoutUser,
  removeCartItem,
} from "./thunkFunctions";
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
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        toast.info("로그인을 성공했습니다");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //Auth
      .addCase(authUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })
      //Logout
      .addCase(logoutUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
        toast.info("로그아웃 되었습니다");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //Edit User
      .addCase(editUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        toast.info("회원정보가 수정되었습니다");
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //Edit User Password
      .addCase(editUserPassword.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(editUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        toast.info("비밀번호가 수정되었습니다");
      })
      .addCase(editUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //Addcart
      .addCase(addToCart.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.cart = action.payload;
        toast.info("장바구니에 추가되었습니다");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //getCart
      .addCase(getCartItems.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      //removeCartItem
      .addCase(removeCartItem.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload.productInfo;
        state.userData.cart = action.payload.cart;
        toast.info("상품이 장바구니에서 제거되었습니다");
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;

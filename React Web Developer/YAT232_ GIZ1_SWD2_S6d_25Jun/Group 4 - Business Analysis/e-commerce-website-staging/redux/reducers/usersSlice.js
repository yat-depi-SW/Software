import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
  users: [],
  logged: false,
  id: null,
  currentUser: null,
  status: null, // {pending, success}
};
const USERS_ULR = "http://localhost:3000/users";
// const USERS_ULR = "https://ecommerce-endpoint.vercel.app/users";

export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(USERS_ULR);
  return response.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const response = await axios.get(`${USERS_ULR}/${userId}`);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (initialUser) => {
    const { id } = initialUser;
    const response = await axios.patch(`${USERS_ULR}/${id}`, initialUser);
    return response.data;
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (initialUser) => {
    const newUser = { ...initialUser, role: "user", cart: [] };
    const response = await axios.post(USERS_ULR, newUser);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await axios.delete(`${USERS_ULR}/${userId}`);
    return userId;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.logged = false;
      state.currentUser = null;
      state.status = null;
      localStorage.removeItem("id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const userData = action.payload;
        const { id } = userData;
        state.logged = true;
        state.id = id;
        state.currentUser = userData;
        state.status = "success";
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.id === state.id) state.currentUser = action.payload;
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            user = action.payload;
          }
          return user;
        });
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});
export const { logout, addToCart } = usersSlice.actions;
export default usersSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  deleteTokenFromStorage,
  getToken,
  saveTokenToStorage,
} from "../../utils/handleLocalStorage";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const apiUrl = "http://localhost:5004";

      const { data } = await axios.post(
        `${apiUrl}/api/user/login`,
        { email, password },
        config
      );
      // store user's token in local storage
      saveTokenToStorage(data.data.accessToken);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      firstname,
      lastname,
      email,
      password,
      phoneno,
      dateofbirth,
      gender,
      address,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const apiUrl = "http://localhost:5004";
      const { data } = await axios.post(
        `${apiUrl}/api/user/register`,
        {
          firstname,
          lastname,
          email,
          password,
          phoneno,
          dateofbirth,
          gender,
          address,
        },
        config
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async ({ userId }, { rejectWithValue }) => {
    console.log("is", userId);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      };

      const apiUrl = "http://localhost:5004";

      const { data } = await axios.post(
        `${apiUrl}/api/user/logout`,
        { userId },
        config
      );
      // store user's token in local storage
      deleteTokenFromStorage("token");
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

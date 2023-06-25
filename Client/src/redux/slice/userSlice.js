import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
    userData: {},
    userAddress: []
  },
  reducers: {
    getUsersStart(state, action) {
      state.userData = action;
    },
    getUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess(state) {
      state.loading = false;
    },
    registerUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.loading = false;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state) {
      state.loading = false;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserAddress: (state, action) => {
      state.userAddress = action.payload
    }
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserAddress
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUsers = (user) => async (dispatch) => {
  try {
    dispatch(getUsersStart(user));

  } catch (error) {
    dispatch(getUsersFailure(error.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserStart());
    await axios.post('http://localhost:8000/register', userData);
    dispatch(registerUserSuccess());
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await axios.delete(`http://localhost:8000/delete/${userId}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    await axios.put(`http://localhost:8000/update/${userId}`, userData);
    dispatch(updateUserSuccess());
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

export const getGeocoding = (addressId, countryName) => (dispatch) => {
  axios
      .get(`http://localhost:8000/users/address/${countryName}/${addressId}`)
      .then((response) => {
        dispatch(getUserAddress(response.data))
      })
      .catch((error) => {
        throw error;
      });
};

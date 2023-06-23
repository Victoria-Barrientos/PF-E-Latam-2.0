import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ratingReviewSlice = createSlice({
    name: 'reviews',
    initialState: {
      reviews: [],
      review: {},
    },
    reducers: {},

    extraReducers: (builder) => {
      builder
        .addCase(getAllReviewsForProduct.fulfilled, (state, action) => {
          state.reviews = action.payload;
        })
        .addCase(getReviewById.fulfilled, (state, action) => {
          state.review = action.payload;
        })
        .addCase(postReview.fulfilled, (state, action) => {
          state.reviews.push(action.payload);
        })
        .addCase(deleteReview.fulfilled, (state, action) => {
          state.reviews = state.reviews.filter(review => review.id !== action.payload.id);
        })
        .addCase(updateReview.fulfilled, (state, action) => {
          state.reviews = state.reviews.map(review => {
            if (review.id === action.payload.id) {
              return action.payload;
            }
            return review;
          });
        });
    },
  });

  export const getAllReviewsForProduct = createAsyncThunk(
    'reviews/getAllReviewsForProduct',
    async (productId) => {
       console.log("esta es el repsonse:"+productId)
      try {
        const response = await axios.get(`http://localhost:8000/reviews/product/${productId}`);
       
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  
  export const getReviewById = createAsyncThunk(
    'reviews/getReviewById',
    async (reviewID) => {
      try {
        const response = await axios.get(`http://localhost:8000/reviews/${reviewID}`);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  
  export const postReview = createAsyncThunk(
    'reviews/postReview',
    async (reviewData) => {
      try {
        const response = await axios.post('http://localhost:8000/reviews', reviewData);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  
  export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewID) => {
      try {
        const response = await axios.delete(`http://localhost:8000/reviews/delete/${reviewID}`);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  
  export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ reviewID, reviewData }) => {
      try {
        const response = await axios.put(`http://localhost:8000/reviews/update/${reviewID}`, reviewData);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  


  export default ratingReviewSlice.reducer;
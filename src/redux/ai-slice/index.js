import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

const initialState = {
  aiRecommendations: [], // This will store all recommendations
  currentRecommendation: null, // Current recommendation being viewed
  aiChat: [],
  isLoading: false,
  error: null,
};

export const aiRecommend = createAsyncThunk(
  "ai/recommendation",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`ai/recommend`, { item });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({
          message: err.message || "AI recommendation failed",
        });
      }
    }
  }
);

export const aiChat = createAsyncThunk(
  "ai/chat",
  async (prompt, { rejectWithValue }) => {
    try {
      const response = await axios.post(`ai/chat`, { prompt });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({
          message: err.message || "AI chat failed",
        });
      }
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearAiError: (state) => {
      state.error = null;
    },
    clearAiChat: (state) => {
      state.aiChat = [];
    },
    clearAiRecommendations: (state) => {
      state.aiRecommendations = [];
      state.currentRecommendation = null;
    },
    setCurrentRecommendation: (state, action) => {
      state.currentRecommendation = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // aiRecommend cases
      .addCase(aiRecommend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(aiRecommend.fulfilled, (state, action) => {
        state.isLoading = false;
        const newRecommendation = {
          ...action.payload.data,
          id: Date.now(), // Simple ID generation
          timestamp: new Date().toISOString(),
        };
        // Add to recommendations array (latest first)
        state.aiRecommendations.unshift(newRecommendation);
        // Set as current recommendation
        state.currentRecommendation = newRecommendation;
        state.error = null;
      })
      .addCase(aiRecommend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "AI recommendation failed";
      })
      // aiChat cases
      .addCase(aiChat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(aiChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.aiChat.push({
          sender: "ai",
          text: action.payload.data,
        });
        state.error = null;
      })
      .addCase(aiChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "AI chat failed";
      });
  },
});

export const {
  clearAiError,
  clearAiChat,
  clearAiRecommendations,
  setCurrentRecommendation,
} = aiSlice.actions;
export default aiSlice.reducer;

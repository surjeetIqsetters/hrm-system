import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Goal, SelfReview, Feedback, Training } from '@/types';

interface PerformanceState {
  goals: Goal[];
  selfReviews: SelfReview[];
  feedback: Feedback[];
  trainings: Training[];
  loading: boolean;
  error: string | null;
}

const initialState: PerformanceState = {
  goals: [],
  selfReviews: [],
  feedback: [],
  trainings: [],
  loading: false,
  error: null,
};

export const fetchGoals = createAsyncThunk<Goal[], string>(
  'performance/fetchGoals',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/performance/goals/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch goals');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGoal = createAsyncThunk<Goal, any>(
  'performance/createGoal',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/performance/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create goal');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGoal = createAsyncThunk<Goal, { id: string; data: Partial<Goal> }>(
  'performance/updateGoal',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/performance/goals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update goal');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSelfReviews = createAsyncThunk<SelfReview[], string>(
  'performance/fetchSelfReviews',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/performance/self-reviews/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch self reviews');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitSelfReview = createAsyncThunk<SelfReview, any>(
  'performance/submitSelfReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/performance/self-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeedback = createAsyncThunk<Feedback[], string>(
  'performance/fetchFeedback',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/performance/feedback/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch feedback');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrainings = createAsyncThunk<Training[], string>(
  'performance/fetchTrainings',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/performance/trainings/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch trainings');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const enrollTraining = createAsyncThunk<Training, { employeeId: string; trainingId: string }>(
  'performance/enrollTraining',
  async ({ employeeId, trainingId }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/performance/training/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, trainingId }),
      });
      if (!response.ok) throw new Error('Failed to enroll');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.goals.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(fetchSelfReviews.fulfilled, (state, action) => {
        state.selfReviews = action.payload;
      })
      .addCase(submitSelfReview.fulfilled, (state, action) => {
        state.selfReviews.push(action.payload);
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.feedback = action.payload;
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.trainings = action.payload;
      });
  },
});

export default performanceSlice.reducer;

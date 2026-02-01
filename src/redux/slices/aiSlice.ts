import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AttritionRisk,
  AttendanceAnomaly,
  ResumeScore,
  PolicyQuery,
  PerformanceInsight
} from '@/types';

interface AIState {
  attritionRisks: AttritionRisk[];
  attendanceAnomalies: AttendanceAnomaly[];
  resumeScores: ResumeScore[];
  policyQueryHistory: PolicyQuery[];
  performanceInsights: PerformanceInsight[];
  loading: boolean;
  error: string | null;
}

const initialState: AIState = {
  attritionRisks: [],
  attendanceAnomalies: [],
  resumeScores: [],
  policyQueryHistory: [],
  performanceInsights: [],
  loading: false,
  error: null,
};

export const fetchAttritionRisks = createAsyncThunk<AttritionRisk[], void>(
  'ai/fetchAttritionRisks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/ai/attrition-risks');
      if (!response.ok) throw new Error('Failed to fetch attrition risks');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeAttritionRisk = createAsyncThunk<AttritionRisk, string>(
  'ai/fetchEmployeeAttritionRisk',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/ai/attrition-risk/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch attrition risk');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAttendanceAnomalies = createAsyncThunk<AttendanceAnomaly[], void>(
  'ai/fetchAttendanceAnomalies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/ai/attendance-anomalies');
      if (!response.ok) throw new Error('Failed to fetch anomalies');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeAnomalies = createAsyncThunk<AttendanceAnomaly[], string>(
  'ai/fetchEmployeeAnomalies',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/ai/attendance-anomalies/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch employee anomalies');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const scoreResumes = createAsyncThunk<ResumeScore[], { jobId: string }>(
  'ai/scoreResumes',
  async ({ jobId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/ai/resume-score/${jobId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to score resumes');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const queryPolicy = createAsyncThunk<PolicyQuery, { question: string }>(
  'ai/queryPolicy',
  async ({ question }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/ai/policy-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) throw new Error('Failed to query policy');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPerformanceInsight = createAsyncThunk<PerformanceInsight, string>(
  'ai/fetchPerformanceInsight',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/ai/performance-insight/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch performance insight');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const generatePerformanceInsights = createAsyncThunk<PerformanceInsight[], void>(
  'ai/generatePerformanceInsights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/ai/performance-insights/generate', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to generate insights');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addPolicyQuery: (state, action) => {
      state.policyQueryHistory.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttritionRisks.fulfilled, (state, action) => {
        state.attritionRisks = action.payload;
      })
      .addCase(fetchEmployeeAttritionRisk.fulfilled, (state, action) => {
        const index = state.attritionRisks.findIndex(r => r.employeeId === action.payload.employeeId);
        if (index !== -1) {
          state.attritionRisks[index] = action.payload;
        } else {
          state.attritionRisks.push(action.payload);
        }
      })
      .addCase(fetchAttendanceAnomalies.fulfilled, (state, action) => {
        state.attendanceAnomalies = action.payload;
      })
      .addCase(fetchEmployeeAnomalies.fulfilled, (state, action) => {
        state.attendanceAnomalies = action.payload;
      })
      .addCase(scoreResumes.fulfilled, (state, action) => {
        state.resumeScores = action.payload;
      })
      .addCase(queryPolicy.fulfilled, (state, action) => {
        state.policyQueryHistory.unshift(action.payload);
      })
      .addCase(fetchPerformanceInsight.fulfilled, (state, action) => {
        const index = state.performanceInsights.findIndex(i => i.employeeId === action.payload.employeeId);
        if (index !== -1) {
          state.performanceInsights[index] = action.payload;
        } else {
          state.performanceInsights.push(action.payload);
        }
      })
      .addCase(generatePerformanceInsights.fulfilled, (state, action) => {
        state.performanceInsights = action.payload;
      });
  },
});

export const { clearError, addPolicyQuery } = aiSlice.actions;
export default aiSlice.reducer;

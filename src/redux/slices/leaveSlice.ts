import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LeaveRequest, LeaveBalance, Holiday, LeaveType, LeaveStatus } from '@/types';

interface LeaveState {
  balances: LeaveBalance[];
  requests: LeaveRequest[];
  holidays: Holiday[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaveState = {
  balances: [],
  requests: [],
  holidays: [],
  loading: false,
  error: null,
};

export const fetchLeaveBalances = createAsyncThunk<LeaveBalance[], string>(
  'leave/fetchBalances',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leave/balances/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch balances');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLeaveRequests = createAsyncThunk<LeaveRequest[], string>(
  'leave/fetchRequests',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leave/requests/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch requests');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyLeave = createAsyncThunk<LeaveRequest, any>(
  'leave/applyLeave',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/leave/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to apply leave');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelLeave = createAsyncThunk<void, string>(
  'leave/cancelLeave',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leave/cancel/${requestId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to cancel leave');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHolidays = createAsyncThunk<Holiday[], { year: number }>(
  'leave/fetchHolidays',
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leave/holidays?year=${year}`);
      if (!response.ok) throw new Error('Failed to fetch holidays');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingApprovals = createAsyncThunk<LeaveRequest[], void>(
  'leave/fetchPendingApprovals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/leave/pending-approvals');
      if (!response.ok) throw new Error('Failed to fetch pending approvals');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveLeave = createAsyncThunk<void, { requestId: string; comments?: string }>(
  'leave/approveLeave',
  async ({ requestId, comments }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leave/approve/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments }),
      });
      if (!response.ok) throw new Error('Failed to approve leave');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectLeave = createAsyncThunk<void, { requestId: string; reason: string }>(
  'leave/rejectLeave',
  async ({ requestId, reason }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leave/reject/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error('Failed to reject leave');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveBalances.fulfilled, (state, action) => {
        state.balances = action.payload;
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.requests.unshift(action.payload);
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.holidays = action.payload;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        state.requests = action.payload;
      });
  },
});

export default leaveSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceRecord, Shift, AttendanceRegularization, AttendanceStatus } from '@/types';

interface AttendanceState {
  todayAttendance: AttendanceRecord | null;
  monthlyRecords: AttendanceRecord[];
  regularizationRequests: AttendanceRegularization[];
  shifts: Shift[];
  checkInStatus: 'checked-in' | 'checked-out' | 'not-started';
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  todayAttendance: null,
  monthlyRecords: [],
  regularizationRequests: [],
  shifts: [],
  checkInStatus: 'not-started',
  loading: false,
  error: null,
};

export const fetchTodayAttendance = createAsyncThunk<AttendanceRecord, string>(
  'attendance/fetchToday',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/attendance/today/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch today\'s attendance');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkIn = createAsyncThunk<AttendanceRecord, { employeeId: string; location?: string }>(
  'attendance/checkIn',
  async ({ employeeId, location }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/attendance/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, location }),
      });
      if (!response.ok) throw new Error('Check-in failed');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkOut = createAsyncThunk<AttendanceRecord, { employeeId: string; location?: string }>(
  'attendance/checkOut',
  async ({ employeeId, location }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/attendance/check-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, location }),
      });
      if (!response.ok) throw new Error('Check-out failed');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyAttendance = createAsyncThunk<AttendanceRecord[], { employeeId: string; month: string; year: number }>(
  'attendance/fetchMonthly',
  async ({ employeeId, month, year }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/attendance/monthly/${employeeId}?month=${month}&year=${year}`);
      if (!response.ok) throw new Error('Failed to fetch monthly attendance');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitRegularization = createAsyncThunk<AttendanceRegularization, any>(
  'attendance/submitRegularization',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/attendance/regularization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit regularization');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegularizationRequests = createAsyncThunk<AttendanceRegularization[], string>(
  'attendance/fetchRegularization',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/attendance/regularization/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch requests');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCheckInStatus: (state, action: PayloadAction<'checked-in' | 'checked-out' | 'not-started'>) => {
      state.checkInStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
        state.todayAttendance = action.payload;
        if (action.payload.checkInTime && !action.payload.checkOutTime) {
          state.checkInStatus = 'checked-in';
        } else if (action.payload.checkOutTime) {
          state.checkInStatus = 'checked-out';
        }
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.todayAttendance = action.payload;
        state.checkInStatus = 'checked-in';
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.todayAttendance = action.payload;
        state.checkInStatus = 'checked-out';
      })
      .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
        state.monthlyRecords = action.payload;
      })
      .addCase(submitRegularization.fulfilled, (state, action) => {
        state.regularizationRequests.push(action.payload);
      })
      .addCase(fetchRegularizationRequests.fulfilled, (state, action) => {
        state.regularizationRequests = action.payload;
      });
  },
});

export const { clearError, setCheckInStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;
